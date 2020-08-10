import { DatePicker, Modal } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import moment from "moment";
import { toast } from "react-toastify";

const date = new Date();

ModalAddPayment.propTypes = {
	handleAddPayment: PropTypes.func,
};

ModalAddPayment.defaultProps = {
	handleAddPayment: null,
};

function ModalAddPayment(props) {
	const { visible, handleAddPayment } = props;

	const [listCategory, setListCategory] = useState([]);

	const [listPaymentMethod, setListPaymentMethod] = useState([]);

	const [listCustomer, setListCustomer] = useState([]);

	const [listEmployee, setListEmployee] = useState([]);

	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	useEffect(() => {
		async function getListCategory() {
			CommonApi("GET", "/tenant/category/category").then((res) => {
				setListCategory(res.data.data);
			});
		}

		async function getListPaymentMethod() {
			CommonApi("GET", "/tenant/payslip-receipt/payment-method").then((res) =>
				setListPaymentMethod(res.data.data)
			);
		}

		async function getListCustomer() {
			CommonApi("GET", "/tenant/customer-manager/customer").then((res) =>
				setListCustomer(res.data.data)
			);
		}

		async function getListEmployee() {
			CommonApi("GET", "/tenant/acl/employees").then((res) =>
				setListEmployee(res.data.data)
			);
		}

		getListCategory();
		getListPaymentMethod();
		getListCustomer();
		getListEmployee();
	}, [hotel_ID]);

	const initialValues = {
		date_receipt: moment(date).format("DD/MM/YYYY"),
		payment_method_id:
			listPaymentMethod.length > 0 ? listPaymentMethod[0].id : "",
		content: "",
		amount: "",
		category_id: listCategory.length > 0 ? listCategory[0].id : "",
		guest_id: listCustomer.length > 0 ? listCustomer[0].id : "",
		employee_id: listEmployee.length > 0 ? listEmployee[0].id : "",
		note: "",
		status: false,
	};
	const validationSchema = Yup.object().shape({
		payment_method_id: Yup.string().required("Không được để trống"),
		content: Yup.string().required("Không được để trống"),
		amount: Yup.number().typeError("Phải là số").required("Không được để trống."),
		category_id: Yup.string().required("Không được để trống"),
	});

	function handleSubmit(data) {
		var today = new Date();
		var dd = String(today.getDate()).padStart(2, "0");
		var mm = String(today.getMonth() + 1).padStart(2, "0");
		var yyyy = today.getFullYear();
		today = dd + "/" + mm + "/" + yyyy;
		CommonApi("POST", "/tenant/payslip-receipt/payslip", {
			...data,
			status: data.status ? 1 : 2,
			date_created: today,
		})
			.then((res) => {
				toast.success("Tạo mới thành công");
				handleAddPayment();
			})
			.catch((err) => console.log(err.response));
	}

	return (
		<Modal
			visible={visible}
			onCancel={handleAddPayment}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={390}
		>
			<div className="relative">
				<div className="modal_header_action flex items-center">
					<img
						src="/images/Common/costcaraddt32.png"
						alt="phieu thu"
						style={{ marginRight: 10 }}
					/>
					<span>Thêm phiếu chi phí</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ values, setFieldValue }) => (
							<Form>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ngày thu:</div>
									<DatePicker
										name="date_receipt"
										value={
											values && values.date_receipt
												? moment(values.date_receipt, "DD/MM/YYYY")
												: ""
										}
										format="DD/MM/YYYY"
										style={{ width: 206 }}
										onChange={(date, dateString) =>
											setFieldValue("date_receipt", dateString)
										}
									/>
								</div>

								<FastField
									name="content"
									component={InputField}
									label="Diễn giải chi phí:"
									width={200}
								/>
								<FastField
									name="amount"
									component={InputField}
									label="Số tiền:"
									width={200}
								/>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Loại chi phí:</div>
									<Field
										as="select"
										name="category_id"
										style={{ width: 206, height: 30 }}
									>
										{listCategory.map((value) => (
											<option value={value.id} key={value.id}>
												{value.name}
											</option>
										))}
									</Field>
								</div>

								<div className="flex mb-2 items-center">
									<div className="LabelCo">Chi tiết:</div>
									<Field
										as="select"
										name="payment_method_id"
										style={{ width: 206, height: 30 }}
									>
										{listPaymentMethod.map((value) => (
											<option value={value.id} key={value.id}>
												{value.name}
											</option>
										))}
									</Field>
								</div>

								<div className="flex mb-2 items-center">
									<div className="LabelCo">Người gửi:</div>
									<Field as="select" name="guest_id" style={{ width: 206, height: 30 }}>
										{listCustomer.map((value) => (
											<option value={value.id} key={value.id}>
												{value.name}
											</option>
										))}
									</Field>
								</div>

								<div className="flex mb-2 items-center">
									<div className="LabelCo">Người nhận:</div>
									<Field
										as="select"
										name="employee_id"
										style={{ width: 206, height: 30 }}
									>
										{listEmployee.map((value) => (
											<option value={value.id} key={value.id}>
												{value.name}
											</option>
										))}
									</Field>
								</div>

								<div className="flex mb-2 items-center">
									<div className="LabelCo">Trạng thái:</div>
									<Field type="checkbox" name="status" />
									<span>Đã thanh toán</span>
								</div>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ghi chú:</div>
									<Field as="textarea" name="note" rows="3" style={{ width: 206 }} />
								</div>
								<FooterForm handleClick={handleAddPayment} />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleAddPayment}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddPayment;
