<template>
  <div id="app">
		<div id="page">
			<div id="header">
				<h1>Tic-Tac-Toe</h1>
			</div>
			<div id="nav">
				<router-link to="/play">Play</router-link> |
				<router-link to="/leaderboard">Leaderboard</router-link>
			</div>
			<router-view />
			<div id="footer">
				<a id="git-link" href="https://github.com/issmith962/cs260-clab3.git">https://github.com/issmith962/cs260-clab3.git</a>
			</div>
		</div>
  </div>
</template>

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

</style>
