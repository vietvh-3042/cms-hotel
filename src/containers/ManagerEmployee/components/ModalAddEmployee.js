import { DatePicker, Modal, Switch } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

ModalAddEmployee.propTypes = {
	handleAddListEmployee: PropTypes.func,
	handleSetStatus: PropTypes.func,
	listGroup: PropTypes.array,
};

ModalAddEmployee.defaultProps = {
	handleAddListEmployee: null,
	handleSetStatus: null,
	listGroup: [],
};

function ModalAddEmployee(props) {
	const { visible, handleAddListEmployee, handleSetStatus, listGroup } = props;

	const initialValues = {
		name: "",
		password: "",
		identity_date: "",
		identity_code: "",
		birthday: "",
		address: "",
		gender: true,
		work_date_at: "",
		group_id: listGroup.length > 0 ? `${listGroup[0].id}` : "",
		email: "",
		user_name: "",
		phone: "",
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
		user_name: Yup.string().required("Không được để trống."),
		password: Yup.string().required("Không được để trống."),
		phone: Yup.number().typeError("Phải là số").required("Không được để trống."),
		email: Yup.string()
			.email("Email không đúng định dạng")
			.required("Không được để trống."),
		identity_code: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
	});

	function handleSubmit(data, { resetForm }) {
		CommonApi("POST", "/tenant/acl/employees", {
			...data,
			gender: data.gender ? 1 : 2,
		})
			.then((res) => {
				toast.success("Tạo mới thành công");
				resetForm({});
				handleAddListEmployee();
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
			visible={visible}
			onCancel={handleAddListEmployee}
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
									<Switch
										defaultChecked={values.gender ? true : false}
										checkedChildren="Nam"
										unCheckedChildren="Nữ"
										onChange={(checked) => setFieldValue("gender", checked)}
									/>
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
									<div className="LabelCo">Phân quyền:</div>
									<Field as="select" name="group_id" style={{ width: 206, height: 30 }}>
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
										onChange={(date, dateString) => setFieldValue("birthday", dateString)}
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
								<FooterForm handleClick={handleAddListEmployee} />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleAddListEmployee}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddEmployee;
