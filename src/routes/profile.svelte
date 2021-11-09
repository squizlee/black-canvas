<script>
	import Footer from "../components/Footer.svelte";
	import { onMount } from "svelte";
	import axios from "axios";

	let username = "anon";

	onMount(async () => {
		let res = await axios.get("http://localhost:8000/api/profile", {
			withCredentials: true,
		});
		let profile = res.data;
		username = profile.username;
	});
</script>

<h1>Profile</h1>
<p>Username: {username}</p>
<Footer />

<style></style>
