import "../styles/globals.css";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "../context";

function MyApp({ Component, pageProps }) {
	return (
		<Provider>
			<ToastContainer draggable theme="dark" />
			<Header />
			<Component {...pageProps} />
		</Provider>
	);
}

export default MyApp;
