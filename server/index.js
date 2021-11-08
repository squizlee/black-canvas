import { config } from "dotenv";
config();

import express from "express";
import apiRouter from "./api.js";
import connect from "./db/connect.js";
import cookieParser from "cookie-parser";
import ms from "ms";

const app = express();
const PORT = 8000;
const ORIGIN = process.env.ORIGIN || "blackcanvas.com";

// MIDDLEWARE
// cors middleware
app.use((req, res, next) => {
	console.log("Inside cors check");
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	next();
});
app.use(express.json()); // handle json in body
app.use(cookieParser({ httpOnly: true, expires: Date.now() * ms("24h") }));
// middleware
app.use("/api", apiRouter);

app.get("/", (req, res) => {
	console.log("Hello Sailor");
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
