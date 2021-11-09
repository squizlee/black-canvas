<script>
	// UI and Logic for handling UI events
	import axios from "axios";
	import { program_source } from "../state/program_source";
	import { onMount } from "svelte";
	import { openModal } from "svelte-modals";
	import SubmitModal from "../components/SubmitModal.svelte";
	import Modals from "./Modals.svelte";

	let user = "anon";

	onMount(async () => {
		try {
			let { data } = await axios.get(
				"http://localhost:8000/api/profile",
				{
					withCredentials: true,
				}
			);
			user = data.username || "anon";
		} catch {
			console.log("Error pinging server");
		}
	});

	function submit() {
		console.log("submit", $program_source);
		openModal(SubmitModal, { username: user });
	}

	function save() {
		console.log("save");
	}
</script>

<Modals />
<section id="create-ui">
	<button on:click={submit}>submit</button>
	<p>Logged in as <span>{user}</span></p>
	{#if user === "anon"}
		<a href="/profile">
			<button>account</button>
		</a>
	{/if}
	<button on:click={submit}>save</button>
</section>

<style>
	#create-ui {
		display: flex;
		position: absolute;
		top: 0;
		left: 1.25rem;
		height: 2rem;
		align-items: center;
	}

	#create-ui > * {
		margin-right: 1.25rem;
	}

	span {
		color: yellow;
	}
</style>
