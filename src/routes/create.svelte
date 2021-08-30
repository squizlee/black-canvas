<script>
	import { onMount } from "svelte";
	
	onMount(() => {
		const canvas = document.getElementById("preview");
		// @ts-ignore
		const ctx = canvas.getContext("2d");
		canvas.style.width = "100%";
		ctx.fillStyle = "green";
		ctx.fillRect(10,10,150,100);
	});

</script>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 3fr 0.5fr;
		min-height: 100vh;
		max-height: 100vh;
	}
	
	#text-editor {
		border: 1px solid red;
		grid-row-start: 1;
		padding: 2rem;
	}
	
	#debug {
		border: 1px solid blue;
		grid-row-start: 2;
	}
	
	#preview {
		border: 1px solid white;
		grid-row-start: 1;
		grid-row-end: 3;
		width: 100%;
		margin: auto;
		max-height: 80vh;
	}
	
</style>


<main>
	<section id="text-editor" contenteditable>TEXT EDITOR</section>
	<section id="debug">
		<em class="hint-txt">This is the debug screen all (debug) commands will be shown here</em>
		<p id="debug-output"></p>
	</section>
	<canvas id="preview"></canvas>
</main>