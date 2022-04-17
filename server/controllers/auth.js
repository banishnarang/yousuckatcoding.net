export const register = (req, res) => {
	console.log(req.body);
	res.json({
		message: "Server register endpoint",
	});
};
