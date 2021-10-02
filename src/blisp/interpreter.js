// THE ENTRY POINT I.E. Main
//

const TokenTypes = {
	OPEN: "OPEN",
	CLOSE: "CLOSE",
	NUMBER: "NUMBER",
	STRING: "STRING",
	EOF: "EOF",
	FUNC: "FUNC",
	SYMBOL: "SYMBOL",
	LET: "LET",
};

const Keywords = new Map();
Keywords.set("let", "LET");
Keywords.set("func", "FUNC");

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
		if (isAtEnd()) return false;
		return source.charAt(current++);
	};
	const peek = () => {
		if (isAtEnd()) return false;
		return source.charAt(current + 1);
	};
	const currentChar = () => {
		return source.charAt(current);
	};

	// decimal point allowed
	const isDigit = (char) => /\d/.test(char);
	const isAlphaNumeric = (char) => /(\d|\w|-|_)/.test(char);

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
			case '"':
				start = current + 1; // the start of the string
				while (peek() !== '"') {
					advance();
					if (isAtEnd()) {
						error("Unterminated string", line);
						return;
					}
				}
				addToken(
					TokenTypes.STRING,
					source.substring(start, current + 1)
				);
				advance(); // move past the second quote to avoid infinite loop
				break;
			// COMMENTS
			case ";":
				while (current !== source.length - 1 && peek() !== "\n") {
					advance();
				}
				break;
			default:
				// TODO: Bug, numbers with decimal point but no following nums should be an error
				// check for isNumber
				if (isDigit(char)) {
					start = current;
					while (isDigit(peek()) || peek() === ".") {
						advance();
					}
					const substr = source.substring(start, current + 1);
					addToken(TokenTypes.NUMBER, substr);
				} else if (isAlphaNumeric()) {
					// check for identifier/symbol
					// check if a keyword, otherwise an identifier
					start = current;
					while (isAlphaNumeric(peek())) advance();

					let substr = source.substring(start, current + 1);
					if (Keywords.has(substr)) {
						addToken(Keywords.get(substr), null);
					} else {
						addToken(TokenTypes.SYMBOL, substr);
					}
				} else {
					error("Unknown symbol", line);
				}
		}

		++current;
	}

	addToken(TokenTypes.EOF, "null");

	return tokens;
}

// loops through tokens and constructs AST
function ast(tokens) {}

function error(msg, line) {
	console.error(`Error at line: ${line}, ${msg}`);
}

export default interpret;
