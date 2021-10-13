// THE ENTRY POINT I.E. Main
//
import Tree from "./data_structures/Tree.js";
import env from "./env.js";

const TokenTypes = {
	OPEN: "OPEN",
	CLOSE: "CLOSE",
	NUMBER: "NUMBER",
	STRING: "STRING",
	EOF: "EOF",
	FUNC: "FUNC",
	SYMBOL: "SYMBOL",
	LET: "LET",
	IF: "IF",
	ELSE: "ELSE",
	TRUE: "TRUE",
	FALSE: "FALSE",
};

const Keywords = new Map();
Keywords.set("let", "LET");
Keywords.set("func", "FUNC");
Keywords.set("if", "IF");
Keywords.set("else", "ELSE");
Keywords.set("true", "TRUE");
Keywords.set("false", "FALSE");

let hasErrors = false;

// Takes source code, interprets and returns a JS interpretation
function interpret(sourceCode) {
	hasErrors = false;
	console.log("Interpreting...");
	const TOKENS = tokenize(sourceCode);

	if (hasErrors) {
		console.log("Cannot proceed to parsing, script has errors");
		return;
	}

	const AST = makeAST(TOKENS);
	evaluate(AST);
}

function evaluate(AST) {
	let output = []; // array of outputs
	let program = {}; // @reminder append this to env

	// takes a token and evaluates it to a js value
	const handleType = (token) => {
		switch (token.type) {
			case "STRING":
				return token.value;
			case "NUMBER":
				return Number(token.value);
			// ignore symbols
			case "SYMBOL":
				console.log("token value", token.value);
				return env.program[token.value];
				//return token.value;
			default:
				console.log("ERROR", token);
				error("Undefined type not supported by evaluator", "");
				break;
		}
	};

	//@BUG Symbols aren't evaluated as their values

	// evaluate list and return value
	const evalList = (list) => {
		// helper functions
		const numArgs = (list) => list.children.length - 1; // exclude operator
		const LET = () => {
			let output; // string to output and display
			switch (numArgs(list)) {
				case 1:
					program[list.children[1].value] = null;
					output = `${list.children[1].value} = null`;
					break;
				case 2:
					let value = handleType(list.children[2]);
					program[list.children[1].value] = value;
					console.log("hi", list.children[2]);
					output = `${list.children[1].value} = ${value}`;
					break;
				default:
					error(
						"Let requires 1 or 2 arguments, you supplied " +
							numArgs(list) +
							" arguments"
					);
					output = "Error";
					break;
			}
			return output;
		};

		// make sure the current symbol/operator is defined
		// or if it is a keyword
		if (
			!Keywords.has(list.children[0].value) &&
			!env[list.children[0].value]
		) {
			error(`${list.children[0].value} is not defined`);
		}

		let elements = list.children;
		let operator = elements[0].value;
		let args = []; // all the values that the operator will apply with
		// collect arguments
		for (let i = 1; i < elements.length; ++i) {
			if (elements[i].type === "LIST") {
				args.push(evalList(elements[i]));
			} else args.push(handleType(elements[i]));
		}

		// check here for special forms
		// func, let, if, else
		let answer;
		switch (operator) {
			case "let":
				answer = LET();
				break;
			default:
				// defined by standard lib
				answer = env[operator](args);
				list.value = answer; // list maintains value 
				break;
		}
		console.log("answer, args", answer, args);

		console.log("program before adding to env", program);
		env.program = program;
		console.log(env);

		return answer;
	};

	for (const item of AST) {
		if (item.type === "LIST") {
			// do stuff
			output.push(evalList(item));
		} else {
			// ATOM
			output.push(handleType(item.children[0]));
		}
	}
	// @BUG?: sometimes gets pushed to answer when list is a procedure and not a function
	console.log(output);
	console.log(output.filter(el => el !== undefined));
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
	const isAlphaNumeric = (char) => /(\d|\w|-|_)/.test(char); // support hyphen and underscores in symbols

	const tokens = [];
	let current = 0; // current position in the source code
	let line = 1; // capture current line for debugging purposes
	let start = 0; // beginning of lexeme
	const balancedStack = []; // check if paranthesis are balanced

	while (!isAtEnd()) {
		let char = source.charAt(current);

		switch (char) {
			case "(":
				addToken(TokenTypes.OPEN, null);
				balancedStack.push("OPEN");
				break;
			case ")":
				addToken(TokenTypes.CLOSE, null);
				balancedStack.pop();
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
				// check for isNumber
				if (isDigit(char)) {
					start = current;
					while (isDigit(peek()) || peek() === ".") {
						advance();
					}
					const substr = source.substring(start, current + 1);
					/^\d+(\.\d+)?$/.test(substr)
						? addToken(TokenTypes.NUMBER, substr)
						: error("Invalid number", line);
				} else if (isAlphaNumeric()) {
					// check for identifier/symbol
					// check if a keyword, otherwise a symbol
					start = current;
					while (isAlphaNumeric(peek())) advance();

					let substr = source.substring(start, current + 1);
					if (Keywords.has(substr)) {
						addToken(Keywords.get(substr), substr);
					} else {
						addToken(TokenTypes.SYMBOL, substr);
					}
				} else {
					error("Unknown symbol", line);
				}
		}

		++current;
	}

	// check if balanced parenthesis
	if (balancedStack.length > 0) {
		error("Unbalanced parenthesis", line);
	}

	addToken(TokenTypes.EOF, "null");

	return tokens;
}

// loops through tokens and constructs AST
function makeAST(tokens) {
	// every node in AST is either a list or an atom (a literal value such as a number or string)
	let index = 0;
	let AST = []; // array of trees
	let balancedStack = [];

	// return a list
	const LIST = () => {
		let current = tokens[index];
		let tree = new Tree("LIST");
		const isBalanced = () => balancedStack.length === 0;

		while (!isBalanced()) {
			current = tokens[index];
			if (current.type === "OPEN") {
				++index;
				balancedStack.push(1);
				tree.insert(LIST());
			} else if (current.type === "CLOSE") {
				++index;
				balancedStack.pop();
				return tree;
			} else {
				while (true) {
					if (current.type === "OPEN" || current.type === "CLOSE") {
						break;
					} else {
						tree.insert(current);
						current = tokens[++index];
					}
				}
			}
		}
		return tree;
	};

	const ATOM = () => {
		let token = tokens[index];
		let tree = new Tree(`ATOM`);
		tree.insert(token);
		++index;
		return tree;
	};

	// main
	let current = tokens[index];
	while (current.type !== "EOF") {
		switch (current.type) {
			case "OPEN":
				balancedStack.push(1);
				++index; // move forward
				AST.push(LIST());
				break;
			default:
				// handle atoms
				AST.push(ATOM());
				break;
		}
		// increment
		current = tokens[index];
	}

	return AST;
}

function error(msg, location) {
	hasErrors = true;
	if (typeof location === "number")
		console.error(`Error at line: ${location}, ${msg}`);
	if (typeof location === "string")
		console.error(`Error at ${location}, ${msg}`);
	if (!location) console.error(`Error: ${msg}`);
}

export default interpret;
