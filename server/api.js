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
		const db = await connect();
		db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
			body.username,
			hash,
		]);
		res.status(200).send("ok!");
	});
});

export default router;
