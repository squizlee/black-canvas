import { Router } from "express";
import hash, { randomBytes } from "./hash.js";
import connect from "./db/connect.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import ms from "ms";

const router = Router();

router.post("/register", async (req, res) => {
	let { username, password } = req.body;
	username = username.toLowerCase();
	// check if username already exists in the system
	const db = await connect();
	let search = await db.get("SELECT username FROM users WHERE username = ?", [
		username,
	]);
	if (search) {
		res.status(400).send("User already exists");
		return;
	}

	// hashing of password
	const hashedPassword = await hash(password);
	if (hashedPassword === -1) res.status(500).send("Internal Server Error");

	db.run("INSERT INTO users (username, password) VALUES (?, ?)", [
		username,
		hashedPassword,
	]);
	res.status(200).send("account created!");
});

router.post("/login", async (req, res) => {
	let { username, password } = req.body;
	username = username.toLowerCase();

	const db = await connect();
	let row = await db.get("SELECT password from users WHERE username = ?;", [
		username,
	]);
	if (!row) {
		res.status(400).send("Error username does not exist");
	} else {
		// check password
		bcrypt.compare(password, row.password, (err, result) => {
			if (err) res.status(500).send();
			else {
				if (result) {
					// create cookie
					res.cookie("token", `test`, {
						signed: true,
						maxAge: ms("24hrs"),
					}).send();
					return;
				} else {
					res.status(200).send("Error details incorrect");
				}
			}
		});
	}
});

router.get("/profile", (req, res) => {
	console.log(req.signedCookies);
	return res.send("loading");
});

export default router;
