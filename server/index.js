import express from "express";
import apiRouter from "./api.js";
import connect from "./db/connect.js";
const app = express();
const PORT = 8000;

// connect to db
connect();

// middleware
app.use("/api", apiRouter);

app.get("/", (req, res) => {
	console.log("Hello Sailor");
});

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});
