import React from "react";
import { login } from "@Actions/auth";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

Login.propTypes = {};

function Login(props) {
	const dispatch = useDispatch();
	let history = useHistory();

	function handleSubmid(e) {
		e.preventDefault();
		dispatch(login());
		history.push("/");
	}
	return (
		<div className="w-full md:max-w-md mt-6">
			<div className="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 ">
				<form onSubmit={handleSubmid}>
					<div className="flex items-center justify-center">
						<h2 className="text-2xl font-bold tracking-wide">Welcome back</h2>
					</div>
					<h2 className="text-xl text-center font-semibold text-gray-800 mb-2">
						Sign In
					</h2>
					<input
						type="text"
						className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
						placeholder="User Name"
					/>
					<input
						type="password"
						className="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
						placeholder="Password"
					/>
					<div className="flex items-center justify-between">
						<a href="#" className="text-gray-600">
							Forget Password?
						</a>
						<button className="bg-gray-800 text-gray-200  px-2 py-1 rounded">
							Sign In
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default Login;
