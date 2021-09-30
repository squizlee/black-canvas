// THE ENTRY POINT I.E. Main
//

const TokenTypes = {
	LET: "LET",
	DEFINE: "DEFINE",
	OPEN: "OPEN",
	CLOSE: "CLOSE",
};

// Takes source code, interprets and returns a JS interpretation
function interpret(sourceCode) {
	console.log("Interpreting...");
	const tokens = tokenize(sourceCode);
	console.log("Returned tokens", tokens);
}

// creates an array of tokens from source code
function tokenize(source) {
	const CreateToken = (type, value) => {
		return {
			type: type,
			value: value,
		};
	};

	const addToken = (type, value) => tokens.push(CreateToken(type, value));
	const isAtEnd = (c) => c === source.length;
	const advance = (c) => {
		return source.charAt(c);
	};

	const tokens = [];
	let current = 0; // current position in the source code
	let line = 0; // capture current line for debugging purposes
	let start = 0; // beginning of lexeme

	while (!isAtEnd(current)) {
		let char = source.charAt(current);

		switch (char) {
			case "(":
				addToken(TokenTypes.OPEN, null);
				break;
			// COMMENTS
			case ";":
				while (advance(current) != "\n") ++current;
				break;
			default:
			// check if it matches keyword
			// check for isNumber
			// check for isAlphaNumeric
		}

		++current;
	}

	return tokens;
}

// loops through tokens and constructs AST
function ast(tokens) {}

export default interpret;
