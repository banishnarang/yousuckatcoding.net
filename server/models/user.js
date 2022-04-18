import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
	{
		name: {
			type: String,
			trim: true,
			required: true,
		},
		email: {
			type: String,
			trim: true,
			required: true,
			lowercase: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
			min: 6,
			max: 64,
		},
		avatar: String,
		role: {
			type: String,
			default: "Student",
			enum: ["Student", "Instructor", "Admin"],
		},
		stripeAccountId: "",
		stripeSeller: {},
		stripeSession: {},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("User", userSchema);
