import { Router } from "express";
import hash from "./hash.js";
import connect from "./db/connect.js";
import bcrypt from "bcrypt";

const router = Router();

router.post("/register", async (req, res) => {
	console.log("POST to register");
	console.log(req.body);
	let body = req.body;
	// hashing of password
	const hashedPassword = await hash(body.password);
	if (hashedPassword === -1) res.status(500).send("Internal Server Error");

	console.log("hashed password", hashedPassword);

	const db = await connect();
	db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
		body.username,
		hashedPassword,
	]);
	res.status(200).send("ok!");
});

router.post("/login", async (req, res) => {
	let body = req.body;

	const db = await connect();
	let row = await db.get("SELECT password from users WHERE username = ?;", [
		body.username,
	]);
	if (!row) {
		res.status(400).send("Error username does not exist");
	} else {
		// check password
		bcrypt.compare(body.password, row.password, (err, result) => {
			if (err) res.status(500).send();
			else {
				// TODO: Set cookie
				result
					? res.status(200).send()
					: res.status(200).send("Error details incorrect");
			}
		});
	}
});

export default router;
