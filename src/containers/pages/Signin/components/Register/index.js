import Axios from "axios";
import { FastField, Form, Formik } from "formik";
import FieldInput from "helpers/CustomFields/FieldInputBootstrap";
import React from "react";
import { toast } from "react-toastify";
import { endpoint } from "settings";
import * as Yup from "yup";

Register.propTypes = {};

function Register(props) {
	const initialValues = {
		email: "",
		user_name: "",
		phone: "",
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Email không đúng định dạng")
			.required("Không được để trống"),
		user_name: Yup.string().required("Không được để trống"),
		phone: Yup.number().typeError("Phải là số").required("Không được để trống"),
	});

	function handleSubmit(data) {
		Axios({
			method: "POST",
			url: endpoint + "/client-auth/register",
			data: data,
		})
			.then((res) => {
				toast.success(
					"Đăng kí thành công. Vui lòng kiểm tra email để lấy thông tin đăng nhập"
				);
			})
			.catch((err) => {
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
			});
	}

	return (
		<div className="w-full md:max-w-md mt-6">
			<div className="card bg-white shadow-md rounded-lg px-4 py-4 mb-6 ">
				<div className="flex items-center justify-center">
					<h2 className="text-2xl font-bold tracking-wide">Đăng Ký</h2>
				</div>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{() => (
						<Form>
							<FastField
								name="email"
								component={FieldInput}
								label="Email"
								placeholder="Email"
							/>

							<FastField
								name="user_name"
								component={FieldInput}
								label="Tên Tài Khoản"
								placeholder="Tên Tài Khoản"
							/>

							<FastField
								name="phone"
								component={FieldInput}
								label="Số Điện Thoại"
								placeholder="Số Điện Thoại"
							/>

							<div className="flex items-center justify-between">
								<a href="#" className="text-gray-600">
									Forget Password?
								</a>
								<button
									type="submit"
									className="bg-gray-800 text-gray-200  px-2 py-1 rounded"
								>
									Đăng Ký
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
}

export default Register;
