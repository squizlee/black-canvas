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
};

export default env;
