<script>
// UI and Logic for handling UI events
import axios from "axios";
import {program_source} from "../state/program_source.js";

function submit() {
	console.log("submit", $program_source);
}

function save() {
	console.log("save");
}

</script>

<section id="create-ui">
	<button on:click={submit}>submit</button>
</section>

<style>
	#create-ui {
		display: flex;
		position: absolute;
		top: 0;
	}
</style>