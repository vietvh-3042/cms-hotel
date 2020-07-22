import React, { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

Signin.propTypes = {};

function Signin(props) {
	const [status, setStatus] = useState(true);
	return (
		<header className=" bg-cover border-t-2 border-blue-600 h-screen bg-signin">
			<div className="content px-8 py-2">
				<nav className="flex items-center justify-between">
					<h2 className="text-gray-200 font-bold text-2xl ">Home</h2>
					<div className="auth flex items-center">
						<button
							className="bg-transparent text-gray-200  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700"
							onClick={() => setStatus(true)}
						>
							Sign in
						</button>
						<button
							className="bg-gray-900 text-gray-200  py-2 px-3 rounded  hover:bg-gray-800 hover:text-gray-100"
							onClick={() => setStatus(false)}
						>
							Sign up for free
						</button>
					</div>
				</nav>
				<div className="body mt-20 mx-8">
					<div className="md:flex items-center justify-center">
						{status ? <Login /> : <Register />}
					</div>
				</div>
			</div>
		</header>
	);
}

export default Signin;
