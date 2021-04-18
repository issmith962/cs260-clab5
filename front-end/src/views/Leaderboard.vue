<template>
  <div class="leaderboard">
		<p>hint: click on player names :)</p>
		<div id="ranking-grid">
			<div class="row" id="column-headers">
				<div class="headers">
					<p>Rank</p>
				</div>	
				<div class="headers">
					<p>Name</p>
				</div>	
				<div class="headers">
					<p>Wins</p>
				</div>	
				<div class="headers">
					<p>Losses</p>
				</div>	
				<div class="headers">
					<p>Ties</p>
				</div>	
				<div id="bio-header" class="headers">
					<p>Bio</p>
				</div>	
			</div>
			<div class="row" id="rankings" v-for="(player, index) in players" :key="player.id">
				<div class="rank">
					<p>{{"#" + (index + 1)}}</p>
				</div>	
				<div class="name">
					<p v-on:click="$router.push({ name: 'Player', params: {player: player} })"><u><strong> {{player.name}}</strong></u></p>
					<router-view :player="player"></router-view>
				</div>	
				<div class="wins">
					<p>{{player.wins}}</p>
				</div>	
				<div class="losses">
					<p>{{player.losses}}</p>
				</div>	
				<div class="ties">
					<p>{{player.ties}}</p>
				</div>	
				<div class="bio">
					<p>{{player.bio}}</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "Leaderboard",
	data() {
		return {
			editEnabled: false,
			editMessage: "Edit Player Names",
			players: [], 
		}
	},
	created() {
		this.getPlayers(); 
	},
	methods: {
		async getPlayers() {
			try {
				const response = await axios.get("/api/players"); 
				this.players = response.data.sort(function (a, b) {
					let winsA = a.wins; 
					let winsB = b.wins;
					if (winsA < winsB) return -1; 
					if (winsA > winsB) return 1; 

					let lossesA = a.losses; 
					let lossesB = b.losses;
					if (lossesA > lossesB) return -1; 
					if (lossesA < lossesB) return 1; 

					let tiesA = a.ties; 
					let tiesB = b.ties;
					if (tiesA < tiesB) return -1; 
					if (tiesA > tiesB) return 1; 

					return 0; 
				}).reverse(); 

			} catch (error) {
				console.log(error); 
			}
		}, 
	},
};
</script>

<style scoped>
.leaderboard {
	display:flex;
	flex-direction:column;
}
input {
	width:50%;
	}
#ranking-grid {
	display: flex; 
	flex-direction: column; 
	margin: 10px 5px; 
}
#column-headers {
	background-color: #b50717;
	color:#131313;
	font-weight:bold;
	padding: 0px 5px;
}
.headers {
	flex-basis:0; 
	flex-grow:1;
	display:flex;
	justify-content:center;
	align-items:center;
}
#bio-header {
	flex-grow:3; 
}
#rankings {
}
.row {
	display:flex;
	flex-direction: row; 
	justify-content:space-between; 
}
.rank {
	background-color:#bfbfbf;
	flex-basis:0; 
	flex-grow:1; 
	display:flex; 
	justify-content:center;
	align-items:center;
}
.name {
	display:flex; 
	justify-content:center;
	align-items:center;
	flex-basis:0; 
	flex-grow:1; 
}
.wins {
	background-color:#bfbfbf;
	flex-basis:0; 
	flex-grow:1; 
	display:flex; 
	justify-content:center;
	align-items:center;
}
.losses {
	flex-basis:0; 
	flex-grow:1; 
	display:flex; 
	justify-content:center;
	align-items:center;
}
.ties {
	background-color:#bfbfbf;
	flex-basis:0; 
	flex-grow:1; 
	display:flex; 
	justify-content:center;
	align-items:center;
}
.bio {
	flex-basis:0; 
	flex-grow:3; 
	display:flex;
	text-align:left;
	padding-left:6px;
}
@media (min-width: 700px) {
	.leaderboard {
		display:flex;
		justify-content:center;
		align-items:center;
	}
	#ranking-grid {
		width:60%;
		border:5px solid #b50717;
	}

}
</style>
