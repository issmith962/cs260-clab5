<template>
  <div class="training">
		<div id="player-names">
			<form id="x-name-form" onsubmit="event.preventDefault();">
				<label for="x-name-input">Player X Name:</label>
				<br>
				<input type="text" id="x-name-input" v-model="xName" name="xNameInput" maxlength="4">
			</form>
			<form  id="o-name-form" onsubmit="event.preventDefault();">
				<label for="o-name-input">Player O Name:</label>
				<br>
				<input type="text" id="o-name-input" v-model="oName" name="oNameInput" maxlength="4">
			</form>
		</div>

    <div class="board">
  		<div id="container">
  			<div class="row">
  				<div class="move-box" id="box-0" v-on:click="makeMove(0)">
  					<img v-bind:class="move0" v-show="squares[0][0]" :src="squares[0][0]" alt=" "/>
  				</div>
  				<div class="move-box" id="box-1" v-on:click="makeMove(1)">
  					<img v-bind:class="move1" v-show="squares[0][1]" :src="squares[0][1]" alt=" "/>
  				</div>
  				<div class="move-box" id="box-2" v-on:click="makeMove(2)">
  					<img v-bind:class="move2" v-show="squares[0][2]" :src="squares[0][2]" alt=" "/>
  				</div>
  			</div>
  			<div class="row">
  				<div class="move-box" id="box-3" v-on:click="makeMove(3)">
  					<img v-bind:class="move3" v-show="squares[1][0]" :src="squares[1][0]" alt=" "/>
  				</div>
  				<div class="move-box" id="box-4" v-on:click="makeMove(4)">
  					<img v-bind:class="move4" v-show="squares[1][1]" :src="squares[1][1]" alt=" "/>
  				</div>
  				<div class="move-box" id="box-5" v-on:click="makeMove(5)">
  					<img v-bind:class="move5" v-show="squares[1][2]" :src="squares[1][2]" alt=" "/>
  				</div>
  			</div>
  			<div class="row">
  				<div class="move-box" id="box-6" v-on:click="makeMove(6)">
  					<img v-bind:class="move6" v-show="squares[2][0]" :src="squares[2][0]" alt=" "/>
  				</div>
  				<div class="move-box" id="box-7" v-on:click="makeMove(7)">
  					<img v-bind:class="move7" v-show="squares[2][1]" :src="squares[2][1]" alt=" "/>
  				</div>
  				<div class="move-box" id="box-8" v-on:click="makeMove(8)">
  					<img v-bind:class="move8" v-show="squares[2][2]" :src="squares[2][2]" alt=" "/>
  				</div>
  			</div>
  		</div>
    </div>


		<div id="name-alert" v-if="!playable">
			<h3 id="name-alert-text">Make sure both players have names (4 char. max)</h3>
		</div>

		<div id="gameover-alert" v-if="gameover">
			<h3 id="gameover-alert-text">{{ gameoverText }}</h3>
		</div> 
		
		<div id="button-container">
			<button v-if="gameover" id='play-again' v-on:click="playAgain()">Play Again!</button>
			<button v-if="gameover" id='clear' v-on:click="clear()">Clear</button>
		</div>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: "Training",
	data() {
		return {
			gameover: false,
			xName: "",
			oName: "",
			position: [['-', '-', '-'],
								['-', '-', '-'],
								['-', '-', '-']],
      turn: "x",
      squares: [[false,false,false],
							[false,false,false],
							[false,false,false]],
		}
	},
	watch: {
		position: {
			deep: true,
			handler() {
				let emptyBoard = true;
				for (let i = 0; i < 3; i++) {
					for (let j = 0; j < 3; j++) {
						if (this.position[i][j] == "x") {
							emptyBoard = false;
							const newRow = this.squares[i].slice(0);
							newRow[j] = require("@/assets/x.png");
							this.$set(this.squares, i, newRow);
						} else if (this.position[i][j] == "o") {
							emptyBoard = false;
							const newRow = this.squares[i].slice(0);
							//newRow[j] = require("@/assets/o.jpg");
							//newRow[j] = require("@/assets/o2.png");
							newRow[j] = require("@/assets/o3.png");
							this.$set(this.squares, i, newRow);
						}
					}
				}
				if (emptyBoard) {
					this.$set(this.squares, 0, [false,false,false]);
					this.$set(this.squares, 1, [false,false,false]);
					this.$set(this.squares, 2, [false,false,false]);
					this.turn = "x";
				}
			},
		},
	},
	methods: {
		positionTo1D(position) {
			let newPosition = ["", "", ""]; 
			for (let i = 0; i < 3; i++) {
				let row = position[i][0] + position[i][1] + position[i][2]; 
				newPosition[i] = row; 
			}
			return newPosition; 
		}, 
		positionFrom1D(oned) {
      let squares = [[false,false,false],
							[false,false,false],
							[false,false,false]]; 
			for (let i = 0; i < 3; i++) {
				for (let j = 0; j < 3; j++) {
					squares[i][j] = oned[i].substring(j, j+1); 
				}
			}
			return squares; 
		},
		async checkPlayerExists(playerName) {
			try {
				const resGetPlayer = await axios.get("/api/players/?name=" + playerName); 
				const player = resGetPlayer.data; 
				return player; 
			} catch (error) {
				console.log(error); 
				return false;
			}
		}, 
		async addPlayer(playerName) {
			try {
				const existingPlayer = await this.checkPlayerExists(playerName); 
				if (!existingPlayer) {
					const resPostPlayer = await axios.post("/api/players", {
						name: playerName, 
						bio: "", 
						wins: 0, 
						losses: 0, 
						ties: 0, 
						team: this.$root.$data.team,
					}); 
					const player = resPostPlayer.data;
					return player;
				} else {
					return existingPlayer; 
				}
			} catch (error) {
				console.log(error); 
			}
		}, 
		async logGame() {
			const playerX = await this.addPlayer(this.xName); 
			const playerO = await this.addPlayer(this.oName); 

			await axios.post("/api/games", {
				result: this.gameover, 
				playerX: playerX, 
				playerO: playerO, 
				position: this.positionTo1D(this.position), 
			});

		},
		playAgain() {
			this.gameover = false;
			this.position = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
		},
		clear() {
			this.gameover = false;
			this.position = [['-', '-', '-'], ['-', '-', '-'], ['-', '-', '-']];
			this.xName = "";
			this.oName = "";
		},
    checkForFinish() {
			// First check for an actual win
			let p = this.position;
			function checker(p1, p2, p3) {
	 			if ((p1 == 'x') && (p2 == 'x') && (p3 == 'x')) {
					return "x";
				}
				else if ((p1 == 'o') && (p2 == 'o') && (p3 == 'o')) {
					return "o";
				}
				else {
					return false;
				}
			}
			let wins = [
				checker(p[0][0], p[0][1], p[0][2]),
				checker(p[1][0], p[1][1], p[1][2]),
				checker(p[2][0], p[2][1], p[2][2]),
				checker(p[0][0], p[1][0], p[2][0]),
				checker(p[0][1], p[1][1], p[2][1]),
				checker(p[0][2], p[1][2], p[2][2]),
				checker(p[0][0], p[1][1], p[2][2]),
				checker(p[0][2], p[1][1], p[2][0])];
			for (const result of wins) {
				if (result) {
					return result;
				}
			}

			if ((p[0][0] != '-') &&
					(p[0][1] != '-') &&
					(p[0][2] != '-') &&
					(p[1][0] != '-') &&
					(p[1][1] != '-') &&
					(p[1][2] != '-') &&
					(p[2][0] != '-') &&
					(p[2][1] != '-') &&
					(p[2][2] != '-')) {
				return "t"
			} else {
				return false;
			}
		},

		async makeMove(move) {
			if (this.gameover || !this.playable)
				return
			let row = Math.floor(move / 3);
			let col = move % 3;
			if (this.position[row][col] != "-") {
				return;
			} else {
				//this.position[row][col] = this.turn;
				const newRow = this.position[row].slice(0);
				newRow[col] = this.turn;
				this.$set(this.position, row, newRow);
			}
			switch(this.turn) {
				case "x":
					this.turn = "o";
					break;
				case "o":
					this.turn = "x";
					break;
				default:
					break;
			}
			this.gameover = this.checkForFinish();
			if (this.gameover) {
				await this.logGame();
			}
		},


	},
	computed: {
		playable() {
			return (this.xName != this.oName)
				&& !(/\s/g.test(this.xName))
				&&  !(/\s/g.test(this.oName))
				&& (this.xName != "")
				&& (this.oName != "");
		},
		gameoverText() {
			if (this.gameover == "x") return "X's Won!"; 
			if (this.gameover == "o") return "O's Won!"; 
			if (this.gameover == "t") return "It's a Tie!"; 
			return ""; 
		},


    move0: function() {
			return {
				x: this.position[0][0] == "x",
				o: this.position[0][0] == "o"
			}
		},
		move1: function() {
			return {
				x: this.position[0][1] == "x",
				o: this.position[0][1] == "o"
			}
		},
		move2: function() {
			return {
				x: this.position[0][2] == "x",
				o: this.position[0][2] == "o"
			}
		},
		move3: function() {
			return {
				x: this.position[1][0] == "x",
				o: this.position[1][0] == "o"
			}
		},
		move4: function() {
			return {
				x: this.position[1][1] == "x",
				o: this.position[1][1] == "o"
			}
		},
		move5: function() {
			return {
				x: this.position[1][2] == "x",
				o: this.position[1][2] == "o"
			}
		},
		move6: function() {
			return {
				x: this.position[2][0] == "x",
				o: this.position[2][0] == "o"
			}
		},
		move7: function() {
			return {
				x: this.position[2][1] == "x",
				o: this.position[2][1] == "o"
			}
		},
		move8: function() {
			return {
				x: this.position[2][2] == "x",
				o: this.position[2][2] == "o"
			}
		},



	},
};
</script>

<style scoped>
.training {
	display: flex;
	flex-direction: column;
}
#player-names {
	display:flex;
	flex-direction:row;
	justify-content:center;
	margin-bottom:10px;
}
#x-name-form {
	margin-right:20px;
}
#o-name-form {
	margin-left:20px;
}
#x-name-input {
	width:100px;
}
#o-name-input {
	width:100px;
}
#name-alert {
	display:flex;
	justify-content:center;
}
#name-alert-text {
	padding: 0px 50px;
}
#button-container {
	display:flex;
	flex-direction:column;
	align-items:center;
	margin-bottom:20px;
}
#play-again {
	width:50%;
	border:1px solid black;
	margin-bottom:5px;
	padding:4px;
}
#clear {
	width:50%;
	border:1px solid black;
	padding:4px;
}




.board {
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
}
#container{
	display:flex;
	flex-direction:column;
	flex-wrap:row-wrap;
	width:90vw;
	height:90vw;
	justify-content:center;
	align-items:center;
	margin:0 0;
}
.row {
	display:flex;
	flex-direction:row;
	height:30vw;
	width:100%;
}
.move-box {
	display:flex;
	justify-content:center;
	align-items:center;
	flex-grow:1;
	flex-basis:0;
	margin:0 0;
}
.x {
	width:70%;
	height:70%;
	object-fit:contain;
}
.o {
	width:95%;
	height:95%;
	object-fit:contain;
}
#box-0 {
	border-right:1px solid black;
	border-bottom:1px solid black;
}
#box-1 {
	border-left:1px solid black;
	border-right:1px solid black;
	border-bottom:1px solid black;
}
#box-2 {
	border-left:1px solid black;
	border-bottom:1px solid black;
}
#box-3 {
	border-right:1px solid black;
	border-top:1px solid black;
	border-bottom:1px solid black;
}
#box-4 {
	border-right:1px solid black;
	border-left:1px solid black;
	border-top:1px solid black;
	border-bottom:1px solid black;
}
#box-5 {
	border-left:1px solid black;
	border-top:1px solid black;
	border-bottom:1px solid black;
}
#box-6 {
	border-right:1px solid black;
	border-top:1px solid black;
}
#box-7 {
	border-right:1px solid black;
	border-left:1px solid black;
	border-top:1px solid black;
}
#box-8 {
	border-top:1px solid black;
	border-left:1px solid black;
}

@media (min-width: 700px) {
	#container {
		width:65vh;
		height:65vh;
	}
	.row {
		height:20vh;
		width:100%;
	}
}
</style>
