<!DOCTYPE html>
<html lang="en">
<head>
		<meta charset="UTF-8">
		<meta name="viewport" conent="width=device-width, initial-scale=1.0">
		<meta http-equiv="X-UA-Compatible" content="ie=edge">
		<title>Vue rustPSM</title>
</head>




<body>
	<div id="app">

		<div id="nav">
			<router-link to="/">Home</router-link>
			<router-link to="/about">Test</router-link>
		</div>

		<div id="steamEntry">
			<label for="idEntry">steamID: </label>
		<input type="text" id="idEntry" name="idEntry" v-model="idEntry" />
		<button @click="submitEntry"> Submit ID</button>
		</div>

		<router-view />
		<p @click="onClick">hello, Test</p>
	</div>

	<scripts>
		clientJS = require('./index.js')
		var vm = new Vue({
			el: '#app'
			data: {
				idEntry: ''
			}
			methods: {
				submitEntry: function (event) {
					clientJS.steamPostData(idEntry)
				}
			}
		})

	</scripts>
</body>
</html>