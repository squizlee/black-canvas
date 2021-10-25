// STANDARD LIBRARY/ENVIRONMENT OF BLISP
// TODO: Test each env function
import * as util from "./util.js";

const env = {
	// arithmetic
	// nums: array
	"+": (nums) => {
		if (!nums) return 0;
		return nums.reduce((prev, curr) => prev + curr, 0);
	},
	// nums: array
	"*": (nums) => {
		if (!nums) return 1;
		return nums.reduce((prev, curr) => prev * curr, 1);
	},
	"-": (nums) => {
		if (!nums) return 0;
		return nums.reduce((prev, curr, index) => {
			if (index === 0) return curr;
			return prev - curr;
		}, 0);
	},

	// misc
	// args: array
	debug: (args) => {
		let out = "";
		for (const element of args) {
			out += " " + element;
		}
		return out;
	},
	time: () => Date.now(),

	// CANVAS API SUPPORT
	// THIS ONLY WORKS WHEN THE CREATE.SVELTE CREATES CONTEXT
	"set-fillStyle": (args) => {
		env._ctx.fillStyle = args[0];
	},
	"set-strokeStyle": (args) => {
		env._ctx.strokeStyle = args[0];
	},
	fillRect: (args) => env._ctx.fillRect(args[0], args[1], args[2], args[3]),
	strokeRect: (args) => {
		env._ctx.strokeRect(...args);
	},

	// BLISP API
	// ARGS:
	//		CONTEXT: STRING ("grid")
	context: null, // context defines a number of available functionality to be used by the creator
	"set-context": (args) => {
		console.log(args);
		let size = args[1];
		util.drawGrid(env._ctx, size);
	},
	clear: () => {
		env._ctx.clearRect(0, 0, env._width, env._height);
		return "cleared";
	},
};

export default env;
