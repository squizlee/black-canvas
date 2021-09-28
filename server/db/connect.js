import sqlite3 from "sqlite3";
import { open } from "sqlite";

if (process.env === "development") {
	sqlite3.verbose();
}

// returns an instance of db upon successful connection
async function connect() {
	// filename assumes that the directory already exists so that it can write to it
	const db = await open({
		filename: "/tmp/blackcanvas.db",
		driver: sqlite3.Database,
	});

	console.log("DB Connected To");
	return db;
}

export default connect;
