<template>
  <div class="board">
		<div id="container">
			<div class="row">
				<div class="move-box" id="box-0" >
					<img v-bind:class="move0" v-show="squares[0][0]" :src="squares[0][0]" alt=" "/>
				</div>
				<div class="move-box" id="box-1" >
					<img v-bind:class="move1" v-show="squares[0][1]" :src="squares[0][1]" alt=" "/>
				</div>
				<div class="move-box" id="box-2" >
					<img v-bind:class="move2" v-show="squares[0][2]" :src="squares[0][2]" alt=" "/>
				</div>
			</div>
			<div class="row">
				<div class="move-box" id="box-3" >
					<img v-bind:class="move3" v-show="squares[1][0]" :src="squares[1][0]" alt=" "/>
				</div>
				<div class="move-box" id="box-4" >
					<img v-bind:class="move4" v-show="squares[1][1]" :src="squares[1][1]" alt=" "/>
				</div>
				<div class="move-box" id="box-5" >
					<img v-bind:class="move5" v-show="squares[1][2]" :src="squares[1][2]" alt=" "/>
				</div>
			</div>
			<div class="row">
				<div class="move-box" id="box-6" >
					<img v-bind:class="move6" v-show="squares[2][0]" :src="squares[2][0]" alt=" "/>
				</div>
				<div class="move-box" id="box-7" >
					<img v-bind:class="move7" v-show="squares[2][1]" :src="squares[2][1]" alt=" "/>
				</div>
				<div class="move-box" id="box-8" >
					<img v-bind:class="move8" v-show="squares[2][2]" :src="squares[2][2]" alt=" "/>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
export default {
  name: "board",
  props: {
	  pos: Array,
		gameover: String,
		/*
			"o" - o's turn
			"x" - x's turn
		*/
  },
	data() {
		return {
			turn: "x",
			position: [['-', '-', '-'],
								['-', '-', '-'],
								['-', '-', '-']],
			squares: [[false,false,false],
							[false,false,false],
							[false,false,false]], 
		}
	},
	created() {
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				this.position[i][j] = this.pos[i].substring(j, j+1); 
			}
		}
		for (let i = 0; i < 3; i++) {
			for (let j = 0; j < 3; j++) {
				if (this.position[i][j] == "x") {
					const newRow = this.squares[i].slice(0);
					newRow[j] = require("@/assets/x.png");
					this.$set(this.squares, i, newRow);
				} else if (this.position[i][j] == "o") {
					const newRow = this.squares[i].slice(0);
					//newRow[j] = require("@/assets/o.jpg");
					//newRow[j] = require("@/assets/o2.png");
					newRow[j] = require("@/assets/o3.png");
					this.$set(this.squares, i, newRow);
				}
			}
		}

	},	
	computed: {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.board {
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center;
}
#container{
	display:flex;
	flex-direction:column;
	flex-wrap:wrap;
	justify-content:center;
	align-items:center;
	margin:0 0;
	width:60vmin;
	height:60vmin;
}
.row {
	display:flex;
	flex-direction:row;
	width:100%;
	height:20vmin;
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

</style>
