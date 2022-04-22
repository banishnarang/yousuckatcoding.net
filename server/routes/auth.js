import { Router } from "express";

const router = Router();

// controllers
import { register, login } from "../controllers/auth";

router.post("/register", register);
router.post("/login", login);

module.exports = router;
