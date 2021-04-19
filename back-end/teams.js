const express = require("express");
const mongoose = require('mongoose');
const argon2 = require("argon2");

const router = express.Router();

const teamSchema = new mongoose.Schema({
  color: String,
	teamName: String,
  teamLogin: String,
  password: String,
});

teamSchema.pre('save', async function(next) {
  if (!this.isModified('password'))
    return next();

  try {
    const hash = await argon2.hash(this.password);
    this.password = hash;
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
});

teamSchema.methods.comparePassword = async function(password) {
  try {
    const isMatch = await argon2.verify(this.password, password);
    return isMatch;
  } catch (error) {
    return false;
  }
};

teamSchema.methods.toJSON = function() {
  var obj = this.toObject();
  delete obj.password;
  return obj;
}

const Team = mongoose.model("Team", teamSchema); 

const validTeam = async (req, res, next) => {
  if (!req.session.userID)
    return res.status(403).send({
      message: "not logged in"
    });
  try {
    const team = await Team.findOne({
      _id: req.session.userID
    });
    if (!team) {
      return res.status(403).send({
        message: "not logged in"
      });
    }
    req.team = team;
  } catch (error) {
    return res.status(403).send({
      message: "not logged in"
    });
  }
  next();
};

router.post('/', async (req, res) => {
  if (!req.body.teamLogin || !req.body.password || !req.body.teamName || !req.body.color)
    return res.status(400).send({
      message: "team login and password are required"
    });

  try {
    const existingTeamLogin = await Team.findOne({
				teamLogin: req.body.teamLogin
    });
    if (existingTeamLogin)
      return res.status(403).send({
        message: "Team-login already exists"
      });
    const existingTeamName = await Team.findOne({
				teamName: req.body.teamName
    });
    if (existingTeamName)
      return res.status(403).send({
        message: "Team name already exists"
      });
    const existingTeamColor = await Team.findOne({
				color: req.body.color
    });
    if (existingTeamColor)
      return res.status(403).send({
        message: "Team color is taken"
      });

    const team = new Team({
      color: req.body.color,
      teamName: req.body.teamName,
			teamLogin: req.body.teamLogin,
      password: req.body.password,
    });
    await team.save();
		req.session.userID = team._id; 
    return res.send({
      team: team
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


router.post('/login', async (req, res) => {
  if (!req.body.teamLogin || !req.body.password)
    return res.sendStatus(400);

  try {
    const team = await Team.findOne({
      teamLogin: req.body.teamLogin
    });
    if (!team)
      return res.status(403).send({
        message: "team login or password is wrong"
      });

    if (!await team.comparePassword(req.body.password))
      return res.status(403).send({
        message: "team login or password is wrong"
      });
		req.session.userID = team._id; 
    return res.send({
      team: team
    });
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.get("/", validTeam, async (req, res) => {
	try {
		res.send({
				team: req.team
		}); 
	} catch (error) {
			console.log(error); 
		return res.sendStatus(500); 
	}
}); 

router.delete("/", validTeam, async (req, res) => {
	try {
		req.session = null; 
		res.sendStatus(200); 
	} catch (error) {
		console.log(error); 
		return res.sendStatus(500); 
	}
}); 

module.exports = {
  routes: router,
  model: Team,
	valid: validTeam,
};
