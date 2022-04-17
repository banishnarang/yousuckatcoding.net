import React from "react";

const Index = () => {
	return (
		<div>
			<div
				className="hero min-h-screen"
				style={{
					backgroundImage: `url(
						"https://api.lorem.space/image/fashion?w=1000&h=800"
					)`,
				}}
			>
				<div className="hero-overlay bg-opacity-60"></div>
				<div className="hero-content text-center text-neutral-content">
					<div className="max-w-md">
						<h1 className="mb-5 text-5xl font-bold">Hello there</h1>
						<p className="mb-5">
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Quidem beatae illo asperiores ea mollitia
							autem ipsum aliquam ducimus! Quia, maxime!
						</p>
						<button className="btn btn-primary">Get Started</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Index;
