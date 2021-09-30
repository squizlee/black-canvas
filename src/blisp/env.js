// STANDARD LIBRARY/ENVIRONMENT OF BLISP
// TODO: Test each env function

// TODO: empty arg tests
// TODO: debug return a string instead of printing to browser console
const env = {
	// arithmetic
	"+": (...nums) => {
		nums.reduce((prev, curr) => prev + curr);
	},
	"*": (...nums) => {
		nums.reduce((prev, curr) => prev * curr);
	},

	// misc
	debug: (...args) => console.log(...args),
	time: () => Date.now(),
};

export default env;
