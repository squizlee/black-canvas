import sqlite3 from "sqlite3";
import connect from "./connect.js";

// POPULATES DB WITH TABLES AND DUMMY DATA
async function init() {
	const db = await connect();

	// DELETE ALL TABLES
	await db.exec("DROP TABLE IF EXISTS users; DROP TABLE IF EXISTS creations"); // reset
	const createTables = `
		CREATE TABLE users (
			username TEXT NOT NULL,
			password TEXT NOT NULL,
			email TEXT
		);
	`;
	await db.exec(createTables); // create tables
}

init();
