import connect from "./connect.js";

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
			email TEXT,
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
	console.log("SUCCESS");
}

init();
