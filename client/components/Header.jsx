import Link from "next/link";
import { LoginIcon, UserAddIcon } from "@heroicons/react/outline";

const Header = () => {
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
				<ul class="menu menu-horizontal p-0">
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
				<div className="dropdown dropdown-end">
					<label
						tabindex="0"
						className="btn btn-ghost btn-circle avatar"
					>
						<div className="w-10 rounded-full">
							<img src="https://api.lorem.space/image/face?hash=33791" />
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
						<li>
							<a>Logout</a>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Header;
