import { Router } from "express";

const router = Router();

// middlewares
import { requireSignin } from "../middlewares/index";

// controllers
import {
	register,
	login,
	logout,
	currentUser,
	sendTestEmail,
} from "../controllers/auth";

// auth
router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/send-email", sendTestEmail);

// get current user
router.get("/current-user", requireSignin, currentUser);

module.exports = router;
