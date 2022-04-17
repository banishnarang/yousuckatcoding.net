import { Router } from "express";

const router = Router();

// controllers
import { register } from "../controllers/auth";

router.post("/register", register);

module.exports = router;
