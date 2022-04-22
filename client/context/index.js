import { useReducer, createContext, useEffect } from "react";

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

    // dispatch user to state on component mount from localStorage
	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) {
			dispatch({ type: "SET_USER", payload: JSON.parse(user) });
		}
	}, []);

	return (
		<Context.Provider value={{ state, dispatch }}>
			{children}
		</Context.Provider>
	);
};

export { Context, Provider };
