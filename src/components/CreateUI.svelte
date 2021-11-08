<script>
// UI and Logic for handling UI events
import axios from "axios";

function submit() {
	console.log("Hi there");
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