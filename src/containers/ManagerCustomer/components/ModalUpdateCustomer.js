import { DatePicker, Modal, Select } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const { Option } = Select;

ModalAddEmployee.propTypes = {
	handleAddListEmployee: PropTypes.func,
	handleSetStatus: PropTypes.func,
	listGroup: PropTypes.array,
};

ModalAddEmployee.defaultProps = {
	handleUpdateEmployee: null,
	handleSetStatus: null,
};

function ModalAddEmployee(props) {
	const { visibleUpdate, handleUpdateEmployee, handleSetStatus } = props;

	const [listNational, setListNational] = useState([]);

	useEffect(() => {
		async function getNational() {
			CommonApi("GET", "/tenant/nation-manager/nations", null).then((res) =>
				setListNational(res.data.data)
			);
		}
		getNational();
	}, []);

	const initialValues = visibleUpdate.detail;

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
		identity_code: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
	});

	function handleSubmit(data) {
		const id = visibleUpdate.detail.id;
		CommonApi("PUT", `/tenant/customer-manager/customer/${id}`, data)
			.then((res) => {
				toast.success("Cập nhật thành công");
				handleUpdateEmployee({});
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
			onCancel={() => handleUpdateEmployee({})}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={390}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Sửa nhân viên</span>
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

								<div className="flex mb-1 items-center">
									<div className="LabelCo">Quốc tịch:</div>
									<Select
										name="nation_id"
										showSearch
										value={values.nation_id}
										filterOption={(input, option) =>
											option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}
										style={{ width: 206, height: 30 }}
										onChange={(newValue) => setFieldValue("nation_id", newValue)}
									>
										{listNational.map((value) => (
											<Option value={value.id} key={value.id}>
												{value.name}
											</Option>
										))}
									</Select>
								</div>

								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ngày cấp:</div>
									<DatePicker
										name="identity_date"
										value={
											values && values.identity_date
												? moment(values.identity_date, "DD/MM/YYYY")
												: ""
										}
										format="DD/MM/YYYY"
										style={{ width: 206 }}
										onChange={(date, dateString) =>
											setFieldValue("identity_date", dateString)
										}
									/>
								</div>
								<FooterForm
									handleClick={() => handleUpdateEmployee({})}
									title="Cập nhật"
								/>
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={() => handleUpdateEmployee({})}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddEmployee;
