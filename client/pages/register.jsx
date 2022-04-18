import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { EyeOffIcon, EyeIcon } from "@heroicons/react/outline";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const checkIsValidEmail = (email) => {
		const re =
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(String(email).toLowerCase());
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			const {
				data: { message },
			} = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
				name,
				email,
				password,
				passwordConfirm,
			});

			toast.success(`${message}. Please login.`);
			setIsLoading(false);
		} catch (error) {
			toast.error(error.response.data.message);
			setIsLoading(false);
		}
	};

	return (
		<div className="h-screen overflow-auto bg-gradient-to-r from-secondary to-primary">
			{/* Progress bar */}
			{isLoading && (
				<progress className="progress progress-accent w-full" />
			)}

			{/* Jumbotron */}
			<div className="hero h-44">
				<div className="hero-content text-center text-white">
					<div className="max-w-md">
						<h1 className="text-5xl font-bold">Register</h1>
					</div>
				</div>
			</div>

			{/* Form */}
			<div className="container mx-auto">
				<form onSubmit={handleSubmit}>
					<div className="form-control w-full mb-5 mx-auto max-w-xs md:max-w-md">
						<label className="label">
							<span className="label-text text-white">Name</span>
						</label>
						<input
							type="text"
							placeholder="John Doe"
							className="input input-bordered text-white w-full max-w-xs md:max-w-md"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>

					<div className="form-control w-full mb-3 mx-auto max-w-xs md:max-w-md">
						<label className="label">
							<span className="label-text text-white">Email</span>
						</label>
						<input
							type="text"
							placeholder="john@yousuckatcoding.net"
							className="input input-bordered text-white w-full max-w-xs md:max-w-md"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
						<label className="label">
							<span className="label-text-alt text-error">
								{email &&
									!checkIsValidEmail(email) &&
									"Invalid email"}
							</span>
						</label>
					</div>

					<div className="form-control w-full mb-2 mx-auto max-w-xs md:max-w-md">
						<label className="label">
							<span className="label-text text-white">
								Password
							</span>
						</label>
						<input
							type={showPassword ? "text" : "password"}
							placeholder="**********"
							className="input input-bordered text-white w-full max-w-xs md:max-w-md"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
						<label className="label">
							<span className="label-text-alt text-error">
								{password &&
									password.length < 6 &&
									"Password must be at least 6 characters"}
							</span>
							<label className="swap">
								<input
									type="checkbox"
									onChange={() =>
										setShowPassword(!showPassword)
									}
								/>
								<div className="swap-on">
									{<EyeIcon className="w-5 h-5" />}
								</div>
								<div className="swap-off">
									{<EyeOffIcon className="w-5 h-5" />}
								</div>
							</label>
						</label>
					</div>

					<div className="form-control w-full mb-5 mx-auto max-w-xs md:max-w-md">
						<label className="label">
							<span className="label-text text-white">
								Confirm Password
							</span>
						</label>
						<input
							type={showPasswordConfirm ? "text" : "password"}
							placeholder="**********"
							className="input input-bordered text-white w-full max-w-xs md:max-w-md"
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
							required
						/>
						<label className="label">
							{password && passwordConfirm ? (
								<>
									{password !== passwordConfirm ? (
										<span className="label-text-alt text-error">
											Passwords do not match
										</span>
									) : (
										<span className="label-text-alt text-success">
											Passwords match
										</span>
									)}
								</>
							) : (
								<span />
							)}
							<label className="swap">
								<input
									type="checkbox"
									onChange={() =>
										setShowPasswordConfirm(
											!showPasswordConfirm
										)
									}
								/>
								<div className="swap-on">
									{<EyeIcon className="w-5 h-5" />}
								</div>
								<div className="swap-off">
									{<EyeOffIcon className="w-5 h-5" />}
								</div>
							</label>
						</label>
					</div>

					<br />
					<div className="text-center mb-5">
						<button
							className="btn btn-accent btn-md lg:btn-lg"
							disabled={
								!name ||
								!email ||
								(email && !checkIsValidEmail(email)) ||
								!password ||
								!passwordConfirm ||
								password !== passwordConfirm ||
								isLoading
							}
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
