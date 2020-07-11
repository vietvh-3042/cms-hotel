import React, { useState } from "react";
import Login from "../Login";
import Register from "../Register";
import BgSigin from "@Src/image/sigin.jpg";

Signin.propTypes = {};

function Signin(props) {
	const [status, setStatus] = useState(true);
	return (
		<header
			class=" bg-cover border-t-2 border-blue-600 h-screen"
			style={{
				backgroundImage: `url(${BgSigin})`,
			}}
		>
			<div class="content px-8 py-2">
				<nav class="flex items-center justify-between">
					<h2 class="text-gray-200 font-bold text-2xl ">Home</h2>
					<div class="auth flex items-center">
						<button
							class="bg-transparent text-gray-200  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700"
							onClick={() => setStatus(true)}
						>
							Sign in
						</button>
						<button
							class="bg-gray-900 text-gray-200  py-2 px-3 rounded  hover:bg-gray-800 hover:text-gray-100"
							onClick={() => setStatus(false)}
						>
							Sign up for free
						</button>
					</div>
				</nav>
				<div class="body mt-20 mx-8">
					<div class="md:flex items-center justify-between">
						<div
							class="w-full md:w-1/2 mr-auto"
							style={{ textShadow: "0 20px 50px hsla(0,0%,0%,8)" }}
						>
							<h1 class="text-4xl font-bold text-white tracking-wide">Brand</h1>
							<h2 class=" text-2xl font-bold text-white tracking-wide">
								Welcome <span class="text-gray-800"> Aboard</span>
							</h2>
							<p class="text-gray-300">
								Lorem ipsum dolor sit amet consectetur adipisicing elit.
							</p>
							<span class="text-white">
								Create New Account?
								<a href="#" class="text-gray-900 text-lg ml-2 font-bold">
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
