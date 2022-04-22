import { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Context } from "../context";
import { toast } from "react-toastify";
import axios from "axios";

import { LoginIcon, UserAddIcon } from "@heroicons/react/outline";

const Header = () => {
	const router = useRouter();
	const {
		state: { user },
		dispatch,
	} = useContext(Context);

	const handleLogout = async (e) => {
		e.preventDefault();

		try {
			const {
				data: { message },
			} = await axios.get(`/api/logout`);

			toast.success(message);

			// remove user from global state
			dispatch({ type: "CLEAR_USER" });

			// remove user from local storage
			localStorage.removeItem("user");

			// redirect to login page
			router.push("/login");
		} catch (error) {
			toast.error(error?.response?.data?.message);
		}
	};

	return (
		<div className="navbar bg-gradient-to-r from-secondary hover:from-primary to-primary hover:to-secondary">
			<div className="flex-1">
				<Link href="/">
					<pre className="btn btn-ghost normal-case text-xl">
						You<span className="text-accent">Suck</span>At
						<span className="text-accent">Coding</span>
					</pre>
				</Link>
			</div>
			<div className="flex-none">
				{!user ? (
					<ul className="menu menu-horizontal p-0">
						<li>
							<Link href="/register">
								<a>
									<UserAddIcon className="w-6 h-6" />
									Register
								</a>
							</Link>
						</li>
						<li>
							<Link href="/login">
								<a>
									<LoginIcon className="w-6 h-6" />
									Login
								</a>
							</Link>
						</li>
					</ul>
				) : (
					<div className="dropdown dropdown-end mr-2">
						<label
							tabindex="0"
							className="btn btn-ghost btn-circle avatar mt-1 bg-neutral-content"
						>
							<div className="w-14 rounded-full">
								<img
									src={`https://avatars.dicebear.com/api/open-peeps/:${user.id}.svg`}
								/>
							</div>
						</label>
						<ul
							tabindex="0"
							className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
						>
							<li>
								<a>Profile</a>
							</li>
							<li>
								<a>Settings</a>
							</li>
							<li onClick={handleLogout}>
								<a>Logout</a>
							</li>
						</ul>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
