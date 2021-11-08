import connect from "./connect.js";
import { hashSync, randomBytes } from "../hash.js";
import dotenv from "dotenv";
dotenv.config();

// POPULATES DB WITH TABLES AND DUMMY DATA
async function init() {
	const db = await connect();

	// DELETE ALL TABLES
	await db.exec("DROP TABLE IF EXISTS users; DROP TABLE IF EXISTS creations"); // reset
	// CREATE TABLES
	const createUsersTable = `
		CREATE TABLE users (
			user_id INTEGER PRIMARY KEY AUTOINCREMENT,
			username TEXT NOT NULL,
			password TEXT NOT NULL,
			stars INTEGER DEFAULT 0
		);
	
	`;
	const createCreationsTable = `
		CREATE TABLE creations (
			creation_id INTEGER PRIMARY KEY AUTOINCREMENT,
			source_code TEXT NOT NULL,
			title, TEXT,
			last_updated INTEGER NOT NULL,
			stars INTEGER DEFAULT 0,
			creator_id INTEGER, 
			FOREIGN KEY(creator_id)	REFERENCES users(user_id)
		);
	`;

	await db.exec(createUsersTable); // create tables
	await db.exec(createCreationsTable); // create tables

	// insert root/admin
	// @IMPORTANT: ROOT PASSWORD SHOULD ALWAYS BE SET IN .env FOR SECURITY
	await db.exec(
		`INSERT INTO users (username, password) VALUES ('root', '${hashSync(
			process.env.ROOT_PASSWORD || "manual"
		)}')`
	);

	await db.exec(
		`INSERT INTO users (username, password) VALUES ('anon', '${hashSync(
			randomBytes()
		)}')`
	);
	console.log("SUCCESS");
}

init();
