import "../styles/globals.css";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<ToastContainer draggable theme="dark" />
			<Header />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
