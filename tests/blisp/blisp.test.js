import fs from "fs";
import interpreter from "../../src/blisp/interpreter.js";

const scriptPath = "../../documentation/example_programs/";

const scripts = ["init.bl", "hello_world.bl", "simple_math.bl"];

function readFile(scriptName) {
	const buffer = fs.readFileSync(
		new URL(scriptPath + scriptName, import.meta.url),
		{ encoding: "utf8", flag: "r" }
	);
	interpreter(buffer);
}

function main() {
	readFile(scripts[2]);
}

main();
