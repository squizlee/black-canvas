import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	console.log("GET TO API");
});

export default router;
