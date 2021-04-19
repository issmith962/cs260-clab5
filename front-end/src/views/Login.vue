<template>
	<div class="login">
		<h1>Login</h1>
		<div class="container">
			<input id="team-login" type="text" v-model="teamLogin" placeholder="Enter Team Login ID" name="team-login">
			<input id="password" type="password" v-model="password" placeholder="Enter Password" name="password">
			<button id="login-button" type="button" v-on:click="login()">Login</button>
				<button id="register-button" type="button" v-on:click="$router.push({ name: 'Register'})">New? Register your team here...</button>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "Login",
	data() {
		return {
			teamLogin: "", 
			password: "", 
			error: "", 
			errorLogin: "", 
		}
	}, 
	methods: {
		async login() {
			this.error = "";	
			this.errorLogin = "";
			if (!this.teamLogin || !this.password)
				return;
			try {
				let response = await axios.post("/api/teams/login", {
					teamLogin: this.teamLogin, 
					password: this.password, 
				}); 
				this.$root.$data.team = response.data.team; 
				this.$router.push({name: "Training"}); 
			} catch (error) {
				this.error = "Error: " + error.response.data.message; 
				this.$root.$data.team = null; 
				this.$alert(this.error); 
			}
		},
	}, 
}
</script>

<style scoped>
	.login {
		display:flex;
		flex-direction:column;
		align-items:center;
	}
	.container {
		display:flex;
		flex-direction:column;
		width:60%;
	}
	#team-login {
	}
	#password {
		margin-top:1px;
	}
	#login-button {
		margin-top:10px;
	}
	#register-button {
		margin-top:10px;
	}
	@media (min-width: 700px) {
		.container {
			width:20vw;
		}
	}
</style>



				


				

				
				
