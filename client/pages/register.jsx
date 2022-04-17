import { useState } from "react";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = () => {
		//
	};

	return (
		<div className="flex flex-col">
			{/* Jumbotron */}
			<div className="hero h-52">
				<div className="hero-overlay bg-opacity-60 bg-gradient-to-r from-secondary hover:from-primary to-primary hover:to-secondary"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1 className="text-5xl font-bold">Register</h1>
					</div>
				</div>
			</div>

			{/* Form */}
			<div className="container my-8 mx-auto">
				<form onSubmit={handleSubmit}>
					<div className="form-control w-full mb-5 mx-auto max-w-xs md:max-w-md">
						<label className="label">
							<span className="label-text">Name</span>
						</label>
						<input
							type="text"
							placeholder="John Doe"
							className="input input-bordered w-full max-w-xs md:max-w-md"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
						/>
					</div>

					<div className="form-control w-full mb-5 mx-auto max-w-xs md:max-w-md">
						<label className="label">
							<span className="label-text">Email</span>
						</label>
						<input
							type="text"
							placeholder="john@yousuckatcoding.net"
							className="input input-bordered w-full max-w-xs md:max-w-md"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
						/>
					</div>

					<div className="form-control w-full mb-5 mx-auto max-w-xs md:max-w-md">
						<label className="label">
							<span className="label-text">Password</span>
						</label>
						<input
							type="password"
							placeholder="**********"
							className="input input-bordered w-full max-w-xs md:max-w-md"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
					</div>

					<div className="form-control w-full mb-5 mx-auto max-w-xs md:max-w-md">
						<label className="label">
							<span className="label-text">Confirm Password</span>
						</label>
						<input
							type="password"
							placeholder="**********"
							className="input input-bordered w-full max-w-xs md:max-w-md"
							value={passwordConfirm}
							onChange={(e) => setPasswordConfirm(e.target.value)}
							required
						/>
					</div>

					<br />
					<div className="text-center">
						<button className="btn btn-primary btn-md lg:btn-lg">
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Register;
