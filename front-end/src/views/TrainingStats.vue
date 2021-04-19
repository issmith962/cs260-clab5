<template>
  <div class="training-stats">
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
					<p>Team</p>
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
				<div class="team" :style="teamColor(player)">
					<p>{{player.team.teamName}}</p>
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
	name: "TrainingStats",
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
		teamColor(player) {
			return { color: player.team.color };
		},
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
.training-stats {
	display:flex;
	flex-direction:column;
	width:100%;
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
	display:none;
}
#rankings {
}
.row {
	display:flex;
	flex-direction: row; 
	justify-content:space-between; 
}
.rank {
	flex-basis:0; 
	flex-grow:1; 
	display:flex; 
	justify-content:center;
	align-items:center;
}
.name {
	background-color:#bfbfbf;
	display:flex; 
	justify-content:center;
	align-items:center;
	flex-basis:0; 
	flex-grow:2; 
}
.team {
	display:flex; 
	justify-content:center;
	align-items:center;
	flex-basis:0; 
	flex-grow:2; 
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
	text-align:left;
	padding-left:6px;

	display:none;
}
@media (min-width: 700px) {
	.training-stats {
		display:flex;
		justify-content:center;
		align-items:center;
	}
	#ranking-grid {
		width:60%;
		border:5px solid #b50717;
	}
	.bio {
		display:flex;
	}
	#bio-header {
		display:flex;
	}
	.name {
		flex-grow:1;
	}
	.team {
		flex-grow:1;
	}
}
</style>
