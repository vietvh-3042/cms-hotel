import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { FastField, Form, Formik, Field } from "formik";
import { Modal, DatePicker } from "antd";
import Axios from "axios";
import InputField from "helpers/CustomFields/InputField";
import { toast } from "react-toastify";
import { API_Timeout, endpoint } from "settings";

ModalAddEmployee.propTypes = {
	handleAddListEmployee: PropTypes.func,
	handleSetStatus: PropTypes.func,
	listGroup: PropTypes.array,
};

ModalAddEmployee.defaultProps = {
	handleUpdateEmployee: null,
	handleSetStatus: null,
	listGroup: [],
};

function ModalAddEmployee(props) {
	const {
		visibleUpdate,
		handleUpdateEmployee,
		handleSetStatus,
		listGroup,
	} = props;
	const user = useSelector((state) => state.Auth.user);

	const initialValues = visibleUpdate.detail;

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
		user_name: Yup.string().required("Không được để trống."),
		password: Yup.string().required("Không được để trống."),
		phone: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
		email: Yup.string()
			.email("Email không đúng định dạng")
			.required("Không được để trống."),
		identity_code: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
	});

	function handleSubmit(data) {
		const id = visibleUpdate.detail.id;
		Axios({
			method: "PUT",
			url: endpoint + "/tenant/acl/employees/" + id,
			data: data,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
			},
		})
			.then((res) => {
				toast.success("Cập nhật thành công");
				handleUpdateEmployee();
				handleSetStatus();
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
		<Modal
			visible={visibleUpdate.visible}
			onCancel={handleUpdateEmployee}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={390}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm nhân viên</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						enableReinitialize
					>
						{({ values, setFieldValue }) => (
							<Form>
								<FastField
									name="name"
									component={InputField}
									label="Tên:"
									width={200}
								/>

								<div className="flex mb-2 items-center">
									<div className="LabelCo">Giới tính:</div>
									<div style={{ width: 200 }} className="flex items-center">
										<label className="mb-0 mr-3">
											<Field
												type="radio"
												name="gender"
												value={1}
												className="mr-1"
											/>
											<span>Nam</span>
										</label>
										<label className="mb-0">
											<Field
												type="radio"
												name="gender"
												value={2}
												className="mr-1"
											/>
											<span>Nữ</span>
										</label>
									</div>
								</div>

								<FastField
									name="user_name"
									component={InputField}
									label="Tên tài khoản:"
									width={200}
								/>
								<FastField
									name="password"
									component={InputField}
									label="Mật khẩu:"
									type="password"
									width={200}
								/>
								<FastField
									name="phone"
									component={InputField}
									label="Số điện thoại:"
									width={200}
								/>
								<FastField
									name="email"
									component={InputField}
									label="Email:"
									width={200}
								/>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Nhóm quyền:</div>
									<Field
										as="select"
										name="group_id"
										style={{ width: 206, height: 30 }}
									>
										{listGroup.map((value) => (
											<option value={value.id} key={value.id}>
												{value.name}
											</option>
										))}
									</Field>
								</div>
								<FastField
									name="identity_code"
									component={InputField}
									label="CMND:"
									width={200}
								/>
								<FastField
									name="address"
									component={InputField}
									label="Địa chỉ:"
									width={200}
								/>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ngày cấp:</div>
									<DatePicker
										name="identity_date"
										format="DD/MM/YYYY"
										style={{ width: 206 }}
										onChange={(date, dateString) =>
											setFieldValue("identity_date", dateString)
										}
									/>
								</div>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ngày sinh:</div>
									<DatePicker
										name="birthday"
										format="DD/MM/YYYY"
										style={{ width: 206 }}
										onChange={(date, dateString) =>
											setFieldValue("birthday", dateString)
										}
									/>
								</div>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ngày làm việc:</div>
									<DatePicker
										name="work_date_at"
										format="DD/MM/YYYY"
										style={{ width: 206 }}
										onChange={(date, dateString) =>
											setFieldValue("work_date_at", dateString)
										}
									/>
								</div>
								<div
									className="flex items-center justify-end"
									style={{ marginRight: 45 }}
								>
									<button
										type="button"
										className="submit_cancel_Building focus:outline-none"
										onClick={handleUpdateEmployee}
									>
										Cancel
									</button>
									<button
										type="submit"
										className="dashboardButton focus:outline-none"
									>
										Thêm
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
					onClick={handleUpdateEmployee}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddEmployee;
