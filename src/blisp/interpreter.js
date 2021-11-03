// THE ENTRY POINT I.E. Main
//
import { xlink_attr } from "svelte/internal";
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
	COND: "COND",
	ELSE: "ELSE",
	TRUE: "TRUE",
	FALSE: "FALSE",
};
Object.freeze(TokenTypes);

const Keywords = new Map();
Keywords.set("let", "LET");
Keywords.set("func", "FUNC");
Keywords.set("if", "IF");
Keywords.set("cond", "COND");
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
	let funcs = {};
	//let currentContext = program;
	//logAST(AST);

	// takes a token and evaluates it to a js value
	const handleType = (token, context = program) => {
		switch (token.type) {
			case "STRING":
				return token.value;
			case "NUMBER":
				return Number(token.value);
			// ignore symbols
			case "SYMBOL":
				// property @IMPROVE the regex search
				if (/\./.test(token.value)) {
					let regex = /(\w+)\.(\w+)+$/;
					let res = token.value.match(regex);
					let key = res[1];
					let prop = res[2];
					// derenference object
					return context[key][prop] || program[key][prop];
				}
				// check local/parent scopes
				if (context[token.value]) return context[token.value];
				// check global
				else if (program[token.value]) return program[token.value];
				return token.value;
			case "LIST":
				token.value = evalList(token);
				return token.value;
			case "TRUE":
			case "FALSE":
				return Boolean(token.value);
			//return token.value;
			default:
				console.log("ERROR", token);
				error("Undefined type not supported by evaluator", "");
				break;
		}
	};

	// evaluate list and return value
	// context contains scoped variables and their values
	const evalList = (list, context = program) => {
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

		const FUNC = () => {
			if (numArgs(list) < 2) {
				error(
					"Func expects the form (func (<name> <parameters>...) ...(<body>)"
				);
				return;
			}

			let func_signature = list.children[1];
			let func_body = list.children[2];

			let func_name = func_signature.children[0].value;

			// gather parameters
			let parameters = [];
			for (let i = 1; i < func_signature.children.length; ++i) {
				parameters.push(func_signature.children[i].value);
			}

			let func_context = {};
			parameters.forEach((curr) => {
				func_context[curr] = null;
			});
			// add to funcs scope
			funcs[func_name] = { context: func_context, body: func_body };
			console.log("creating", func_name, funcs[func_name]);

			return `${func_name} created`;
		};

		// @IMPROVE
		const OBJ = () => {
			let args = list.children;
			console.log("args inside OBJ", args);
			let obj = {};
			for (let i = 1; i < args.length; i += 2) {
				obj[args[i].value] = handleType(args[i + 1]);
			}

			console.log("obj", obj);
			return obj;
		};

		const IF = () => {
			console.log("IF LIST", list);
			let predicate = list.children[1];
			let trueClause = list.children[2];
			let falseClause = list.children[2];

			return handleType(predicate)
				? handleType(trueClause)
				: handleType(falseClause);
		};

		let answer; // output
		console.log("ELEMENTS", list.children);
		let elements = list.children; // list's arguments including operator
		let operator = elements[0].value; // the function to execute
		let args = []; // input

		switch (operator) {
			// special forms with their own evaluation rules
			case "let":
				answer = LET();
				break;
			case "func":
				answer = FUNC();
				break;
			case "obj":
				answer = OBJ();
				break;
			case "if":
				answer = IF();
				break;
			// apply normal evaluation procedure
			default:
				// collect arguments
				for (let i = 1; i < elements.length; ++i) {
					if (elements[i].type === "LIST") {
						args.push(evalList(elements[i], context));
					} else {
						args.push(handleType(elements[i], context));
					}
				}
				if (funcs[operator]) {
					console.log("FUNCS", funcs);
					// TODO: error checking for more than expected arguments, or less
					// we need to set args to context
					let context = funcs[operator].context;
					console.log(context);
					// map args onto list's context
					let parameters = Object.keys(context);
					console.log("params", parameters);
					for (let i = 0; i < parameters.length; ++i) {
						context[parameters[i]] = args[i];
					}
					answer = evalList(funcs[operator].body, context);
					break;
				} else answer = env[operator](args);
				list.value = answer;
				break;
		}

		return answer;
	};

	for (const item of AST) {
		if (item.type === "LIST") {
			output.push(evalList(item));
		} else {
			// ATOM
			output.push(handleType(item.children[0]));
		}
	}

	program.funcs = funcs;
	env.program = program;
	// @BUG?: sometimes gets pushed to answer when list is a procedure and not a function
	//console.log(output);
	console.log(output.filter((el) => el !== undefined));
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
	const isAlphaNumeric = (char) => /(\d|\w|-|_|:|\.)/.test(char); // support hyphen and underscores in symbols

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

function logAST(AST) {
	for (const tree of AST) {
		tree.log();
	}
}

export default interpret;
