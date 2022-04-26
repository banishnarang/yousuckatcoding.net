import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Context } from "../context";

import { EyeOffIcon, EyeIcon } from "@heroicons/react/outline";

// utils
import { checkIsValidEmail } from "../utils/auth";

const Login = () => {
	const router = useRouter();

	// local states
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// global state
	const {
		state: { user },
		dispatch,
	} = useContext(Context);

	// check if user is logged in
	useEffect(() => {
		if (user) {
			router.push("/");
		}
	}, [user]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			setIsLoading(true);

			const {
				data: { message, user },
			} = await axios.post(`/api/login`, {
				email,
				password,
			});

			toast.success(
				`${message}. Welcome back, ${user.name.split(" ")[0]}!`
			);

			// set user in global state
			dispatch({ type: "SET_USER", payload: user });

			// save user in local storage
			localStorage.setItem("user", JSON.stringify(user));

			setIsLoading(false);

			// redirect to home page
			router.push("/");
		} catch (error) {
			toast.error(error.response.data.message);
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen overflow-auto bg-gradient-to-r from-secondary to-primary">
			{/* Progress bar */}
			{isLoading && (
				<progress className="progress progress-accent w-full" />
			)}

			{/* Jumbotron */}
			<div className="hero h-40">
				<div className="hero-content text-center text-white">
					<div className="max-w-md">
						<h1 className="text-5xl font-bold">Login</h1>
					</div>
				</div>
			</div>

			{/* Form */}
			<div className="container mx-auto">
				<form onSubmit={handleSubmit}>
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
							<span />
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

					<br />
					<div className="text-center mb-4">
						<button
							className="btn btn-accent btn-wide btn-md lg:btn-lg"
							disabled={
								!email ||
								(email && !checkIsValidEmail(email)) ||
								!password ||
								isLoading
							}
						>
							Submit
						</button>
					</div>
				</form>

				<p className="text-center pb-20">
					Not yet registered?{" "}
					<Link href="/register">
						<a className="text-info">Register</a>
					</Link>
				</p>
			</div>
		</div>
	);
};

export default Login;
