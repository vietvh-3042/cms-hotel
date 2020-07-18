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
					<div className="md:flex items-center justify-between">
						<div
							className="w-full md:w-1/2 mr-auto"
							style={{ textShadow: "0 20px 50px hsla(0,0%,0%,8)" }}
						>
							<h1 className="text-4xl font-bold text-white tracking-wide">
								Brand
							</h1>
							<h2 className=" text-2xl font-bold text-white tracking-wide">
								Welcome <span className="text-gray-800"> Aboard</span>
							</h2>
							<p className="text-gray-300">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
							</p>
							<span className="text-white">
								Create New Account?
								<a href="#" className="text-gray-900 text-lg ml-2 font-bold">
									Sign Up
								</a>
							</span>
						</div>
						{status ? <Login /> : <Register />}
					</div>
				</div>
			</div>
		</header>
	);
}

export default Signin;
