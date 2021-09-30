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

router.post("/login", (req, res) => {
	let body = req.body;
	console.log(body);

	res.status(200).send("Implement me please");
});

export default router;
