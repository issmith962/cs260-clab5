<template>
	<div class="register">
		<h1>Register New Team</h1>
		<div class="container">

			<input id="team-login" type="text" v-model="teamLogin" placeholder="Enter Team Login ID" name="team-login">
			<input id="password" type="password" v-model="password" placeholder="Enter Password" name="password">

			<input id="team-name" type="text" v-model="teamName" placeholder="Enter Team Name" name="team-name">
			<div id="colors" class="form_field">
				<div class="form_label">
					<strong>Choose a team color:</strong>
				</div>
				<div class="form_input">
					<v-swatches v-model="color" popover-x="left"></v-swatches>
				</div>
			</div>
			<button id="register-button" type="button" v-on:click="register()">Register</button>
			<div class="login-switch">
				<button  id="login-button" type="button" v-on:click="$router.push({ name: 'Login'})">Already have an account? Sign in here...</button>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios";
import VSwatches from "vue-swatches";
export default {
	name: "Register",
	components: {
		VSwatches
	}, 
	data() {
		return {
			teamLogin: "", 
			password: "", 
			color: "", 
			teamName: "", 
			error: "", 
			errorLogin: "", 
		}
	}, 
	methods: {
		async register() {
			this.error = "";	
			this.errorLogin = "";
			if (!this.teamLogin || !this.password || !this.teamName || !this.color)
				return;
			try {
				let response = await axios.post("/api/teams", {
					teamLogin: this.teamLogin, 
					password: this.password, 
					teamName: this.teamName, 
					color: this.color,

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
	.register {
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
		margin-bottom:1px;
	}
	#password {
		margin-bottom:1px;
	}
	#team-name {
		margin-bottom:10px;
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




				


				

				
				
