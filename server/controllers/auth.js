import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";

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
	} catch (err) {
		return res.status(400).json({
			message: err.message,
		});
	}
};
