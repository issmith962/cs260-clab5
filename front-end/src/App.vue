<template>
  <div id="app">
		<div id="page">
			<div id="header">
				<h1>Tic-Tac-Toe</h1>
			</div>
			<div id="nav">
				<div class="nav-options">
					<div v-if="loggedIn">
						<router-link to="/training">Training</router-link> |
					</div>
					<router-link to="/trainingstats">Training Stats</router-link>
				</div>
				<div class="nav-options" v-if="loggedIn">
					<p id="team-name">Team Name: {{this.$root.$data.team.teamName}}</p>
					<button id="logout-button" @click="logout">Logout</button>
				</div>
				<div v-else>
					<button id="login-button" @click="login">Sign In</button>
				</div>
			</div>
			<router-view />
			<div id="footer">
				<a id="git-link" href="https://github.com/issmith962/cs260-clab3.git">https://github.com/issmith962/cs260-clab3.git</a>
			</div>
		</div>
  </div>
</template>

<script>
import axios from "axios";
import 'vue-swatches/dist/vue-swatches.css';
export default {
	computed: {
		loggedIn() {
			if (this.$root.$data.team) {
				return true; 
			} else {
				return false;
			}
		}, 
	},
	async created() {
		try {
			let response = await axios.get("/api/teams"); 
			this.$root.$data.team = response.data.team; 
			//this.$router.push({name: "Training"}); 
		} catch (error) {
			this.$root.$data.team = null;
			this.$router.push({name: "Login"}); 
		}
	}, 
	methods: {
		async	logout() {
			try {
				await axios.delete("/api/teams"); 
				this.$root.$data.team = null; 
			} catch (error) {
				this.$root.$data.team = null; 
			}
			this.login(); 
		}, 
		login() {
			this.$router.push({name: "Login"}); 
		}, 
	}, 
}
</script>


<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
	background-color:#ececec;
}

#page {
	display:flex;
	flex-direction:column;
	min-height:100vh;
}

::-webkit-scrollbar {
	display:none;
}
#nav {
  padding: 20px;
	padding-top: 20px;
	display:flex;
	flex-direction:column;
	justify-content:space-between;
	align-items:center;
}
.nav-options {
	display:flex;
	flex-direction:row;
	align-items:center;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
	padding:0px 10px;
	text-decoration:none;
}

#nav a.router-link-exact-active {
  color: #cf291d;
}

#header {
	display:flex;
	justify-content:center;
	background-color: #b50717; 
	color: #131313;
}
#team-name {
	margin-right:8px;
}
#logout-button {
	height:4vh;
}
#login-button {
	margin-top:5px;
}
#footer {
	margin-top:auto;
	display:flex;
	justify-content:center;
	align-items:center;
	width:100%;
	padding:5px;
	font-size:14px;
	
	height:5vh;
	color: #131313;
	background-color: #b50717; 
}
#git-link {
	text-decoration:none!important;
	color:#131313;
}
@media (min-width: 700px) {
	#nav {
		flex-direction:row;
		align-items:left;
	}
}

</style>
