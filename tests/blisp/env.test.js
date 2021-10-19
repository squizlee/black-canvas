import env from "../../src/blisp/env.js";

// main func
function test() {
	console.log("TESTING ENV");
	testAddition();
	testMultiply();
	testSubtraction();

	testDebug();
}
test();

function testAddition() {
	const none = env["+"]([]);
	const some = env["+"]([1, 2, 3]);
	const stringWeirdnesss = env["+"](["x", "y"]);
	console.log("addition", none, some, stringWeirdnesss);
}

function testMultiply() {
	const none = env["*"]([]);
	const some = env["*"]([1, 2, 3]);
	console.log("multiply", none, some);
}

function testSubtraction() {
	const none = env["-"]([]);
	const some = env["-"]([1, 2, 3]);
	const c = env["-"]([1, 2]);

	console.log("subtraction", none, some, c);
}

function testDebug() {
	const none = env.debug([]);
	const some = env.debug(["adventure"]);
	console.log("debug", none, some);
}
