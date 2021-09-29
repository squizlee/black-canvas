<script>
	import axios from "axios";
	
	let username;
	let password;
	let email;
	async function handleSubmit(){
		console.log("submit", username, password, email);
		axios.post("http://localhost:8000/api/register", {
			username: username,	
			password: password,
			email: email
		})
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label for="username">username</label>
	<input type="text" id="username" required bind:value={username}>
	<label for="password">password</label>
	<input type="password" id="password" required bind:value={password}>
	<label for="email">email (optional)</label>
	<input type="email" id="email" bind:value={email}>
	<input type="submit" value="REGISTER">
</form>