// STANDARD LIBRARY/ENVIRONMENT OF BLISP
// TODO: Test each env function

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
		return null;
	},
	fillRect: (args) => env._ctx.fillRect(args[0], args[1], args[2], args[3]),
};

export default env;
