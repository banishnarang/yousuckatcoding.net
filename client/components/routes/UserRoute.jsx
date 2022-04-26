import { useEffect, useState, useContext } from "react";
import { Context } from "../../context";
import axios from "axios";
import { useRouter } from "next/router";

const UserRoute = ({ children }) => {
	const router = useRouter();

	// access
	const [hasAccess, setHasAccess] = useState(false);

	const {
		state: { user },
		dispatch,
	} = useContext(Context);

	useEffect(() => {
		fetchUser();
	}, [user]);

	const fetchUser = async () => {
		try {
			const { data } = await axios.get("/api/current-user");

			if (data.user) setHasAccess(true);
		} catch (error) {
			console.log(error);
			setHasAccess(false);

			// redirect to home page
			router.push("/");
		}
	};

	return hasAccess && children;
};

export default UserRoute;
