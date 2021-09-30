import { Router } from "express";
import bcrypt from "bcrypt";
import connect from "./db/connect.js";

const router = Router();

router.post("/register", (req, res) => {
	console.log("POST to register");
	console.log(req.body);
	let body = req.body;
	// hash
	const saltRounds = 10;
	bcrypt.hash(body.password, saltRounds, async (err, hash) => {
		if (err) {
			res.status(500).send();
		}

		const db = await connect();
		db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
			body.username,
			hash,
		]);
		res.status(200).send("ok!");
	});
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
