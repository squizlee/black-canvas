<script>
	import { onMount } from "svelte";
	import TextEditor from "../components/TextEditor.svelte";
	
	let canvas;
	let ctx;
	
	onMount(() => {
		canvas = document.getElementById("canvas");
		// @ts-ignore
		ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = true;
		canvas.style.width = "100%";
		canvas.style.height = "100%";
		draw(ctx);
	});
	
	function draw(ctx){
		ctx.fillStyle = "green";
		ctx.fillRect(0,0,150,100);
	}

</script>

<style>
	main {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 3fr 0.5fr;
		min-height: 100vh;
		max-height: 100vh;
	}
	
	#text-editor-container {
		border: 1px solid red;
		grid-row-start: 1;
		padding: 2rem;
		padding-left: 20px;
	}
	
	#debug {
		border: 1px solid blue;
		grid-row-start: 2;
	}
	
	#canvas {
		border: 1px solid white;
		grid-row-start: 1;
		grid-row-end: 3;
		margin: auto;
		max-height: 80vh;
	}
	
</style>


<main>
	<section id="text-editor-container">
		<TextEditor />
	</section>
	<section id="debug">
		<em class="hint-txt">This is the debug screen all (debug) commands will be shown here</em>
		<p id="debug-output"></p>
	</section>
	<canvas id="canvas"></canvas>
</main>