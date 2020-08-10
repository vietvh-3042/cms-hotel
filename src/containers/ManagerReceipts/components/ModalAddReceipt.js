import { DatePicker, Modal, Select } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import TextAreaField from "helpers/CustomFields/TextAreaField";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const { Option } = Select;

const date = new Date();
const time = date.getTime();
const format = "HH:mm";

ModalAddReceipt.propTypes = {
	handleAddReceipt: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

ModalAddReceipt.defaultProps = {
	handleAddReceipt: null,
	handleSetStatus: null,
};

function ModalAddReceipt(props) {
	const { visible, handleAddReceipt, handleSetStatus } = props;

	const [listPaymentMethod, setListPaymentMethod] = useState([]);

	const [listCustomer, setListCustomer] = useState([]);

	const [listEmployee, setListEmployee] = useState([]);

	const [listBill, setListBill] = useState([]);

	useEffect(() => {
		async function getListPaymentMethod() {
			CommonApi(
				"GET",
				"/tenant/payslip-receipt/payment-method",
				null
			).then((res) => setListPaymentMethod(res.data.data));
		}
		async function getListCustomer() {
			CommonApi("GET", `/tenant/customer-manager/customer`, null).then((res) =>
				setListCustomer(res.data.data)
			);
		}
		async function getListEmployee() {
			CommonApi("GET", "/tenant/acl/employees", null).then((res) =>
				setListEmployee(res.data.data)
			);
		}
		async function getListBill() {
			CommonApi(
				"GET",
				"/tenant/checkin-manager/bill?include=checkIn.typeCheckIn,employee,paymentMethod",
				null
			).then((res) => setListBill(res.data.data));
		}
		getListPaymentMethod();
		getListCustomer();
		getListEmployee();
		getListBill();
	}, []);

	const initialValues = {
		content: "",
		amount: "",
		payment_method_id:
			listPaymentMethod.length > 0 ? listPaymentMethod[0].id : "",
		guest_id: listCustomer.length > 0 ? listCustomer[0].id : "",
		employee_id: listEmployee.length > 0 ? listEmployee[0].id : "",
		bill_id: listBill.length > 0 ? listBill[0].id : "",
		note: "",
		time: moment(time).format(format),
		date: moment(date).format("DD/MM/YYYY"),
	};

	const validationSchema = Yup.object().shape({
		content: Yup.string().required("Không được để trống."),
		amount: Yup.number().typeError("Phải là số").required("Không được để trống."),
		payment_method_id: Yup.string().required("Không được để trống."),
		guest_id: Yup.string().required("Không được để trống."),
		employee_id: Yup.string().required("Không được để trống."),
		bill_id: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data, { resetForm }) {
		const find = listEmployee.find((x) => x.id === data.employee_id);
		let body = {
			...data,
			guest_name: find ? find.name : "",
		};
		CommonApi("POST", "/tenant/payslip-receipt/receipt", body)
			.then((res) => {
				toast.success("Tạo mới thành công");
				handleAddReceipt();
				resetForm({});
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
			onCancel={handleAddReceipt}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={390}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm phiếu thu</span>
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
									name="content"
									component={InputField}
									label="Tên phiếu thu:"
									width={200}
								/>
								<FastField
									name="amount"
									component={InputField}
									label="Số tiền:"
									width={200}
								/>

								<div className="flex mb-2 items-center">
									<div className="LabelCo">Phương thức thanh toán:</div>
									<Select
										name="payment_method_id"
										showSearch
										value={values.payment_method_id}
										filterOption={(input, option) =>
											option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}
										style={{ width: 206, height: 30 }}
										onChange={(newValue) => setFieldValue("payment_method_id", newValue)}
									>
										{listPaymentMethod.map((value) => (
											<Option value={value.id} key={value.id}>
												{value.name}
											</Option>
										))}
									</Select>
								</div>

								<div className="flex mb-2 items-center">
									<div className="LabelCo">Khách hàng:</div>
									<Select
										name="guest_id"
										showSearch
										value={values.guest_id}
										filterOption={(input, option) =>
											option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}
										style={{ width: 206, height: 30 }}
										onChange={(newValue) => setFieldValue("guest_id", newValue)}
									>
										{listCustomer.map((value) => (
											<Option value={value.id} key={value.id}>
												{value.name}
											</Option>
										))}
									</Select>
								</div>

								<div className="flex mb-2 items-center">
									<div className="LabelCo">Nhân viên:</div>
									<Select
										name="employee_id"
										showSearch
										value={values.employee_id}
										filterOption={(input, option) =>
											option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}
										style={{ width: 206, height: 30 }}
										onChange={(newValue) => setFieldValue("employee_id", newValue)}
									>
										{listEmployee.map((value) => (
											<Option value={value.id} key={value.id}>
												{value.name}
											</Option>
										))}
									</Select>
								</div>

								<div className="flex mb-2 items-center">
									<div className="LabelCo">Hóa đơn:</div>
									<Select
										name="bill_id"
										showSearch
										value={values.bill_id}
										filterOption={(input, option) =>
											option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}
										style={{ width: 206, height: 30 }}
										onChange={(newValue) => setFieldValue("bill_id", newValue)}
									>
										{listBill.map((value) => (
											<Option value={value.id} key={value.id}>
												{value.bill_code}
											</Option>
										))}
									</Select>
								</div>

								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ngày tạo:</div>
									<DatePicker
										name="date"
										defaultValue={moment(date)}
										format="DD/MM/YYYY"
										style={{ width: 206 }}
										onChange={(date, dateString) => setFieldValue("date", dateString)}
									/>
								</div>

								<FastField
									name="note"
									component={TextAreaField}
									label="Ghi chú:"
									width={206}
								/>

								<FooterForm handleClick={handleAddReceipt} />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleAddReceipt}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddReceipt;
