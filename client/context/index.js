import { useReducer, createContext, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

// initial state
const initialState = {
	user: null,
};

// create context
const Context = createContext();

// root reducer
const rootReducer = (state, action) => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.payload,
			};
		case "CLEAR_USER":
			return {
				...state,
				user: null,
			};
		default:
			return state;
	}
};

// context provider
const Provider = ({ children }) => {
	const [state, dispatch] = useReducer(rootReducer, initialState);

	// router
	const router = useRouter();

	// dispatch user to state on component mount from localStorage
	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			dispatch({ type: "SET_USER", payload: JSON.parse(user) });
		}
	}, []);

	axios.interceptors.response.use(
		(response) => {
			// when request is successful (status code 2XX), return response
			return response;
		},
		(error) => {
			// when request is unsuccessful (status code 4XX)
			const response = error.response;
			if (
				response.status === 401 &&
				response.config &&
				!response.config.__isRetryRequest
			) {
				return new Promise((resolve, reject) => {
					// log user out
					axios
						.get("/api/logout")
						.then((data) => {
							console.log("/401 error -> logout");

							// clear user
							dispatch({ type: "CLEAR_USER" });
							localStorage.removeItem("user");

							// redirect to login page
							router.push("/login");
						})
						.catch((error) => {
							console.log("Axios interceptor error: ", error);
							reject(error);
						});
				});
			}

			// return error
			return Promise.reject(error);
		}
	);

	// csfr token for axios requests
	useEffect(() => {
		const getCsrfToken = async () => {
			const { data } = await axios.get("/api/csrf");

			// set axios headers with csrf token
			axios.defaults.headers.common["X-CSRF-TOKEN"] = data.csrfToken;
		};

		getCsrfToken();
	}, []);

	return (
		<Context.Provider value={{ state, dispatch }}>
			{children}
		</Context.Provider>
	);
};

export { Context, Provider };
