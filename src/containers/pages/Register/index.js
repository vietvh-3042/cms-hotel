import React from "react";

Register.propTypes = {};

function Register(props) {
  return (
    <div class="w-full md:max-w-md mt-6">
      <div class="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 ">
        <form action="#">
          <div class="flex items-center justify-center">
            <h2 class="text-2xl font-bold tracking-wide">Welcome back</h2>
          </div>
          <h2 class="text-xl text-center font-semibold text-gray-800 mb-2">
            Sign Up
          </h2>
          <input
            type="text"
            class="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-6 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
            placeholder="Email Address"
          />
          <input
            type="text"
            class="rounded px-4 w-full py-1 bg-gray-200  border border-gray-400 mb-4 text-gray-700 placeholder-gray-700 focus:bg-white focus:outline-none"
            placeholder="User Name"
          />
          <div class="flex items-center justify-between">
            <a href="#" class="text-gray-600">
              Forget Password?
            </a>
            <button class="bg-gray-800 text-gray-200  px-2 py-1 rounded">
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
