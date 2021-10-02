import fs from "fs";
import interpreter from "../../src/blisp/interpreter.js";

const scriptPath = "../../documentation/example_programs/";

const scripts = ["init.bl"];

function readFile(scriptName) {
	const buffer = fs.readFileSync(
		new URL(scriptPath + scriptName, import.meta.url),
		{ encoding: "utf8", flag: "r" }
	);
	console.log(buffer);
	interpreter(buffer);
}

function main() {
	readFile(scripts[0]);
}

main();
