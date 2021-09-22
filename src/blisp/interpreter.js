// THE ENTRY POINT I.E. Main
import env from "./env";
// Takes source code, interprets and returns a JS interpretation
function interpret(sourceCode) {
	console.log("Interpreting...");
	const tokens = tokenize(sourceCode);
}

function tokenize(source) {
	const CreateToken = (type, value) => {
		return {
			type: type,
			value: value,
		};
	};

	let inComment = false;

	for (let i = 0; i < source.length; ++i) {
		// handle comments
		if (source.charAt(i) === ";") {
			inComment = true;
		}

		if (source.charAt(i) === "\n") {
			inComment = false;
		}
	}

	const tokens = [];

	return 0;
}

export default interpret;
