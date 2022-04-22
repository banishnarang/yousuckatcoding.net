import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	try {
		const { name, email, password, passwordConfirm } = req.body;

		// missing values
		if (!name || !email || !password) {
			return res.status(400).json({
				message: "Missing values",
			});
		}

		// password length
		if (password.length < 6) {
			return res.status(400).json({
				message: "Password must be at least 6 characters long",
			});
		}

		// password match
		if (password !== passwordConfirm) {
			return res.status(400).json({
				message: "Passwords do not match",
			});
		}

		// check if user already exists
		const userExists = await User.exists({ email });
		if (userExists) {
			return res.status(400).json({
				message: "Email is already in use",
			});
		}

		// hash password
		const hashedPassword = await hashPassword(password);

		// create user
		const user = new User({
			name,
			email,
			password: hashedPassword,
		});
		// save user
		await user.save();

		// send response
		return res.status(201).json({
			message: "Registration successful",
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message,
		});
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Find user with email
		const user = await User.findOne({ email });

		// User not found
		if (!user) {
			return res.status(400).json({
				message: "Invalid email or password",
			});
		}

		// Check password
		const isValidPassword = await comparePassword(password, user.password);

		// Password is not valid
		if (!isValidPassword) {
			return res.status(400).json({
				message: "Invalid email or password",
			});
		}

		// Create token
		const token = jwt.sign(
			{
				id: user._id,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "24h",
			}
		);

		// Create cookie
		res.cookie("token", token, {
			httpOnly: true,
			secure: false, // only for https
			maxAge: 1000 * 60 * 60 * 24,
		});

		// Send response
		return res.status(200).json({
			message: "Login successful",
			user: {
				id: user._id,
				name: user.name,
				email: user.email,
			},
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message,
		});
	}
};

export const logout = (req, res) => {
	try {
		res.clearCookie("token");

		return res.status(200).json({
			message: "Logout successful",
		});
	} catch (error) {
		return res.status(400).json({
			message: error.message,
		});
	}
};
