<script>
// @ts-nocheck

	import { onMount } from "svelte";
	import TextEditor from "../components/TextEditor.svelte";
	import env from "../blisp/env.js";
	
	let canvas;
	let ctx;
	

	onMount(() => {
		canvas = document.getElementById("canvas");
		let container = document.getElementById("canvas-container");
		
		ctx = canvas.getContext("2d");
		ctx.imageSmoothingEnabled = true;
		canvas.width = container.clientHeight;
		canvas.height = container.clientHeight;
		
		window.onresize = () => {
			canvas.width = container.clientHeight;
			canvas.height = container.clientHeight;
			env._width = canvas.width;
			env._height = canvas.height;
			
		}
		
		canvas.onclick = (e) => {
			let x = e.layerX;
			let y = e.layerY;
			console.log(x, y);
		}

		// populate ctx
		env._ctx = ctx;
		env._width = canvas.width;
		env._height = canvas.height;
		console.log(env);
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
	
	#text-editor-container {
		grid-row-start: 1;
		padding: 2rem;
		padding-left: 20px;
		min-width: 100%;
	}
	
	#debug {
		grid-row-start: 2;
	}
	
	canvas {
		display: block;
		margin: 0 auto;
		outline: 1px dashed white;
	}
	
	#canvas-container {
		grid-row-start: 1;
		grid-row-end: 3;
		height: 100vh;
		width: 100%;
	}
	
	@media screen and (max-width: 1000px) {
		main {
			display: flex;
			flex-direction: column;
		}
	}
	
</style>


<main>
	<section id="text-editor-container">
		<TextEditor />
	</section>
	<section id="debug">
		<em class="hint-txt">This is the output screen, all evaluations and (debug) commands will go here</em>
		<p id="debug-output"></p>
	</section>
	<section id="canvas-container">
		<canvas id="canvas"></canvas>
	</section>
</main>