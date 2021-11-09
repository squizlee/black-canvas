<script>
	import axios from "axios";
	import { goto } from "$app/navigation";

	let username;
	let password;
	let email;
	let information = "";
	let isError = false;
	async function handleSubmit() {
		isError = false;
		let res;
		try {
			res = await axios.post("http://localhost:8000/api/register", {
				username: username,
				password: password,
				email: email,
			});
			information = res.data;
			information += " redirecting you to login";
			// move to login 3 seconds after
			setTimeout(() => goto("/login"), 3000);
		} catch (error) {
			information = error.response.data;
			isError = true;
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
	<p class={isError ? "error" : "success"}>
		{information}
	</p>
</form>

<p>Already have an account?</p>
<a href="/login">
	<button>Log In</button>
</a>

<style>
	.error {
		color: red;
	}

	.success {
		color: green;
	}
</style>
