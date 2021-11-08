<script>
	import axios from "axios";

	let username;
	let password;
	let email;
	async function handleSubmit() {
		try {
			let res = await axios.post("http://localhost:8000/api/register", {
				username: username,
				password: password,
				email: email,
			});
		} catch (error) {
			console.log("ERROR:", error.response.data);
		}
	}
</script>

<h1>Register</h1>

<form on:submit|preventDefault={handleSubmit}>
	<label for="username">username</label>
	<input type="text" id="username" required bind:value={username} />
	<label for="password">password</label>
	<input type="password" id="password" required bind:value={password} />
	<input type="submit" value="REGISTER" />
</form>

<p>Already have an account?</p>
<a href="/login">
	<button>Log In</button>
</a>
