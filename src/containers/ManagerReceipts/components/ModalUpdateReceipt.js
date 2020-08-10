import { Modal, Select, DatePicker } from "antd";
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

ModalUpdateReceipt.propTypes = {
	handleUpdateReceipt: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

ModalUpdateReceipt.defaultProps = {
	handleUpdateReceipt: null,
	handleSetStatus: null,
};

function ModalUpdateReceipt(props) {
	const { visibleUpdate, handleUpdateReceipt, handleSetStatus } = props;

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

	function findID(value) {
		if (value) {
			if (value.bills) {
				if (value.bills.data.length > 0) {
					return value.bills.data[0].bill_code;
				}
			}
		} else return "";
	}

	const initialValues = {
		...visibleUpdate.detail,
		bill_id: findID(visibleUpdate.detail),
		note: visibleUpdate.detail
			? visibleUpdate.detail.note === null || ""
				? ""
				: visibleUpdate.detail.note
			: "",
	};

	const validationSchema = Yup.object().shape({
		content: Yup.string().required("Không được để trống."),
		amount: Yup.number().typeError("Phải là số").required("Không được để trống."),
		payment_method_id: Yup.string().required("Không được để trống."),
		guest_id: Yup.string().required("Không được để trống."),
		employee_id: Yup.string().required("Không được để trống."),
		bill_id: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		const id = visibleUpdate.detail.id;
		let body = {
			amount: data.amount,
			bill_id: data.bill_id,
			content: data.content,
			date_created: data.date_created,
			employee_id: data.employee_id,
			guest_id: data.guest_id,
			note: data.note,
			payment_method_id: data.payment_method_id,
		};
		CommonApi("PUT", `/tenant/payslip-receipt/receipt/${id}`, body)
			.then((res) => {
				toast.success("Cập nhật thành công");
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
			visible={visibleUpdate.visible}
			onCancel={() => handleUpdateReceipt({})}
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
						enableReinitialize
					>
						{({ values, setFieldValue }) => {
							return (
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
										<div className="LabelCo">Ngày làm việc:</div>
										<DatePicker
											name="date_created"
											format="DD/MM/YYYY"
											value={
												values && values.date_created
													? moment(values.date_created, "DD/MM/YYYY")
													: ""
											}
											style={{ width: 206 }}
											onChange={(date, dateString) =>
												setFieldValue("date_created", dateString)
											}
										/>
									</div>

									<FastField
										name="note"
										component={TextAreaField}
										label="Ghi chú:"
										width={206}
									/>

									<FooterForm handleClick={() => handleUpdateReceipt({})} />
								</Form>
							);
						}}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={() => handleUpdateReceipt({})}
				/>
			</div>
		</Modal>
	);
}

export default ModalUpdateReceipt;
