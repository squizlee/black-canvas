import { config } from "dotenv";
config();

import express from "express";
import apiRouter from "./api.js";
import connect from "./db/connect.js";
import cookieParser from "cookie-parser";
import { randomBytes } from "./hash.js";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = 8000;
const ORIGIN = process.env.ORIGIN || "blackcanvas.com";

axios.defaults = { withCredentials: true };

// MIDDLEWARE
// cors middleware
app.use(cookieParser(process.env.TOKEN_SECRET));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(express.json()); // handle json in body
// middleware
app.use("/api", apiRouter);

app.get("/", (req, res) => {
	console.log("Hello Sailor");
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
