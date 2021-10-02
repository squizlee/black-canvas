<script>
	let sourceCode = `;; Author: Unknown\n(let x 10)`;
	import interpreter from "../blisp/interpreter";


	function keyInput(e){
		console.log("Key Input!:", e);
		if(e.key === "Tab"){
			e.preventDefault();
			sourceCode += "    ";
		}
		
		if(e.key === "Enter" && e.ctrlKey )
		{
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