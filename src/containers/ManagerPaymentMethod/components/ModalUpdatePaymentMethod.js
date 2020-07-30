import React from "react";
import PropTypes from "prop-types";
import { FastField, Form, Formik, Field } from "formik";
import { Modal, Switch } from "antd";
import Axios from "axios";
import InputField from "helpers/CustomFields/InputField";
import { toast } from "react-toastify";
import { API_Timeout, endpoint } from "settings";
import * as Yup from "yup";
import { useSelector } from "react-redux";

ModalUpdatePaymentMethod.propTypes = {
	handleUpdateType: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

ModalUpdatePaymentMethod.defaultProps = {
	handleUpdateType: null,
	handleSetStatus: null,
};

function ModalUpdatePaymentMethod(props) {
	const { visibleUpdateType, handleUpdateType, handleSetStatus } = props;
	const user = useSelector((state) => state.Auth.user);

	const initialValues = {
		...visibleUpdateType.detail,
		status: visibleUpdateType.detail.status === 1 ? true : false,
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		console.log(data);
		const id = visibleUpdateType.detail.id;
		Axios({
			method: "PUT",
			url: endpoint + "/tenant/payslip-receipt/payment-method/" + id,
			data: {
				name: data.name,
				status: data.status ? 1 : 2,
			},
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
			},
		})
			.then((res) => {
				toast.success("Thêm mới thành công");
				handleUpdateType();
				handleSetStatus();
			})
			.catch((err) => {
				console.log(err.response);
				// let error = [];
				// for (let value of Object.values(err.response.data.errors)) {
				// 	error.push(value);
				// }
				// toast.error(
				// 	<React.Fragment>
				// 		{error.map((value, key) => (
				// 			<div key={key}>{value}</div>
				// 		))}
				// 	</React.Fragment>
				// );
			});
	}

	return (
		<Modal
			visible={visibleUpdateType.visible}
			onCancel={handleUpdateType}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={350}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Chỉnh sửa phương thức thanh toán</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						enableReinitialize
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ values, setFieldValue }) => (
							<Form>
								<FastField
									name="name"
									component={InputField}
									label="Tên loại:"
									width={160}
								/>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Status:</div>
									<Switch
										defaultChecked={values.status ? true : false}
										checkedChildren="Active"
										unCheckedChildren="UnActive"
										onChange={(checked) => setFieldValue("status", checked)}
									/>
								</div>

								<div
									className="flex items-center justify-end"
									style={{ marginRight: 45 }}
								>
									<button
										type="button"
										className="submit_cancel_Building focus:outline-none"
										onClick={handleUpdateType}
									>
										Cancel
									</button>
									<button
										type="submit"
										className="dashboardButton focus:outline-none"
									>
										Sửa
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleUpdateType}
				/>
			</div>
		</Modal>
	);
}

export default ModalUpdatePaymentMethod;
