<script>
	let sourceCode = 
	`;; Author: Unknown \n(set-context \"grid\" 10)`;
	import interpreter from "../blisp/interpreter";
	import env from "../blisp/env.js";


	function keyInput(e){
		if(e.key === "Tab"){
			e.preventDefault();
			sourceCode += "  ";
		}
		
		if(e.key === "Enter" && e.ctrlKey )
		{
			// clear canvas before running again
			env.clear();
			// pass value to interpreter
			interpreter(sourceCode);
		}
		
	}
	

</script>

<style>
	textarea{ 
		width: 100%;
		height: 100%;
		border: 1px solid yellow;
		background: none;
		color: white;
		resize: none;
	}
</style>

<textarea spellcheck="false" autocomplete="false" autocorrect="off" id="text-editor" cols="30" rows="10" bind:value={sourceCode} on:keydown={keyInput}></textarea>