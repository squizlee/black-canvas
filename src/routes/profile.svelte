<script>
	import Footer from "../components/Footer.svelte";
	import { onMount } from "svelte";
	import axios from "axios";
	import { goto } from "$app/navigation";

	let username = "anon";
	let status = "";

	onMount(async () => {
		let res = await axios.get("http://localhost:8000/api/profile", {
			withCredentials: true,
		});
		let profile = res.data;
		username = profile.username || "anon";
	});

	async function logout() {
		try {
			const res = await axios.get("http://localhost:8000/api/logout", {
				withCredentials: true,
			});
			status = res.data;
			goto("/");
		} catch (error) {
			console.log(error.response);
		}
	}
</script>

<h1>Profile</h1>
<p>Username: {username}</p>
<p>{status}</p>

{#if username === "anon"}
	<p>Have an account?</p>
	<a href="/login">
		<button>Login</button>
	</a>

	<p>Want to register an account?</p>
	<a href="/register">
		<button>Register</button>
	</a>
{:else}
	<button on:click={logout}>Logout</button>
{/if}
<Footer />

<style></style>
