import { Router } from "express";

const router = Router();

// controllers
import { register } from "../controllers/auth";

router.get("/register", register);

module.exports = router;
