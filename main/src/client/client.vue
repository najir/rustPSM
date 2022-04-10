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
			<router-link to="/test">Test</router-link>
		</div>
		<router-view />
		<p @click="onClick">hello, Test</p>
	</div>
	<div id="app2">
		<p v-show="showText">This is some text on a page.</p>
		<button @click="showText = !showText">Toggle Text</button>
	</div>
	<div id="app3">
		<label for="test">Test: </label>
		<input type="text" id="test" name="test" v-model="name" />
		<p v-show="name != ''"> This is a, {{ name }} </p>
	</div>
	<div id="helloApp">
		<h1>{{ msg }}</h1>
	</div>

	<script>
		new Vue({
			el: '#helloApp',
			data: {
				msg: 'Hello, Vue!'
			}
		});
	</script>

	<script>
		new Vue({
			el: '#app3',
			data: {
				name: ''
			}
		});
	</script>
	<script>
		new Vue({
			el: '#app',
			mounted() {
				console.log('component is mounted')
			}
		});
	</script>
	<script>
		new Vue({
			el: '#app',
			methods: {
				onClick(x) {
					console.log(x.currentTarget.innerText)
				}
			}
		});
	</script>
	<script>
		const vm = new Vue({
			el: '#app2'
			data: {
				showText: true
			}
		})
	</script>
</body>
</html>