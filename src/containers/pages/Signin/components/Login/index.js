import { login } from "@Actions/auth";
import { FastField, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FieldInput from "@Src/helpers/CustomFields/FieldInputBootstrap";

Login.propTypes = {};

function Login(props) {
	const dispatch = useDispatch();
	let history = useHistory();

	const initialValues = {
		userName: "",
		password: "",
	};
	const validationSchema = Yup.object().shape({
		userName: Yup.string().required("Không được để trống"),
		password: Yup.string().required("Không được để trống"),
	});

	function handleSubmit(data) {
		console.log(data);
		dispatch(login());
		toast.success("Đăng nhập thành công");
		history.push("/");
	}
	return (
		<div className="w-full md:max-w-md mt-6">
			<div className="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 ">
				<div className="flex items-center justify-center">
					<h2 className="text-2xl font-bold tracking-wide">Đăng Nhập</h2>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{() => (
						<Form>
							<FastField
								name="userName"
								component={FieldInput}
								label="Tên Đăng Nhập"
								placeholder="User Name"
							/>

							<FastField
								name="password"
								component={FieldInput}
								label="Mật Khẩu"
								placeholder="Password"
								type="password"
							/>

							<div className="flex items-center justify-between">
								<a href="#" className="text-gray-600">
									Forget Password?
								</a>
								<button
									type="submit"
									className="bg-gray-800 text-gray-200  px-2 py-1 rounded"
								>
									Đăng Nhập
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default Login;
