// THE ENTRY POINT I.E. Main
//

const TokenTypes = {
	LET: "LET",
	DEFINE: "DEFINE",
	OPEN: "OPEN",
	CLOSE: "CLOSE",
	NUMBER: "NUMBER",
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
	const isAtEnd = () => current === source.length;
	const advance = () => {
		++current;
		return source.charAt(current);
	};
	const peek = () => {
		return source.charAt(current + 1);
	};
	const currentChar = () => {
		return source.charAt(current);
	};

	// decimal point allowed
	const isDigit = (char) => /\d/.test(char);
	const isAlphaNumeric = (char) => /\d|\w/.test(char);

	const tokens = [];
	let current = 0; // current position in the source code
	let line = 1; // capture current line for debugging purposes
	let start = 0; // beginning of lexeme

	while (!isAtEnd()) {
		let char = source.charAt(current);

		switch (char) {
			case "(":
				addToken(TokenTypes.OPEN, null);
				break;
			case ")":
				addToken(TokenTypes.CLOSE, null);
				break;
			case "\n":
				++line;
				break;
			case "\t":
			case " ":
			case "\r":
				break;
			// COMMENTS
			case ";":
				while (current !== source.length - 1 && peek() !== "\n") {
					console.log(currentChar());
					advance();
				}
				break;
			default:
				// TODO: Bug, off by one error for tokenizing
				// TODO: Bug, numbers with decimal point but no following nums should be an error
				// check for isNumber
				if (isDigit(char)) {
					start = current;
					while (isDigit(peek()) || peek() === ".") {
						advance();
					}
					//console.log("current: ", source.charAt(current));
					const substr = source.substring(start, current);
					//console.log(/^\d+(\.\d+)?$/.test(substr));
					//jconsole.log(substr);
				} else if (isAlphaNumeric()) {
					// check if a keyword, otherwise an identifier
				} else {
					error("Unknown symbol", line);
				}
		}

		++current;
	}

	return tokens;
}

// loops through tokens and constructs AST
function ast(tokens) {}

function error(msg, line) {
	console.error(`Error at line: ${line}, ${msg}`);
}

export default interpret;
