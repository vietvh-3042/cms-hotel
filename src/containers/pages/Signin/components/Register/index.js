import { FastField, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import FieldInput from "@Src/helpers/CustomFields/FieldInputBootstrap";

Register.propTypes = {};

function Register(props) {
	const dispatch = useDispatch();

	const initialValues = {
		email: "",
		userName: "",
	};
	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.email("Email không đúng định dạng")

			.required("Không được để trống"),
		userName: Yup.string().required("Không được để trống"),
	});

	function handleSubmit(data) {
		console.log(data);
		toast.success("Đăng kí thành công");
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
								placeholder="Email Address"
							/>

							<FastField
								name="userName"
								component={FieldInput}
								label="User Name"
								placeholder="User Name"
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
