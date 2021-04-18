<template>
	<div class="player">
		<h1>{{player.name}}</h1>
		<div id="info">
			<div class="name">
				<p><strong>Username:</strong></p>
				<input v-if="editEnabled" type="text" maxlength="4" v-model="editName"> 
				<p v-else>{{player.name}}</p>
			</div>
			<div class="bio">
				<p><strong>Bio: </strong></p>
				<textarea v-if="editEnabled" type="text" maxlength="100" cols="30" rows="4" v-model="editBio"></textarea>
				<p v-else>{{player.bio}}</p>
			</div>
			<div class="wins">
				<p><strong>Wins: </strong>{{player.wins}}</p>
			</div>
			<div class="losses">
				<p><strong>Losses: </strong>{{player.losses}}</p>
			</div>
			<div class="ties">
				<p><strong>Ties: </strong>{{player.ties}}</p>
			</div>
			<button v-on:click="toggleEdit">{{editMessage}}</button> 
			<hr>
		</div>
		<div id="game-list">
			<h2>Games</h2>
			<div id="game" v-for="game in games" :key="game.id">
				<p><strong>{{game.playerX.name}}</strong> (X's) {{whoWon(game.result)}} <strong>{{game.playerO.name}}</strong> (O's)</p>
				<button class="delete-game" v-on:click="deleteGame(game)">Delete Game</button>
				<Board   :pos="game.position" :gameover="game.result"/>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"; 
import Board from "./../components/board.vue";
export default {
	name: "Player",
	components: {
		Board, 
	},
	props: {
		player: Object, 
	}, 
	data() {
		return {
			games: [],
			editMessage: "Edit player info",
			editEnabled: false,
			editName: "",
			editBio: "",
		}
	}, 
	created() {
		this.getGames(); 
		this.editName = this.player.name; 
		this.editBio = this.player.bio; 
	}, 
	methods: {
		whoWon(result) {
			if (result == "x") {
				return "defeated";
			} else if (result == "o") {
				return "was defeated by";
			} else if (result =="t") {
				return "tied against";
			} else {
				return "-"; 
			}
		},
		toggleEdit() {
			if (this.editEnabled) {
				this.editPlayer();
				this.editMessage = "Edit player info"; 
			} else {
				this.editMessage = "Save info changes"; 
			}
			this.editEnabled = !this.editEnabled; 
		},
			
		async updatePlayer() {
			try {
				const response = await axios.get("/api/players/" + this.player._id); 
				this.player = response.data; 
			} catch (error) {
				console.log(error); 
			}
		},
		async editPlayer() {
			try {
				axios.put("/api/players/" + this.player._id, {
					name: this.editName, 
					bio: this.editBio, 
				}); 
				this.updatePlayer(); 
			} catch (error) {
				console.log(error); 
			}
		}, 
				
		async getGames() {
			try {
				const response = await axios.get("/api/players/" + this.player._id + "/games"); 
				this.games = response.data; 
			} catch (error) {
				console.log(error); 
			}
		},
		async deleteGame(game) {
			try {
				await axios.delete("/api/players/" + this.player._id + "/games/" + game._id);
				this.getGames(); 
				this.updatePlayer(); 
			} catch (error) {
				console.log(error); 
			}
		}, 
	}, 
};
</script>
		
<style scoped> 
.player {
	width:100%; 
	height:100%; 
	display:flex;
	flex-direction:column;
	align-items:center;
}
#game-list {
	width:100%;
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
}
#game {
	margin-bottom:10vh;
}
.delete-game {
	margin-bottom:4vh;
}
.name, .bio, .wins, .losses, .ties {
	display:flex;
	flex-direction:row;
}
p {
	margin: 4px 2px; 
}
button {
	margin: 2px;
}
input, textarea {
	margin-left:4px;
	margin-bottom:4px;
	width: 100%;
}
hr {
	border-width: 1px;
}


</style>
