const express = require("express"); 
const bodyParser = require("body-parser"); 
const mongoose = require("mongoose"); 
const teams = require("./teams.js"); 

const app = express(); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/clab5', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

const Team = teams.model; 
const validTeam = teams.valid; 

// Schema for players
const playerSchema = new mongoose.Schema({
	name: String, 
	bio: String, 
	wins: Number, 
	losses: Number, 
	ties: Number, 
	team: {
		type: mongoose.Schema.ObjectId,
		ref: "Team"
	}, 
}); 

// Model for players
const Player = mongoose.model("Player", playerSchema); 

// Create new player
app.post("/api/players", async (req, res) => {
	const player = new Player({
		name: req.body.name, 
		bio: req.body.bio, 
		wins: req.body.wins, 
		losses: req.body.losses, 
		ties: req.body.ties, 
		team: req.body.team,
	}); 
	try {
		await player.save(); 
		res.send(player); 
	} catch (error) {
		console.log(error); 
		res.sendStatus(500); 
	}
}); 

// Get a list of all the players
app.get("/api/players", async (req, res) => {
	try {
		let name = req.query.name; 
		if (!name) {
			let players = await Player.find().populate("team");
			res.send(players); 
		} else {
			let player = await Player.findOne({name: name}).populate("team");
			if (!player) {
				res.sendStatus(404);
				return; 
			}
			res.send(player);
		}
	} catch (error) {
		console.log(error); 
		res.sendStatus(500); 
	}
}); 

// Get player by id
app.get("/api/players/:playerID", async (req, res) => {
	try {
		let player = await Player.findOne({_id: req.params.playerID}); 
		if (!player) {
			res.sendStatus(404); 
			return; 
		}
		res.send(player); 
	} catch (error) {
		console.log(error); 
		res.sendStatus(500); 
	}
}); 


// Edit a player's name and bio
app.put("/api/players/:playerID", validTeam, async (req, res) => {
	try {
		let player = await Player.findOne({
			_id:req.params.playerID,
			team: req.team
		}); 
		if (!player) {
			res.sendStatus(404); 
			return; 
		}
		player.name = req.body.name; 
		player.bio = req.body.bio; 
		await player.save(); 
		res.send(player); 
	} catch (error) {
		console.log(error); 
		res.sendStatus(500); 
	}
}); 

// Schema for games
const gameSchema = new mongoose.Schema({
	result: String, 
	playerX: {
		type: mongoose.Schema.ObjectId,
		ref: "Player"
	}, 
	playerO: {
		type: mongoose.Schema.ObjectId, 
		ref: "Player"
	}, 
	position: [String], 
}); 

// Model for games
const Game = mongoose.model("Game", gameSchema); 

// Create a game
app.post("/api/games", validTeam, async (req, res) => {
	try {
		let playerX = await Player.findOne({
			_id: req.body.playerX, 
		}); 
		let playerO = await Player.findOne({
			_id: req.body.playerO,
		}); 
		if (!playerX || !playerO) {
			res.sendStatus(404); 
			return; 
		}
		let game = new Game({
			result: req.body.result, 
			playerX: playerX, 
			playerO: playerO, 
			position: req.body.position
		}); 
		if (game.result == "x") {
			playerX.wins++; 
			playerO.losses++; 
		} else if (game.result == "o") {
			playerX.losses++; 
			playerO.wins++; 
		} else if (game.result == "t") {
			playerX.ties++; 
			playerO.ties++; 
		}
		await game.save(); 
		await playerX.save(); 
		await playerO.save(); 
		res.send(game); 
	} catch (error) {
		console.log(error); 
		res.sendStatus(500); 
	}
}); 

// Get all games of a player
app.get("/api/players/:playerID/games", async (req, res) => {
	try {
		let player = await Player.findOne({_id: req.params.playerID}); 
		if (!player) {
			res.sendStatus(404); 
			return; 
		}
		let games = await Game.find({
			$or: [
				{playerX:player},
				{playerO:player}
			]
		}).populate("playerX").populate("playerO"); 
		res.send(games); 
	} catch (error) {
		console.log(error); 
		res.sendStatus(500); 
	}
}); 

// Delete a game from a player's record (and consequently delete result from the database)
app.delete("/api/players/:playerID/games/:gameID", validTeam, async (req, res) => {
	try {
		let game = await Game.findOne( {
			_id: req.params.gameID, 
		}); 
		if (!game) {
			res.sendStatus(404); 
			return; 
		}
		let playerX = await Player.findOne({_id: game.playerX}).populate("team"); 
		let playerO = await Player.findOne({_id: game.playerO}).populate("team"); 
		if (!playerX || !playerO) {
			res.sendStatus(404); 
			return; 
		}
		if ((playerX.team.teamLogin != req.team.teamLogin) || (playerO.team.teamLogin != req.team.teamLogin)) {
			res.sendStatus(403); 
			return; 
		}
		if (game.result == "x") {
			playerX.wins = playerX.wins - 1; 
			playerO.losses = playerO.losses - 1; 
		} else if (game.result == "o") {
			playerX.losses = playerX.losses - 1; 
			playerO.wins = playerO.wins - 1; 
		} else if (game.result == "t") {
			playerX.ties = playerX.ties - 1; 
			playerO.ties = playerO.ties - 1; 
		} else {
			res.send(404); 
			return; 
		}
		await playerX.save(); 
		await playerO.save(); 
		await game.delete();
		res.sendStatus(200); 
	} catch (error) {
		console.log(error); 
		res.sendStatus(200); 
	}
}); 

			


		 















//const teams = require("./teams.js"); 
app.use("/api/teams", teams.routes); 

app.listen(3004, () => console.log("Server listening on port 3004!"));  
