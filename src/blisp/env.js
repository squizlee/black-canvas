// STANDARD LIBRARY/ENVIRONMENT OF BLISP
// TODO: Test each env function

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
