<script>
	import axios from "axios";
	let username; // username or email
	let password;
	async function handleSubmit(){
		let res = await axios.post("http://localhost:8000/api/login", {
			username: username,
			password: password
		});
		
	}

</script>

<h1>Log In</h1>

<form on:submit|preventDefault={handleSubmit}>
	<label for="username">username</label>
	<input type="text" id="username" required bind:value={username}>
	<label for="password">password</label>
	<input type="password" id="password" required bind:value={password}>
	<input type="submit" value="Enter">
</form>

<p>Don't have an account?</p>
<a href="/register">
	<button>Register</button>
</a>