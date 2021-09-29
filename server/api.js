import { Router } from "express";

const router = Router();

router.post("/register", (req, res) => {
	console.log("POST to register");
	console.log(req.body);
	res.status(200).send("ok!");
});

export default router;
