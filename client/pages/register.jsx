import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const {
				data: { message },
			} = await axios.post("http://localhost:8080/api/register", {
				name,
				email,
				password,
				passwordConfirm,
			});

			toast.success(`${message}, please login`);
		} catch (error) {
			toast.error(error.response.data.message);
		}
	};

	return (
		<div className="flex flex-col bg-gradient-to-r from-secondary to-primary">
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

					<div className="form-control w-full mb-5 mx-auto max-w-xs md:max-w-md">
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
					</div>

					<div className="form-control w-full mb-5 mx-auto max-w-xs md:max-w-md">
						<label className="label">
							<span className="label-text text-white">
								Password
							</span>
						</label>
						<input
							type="password"
							placeholder="**********"
							className="input input-bordered text-white w-full max-w-xs md:max-w-md"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<div className="form-control w-full mb-5 mx-auto max-w-xs md:max-w-md">
						<label className="label">
							<span className="label-text text-white">
								Confirm Password
							</span>
						</label>
						<input
							type="password"
							placeholder="**********"
							className="input input-bordered text-white w-full max-w-xs md:max-w-md"
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
							required
						/>
					</div>

					<br />
					<div className="text-center mb-10">
						<button className="btn btn-accent btn-md lg:btn-lg">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
