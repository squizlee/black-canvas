<script>

	import {program_source} from "../state/program_source.js";
	import interpreter from "../blisp/interpreter";
	import env from "../blisp/env.js";

	function keyInput(e){
		if(e.key === "Tab"){
			e.preventDefault();
			//sourceCode += "  ";
			program_source.update(val => val + '  ');
		}
		
		if(e.key === "Enter" && e.ctrlKey )
		{
			// clear canvas before running again
			env.clear();
			// pass value to interpreter
			interpreter($program_source);
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

<textarea spellcheck="false" autocomplete="false" autocorrect="off" id="text-editor" cols="30" rows="10" bind:value={$program_source} on:keydown={keyInput}></textarea>