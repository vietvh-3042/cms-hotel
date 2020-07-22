import Axios from "axios";
import { FastField, Form, Formik } from "formik";
import FieldInput from "helpers/CustomFields/FieldInputBootstrap";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { setAuthState, saveLoggedUser } from "redux/actions/auth";
import { endpoint } from "settings";
import Cookies from "universal-cookie";
import * as Yup from "yup";

const cookies = new Cookies();

Login.propTypes = {};

function Login(props) {
	const dispatch = useDispatch();
	let history = useHistory();

	const initialValues = {
		user_name: "",
		password: "",
	};
	const validationSchema = Yup.object().shape({
		user_name: Yup.string().required("Không được để trống"),

		password: Yup.string().required("Không được để trống"),
	});

	function handleSubmit(data) {
		Axios({
			method: "POST",
			url: endpoint + "/tenant-auth/login",
			data: data,
			headers: {
				"tenant-name": data.user_name,
			},
		})
			.then((res) => {
				dispatch(setAuthState(true));
				dispatch(saveLoggedUser(res.data));
				toast.success("Đăng nhập thành công");
				history.push("/dashboard");
			})
			.catch((err) => {
				if (err.response.data.message) toast.error(err.response.data.message);
				else {
					let error = [];
					for (let value of Object.values(err.response.data.errors)) {
						error.push(value);
					}
					toast.error(
						<React.Fragment>
							{error.map((value, key) => (
								<div key={key}>{value}</div>
							))}
						</React.Fragment>
					);
				}
			});
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
								name="user_name"
								component={FieldInput}
								label="Tên Tài Khoản"
								placeholder="Tên Tài Khoản"
							/>

							<FastField
								name="password"
								component={FieldInput}
								label="Mật Khẩu"
								placeholder="Mật Khẩu"
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
