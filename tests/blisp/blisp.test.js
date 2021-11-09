import fs from "fs";
import interpreter from "../../src/blisp/interpreter.js";

const scriptPath = "../../documentation/example_programs/";

const scripts = {
	funcs_and_variables: "funcs_and_variables.bl",
	objects: "objects.bl",
	cond: "cond.bl",
};

function readFile(scriptName) {
	const buffer = fs.readFileSync(
		new URL(scriptPath + scriptName, import.meta.url),
		{ encoding: "utf8", flag: "r" }
	);
	interpreter(buffer);
}

function main() {
	readFile(scripts.objects);
}

main();
