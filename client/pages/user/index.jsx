import { useContext } from "react";
import { Context } from "../../context";

// routes
import UserRoute from "../../components/routes/UserRoute";

const UserIndex = () => {
	const {
		state: { user },
	} = useContext(Context);

	return (
		<UserRoute>
			<div className="flex flex-col items-center justify-center h-screen">
				<h1 className="text-4xl text-center">Welcome, {user?.name}!</h1>
			</div>
		</UserRoute>
	);
};

export default UserIndex;
