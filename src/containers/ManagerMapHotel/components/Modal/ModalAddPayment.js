import { DatePicker, Modal } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";

ModalAddPayment.propTypes = {
	handleAddBill: PropTypes.func,
};

ModalAddPayment.defaultProps = {
	handleAddBill: null,
};

function ModalAddPayment(props) {
	const { visible, handleAddBill } = props;
	const [listCategory, setListCategory] = useState([]);
	const [listPaymentMethod, setListPaymentMethod] = useState([]);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	const initialValues = {
		date_receipt: "",
		payment_method_id: "",
		content: "",
		amount: "",
		category_id: "",
		note: "",
		status: false,
	};
	const validationSchema = Yup.object().shape({
		date_receipt: Yup.string().required("Không được để trống"),
		payment_method_id: Yup.string().required("Không được để trống"),
		content: Yup.string().required("Không được để trống"),
		amount: Yup.number().typeError("Phải là số").required("Không được để trống."),
		category_id: Yup.string().required("Không được để trống"),
	});

	function handleSubmit(data) {
		console.log(data);
		// var today = new Date();
		// var dd = String(today.getDate()).padStart(2, "0");
		// var mm = String(today.getMonth() + 1).padStart(2, "0");
		// var yyyy = today.getFullYear();
		// today = dd + "/" + mm + "/" + yyyy;
		// Axios({
		// 	method: "POST",
		// 	url: endpoint + "/tenant/payslip-receipt/payslip",
		// 	data: {
		// 		...data,
		// 		date_created: today, /// ngày tạo
		// 		guest_id: 1,
		// 		employee_id: 2,
		// 	},
		// 	headers: {
		// 		Accept: "application/json",
		// 		"Content-Type": "application/json",
		// 		Authorization: "Bearer" + user.meta.access_token,
		// 		"tenant-name": user.data.name,
		// 	},
		// });
	}

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
		getListCategory();
		getListPaymentMethod();
	}, [hotel_ID]);

	return (
		<Modal
			visible={visible}
			onCancel={handleAddBill}
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
						{({ values, setFieldValue, errors, touched }) => (
							<Form>
								<div className="flex mb-1 items-center">
									<div className="LabelCo">Ngày thu:</div>
									<DatePicker
										name="date_receipt"
										format="DD/MM/YYYY"
										style={{ width: 206 }}
										onChange={(date, dateString) =>
											setFieldValue("date_receipt", dateString)
										}
									/>
								</div>

								{errors.date_receipt && touched.date_receipt ? (
									<div className="flex items-center">
										<div className="LabelCo opacity-0">-----</div>
										<div className="custom-err-form">{errors.date_receipt}</div>
									</div>
								) : null}

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
								<div className="flex mb-1 items-center">
									<div className="LabelCo">Loại chi phí:</div>
									<Field
										as="select"
										name="category_id"
										style={{ width: 206, height: 30 }}
									>
										{listCategory.map((value) => (
											<option value={value.id}>{value.name}</option>
										))}
									</Field>
								</div>

								{errors.category_id && touched.category_id ? (
									<div className="flex items-center">
										<div className="LabelCo opacity-0">-----</div>
										<div className="custom-err-form">{errors.category_id}</div>
									</div>
								) : null}

								<div className="flex mb-1 items-center">
									<div className="LabelCo">Chi tiết:</div>
									<Field
										as="select"
										name="payment_method_id"
										style={{ width: 206, height: 30 }}
									>
										{listPaymentMethod.map((value) => (
											<option value={value.id}>{value.name}</option>
										))}

									</Field>
								</div>

								{errors.payment_method_id && touched.payment_method_id ? (
									<div className="flex items-center">
										<div className="LabelCo opacity-0">-----</div>
										<div className="custom-err-form">{errors.payment_method_id}</div>
									</div>
								) : null}

								<FastField
									name="name"
									component={InputField}
									label="Người nhận:"
									width={200}
								/>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Trạng thái:</div>
									<Field type="checkbox" name="status" />
									<span>Đã thanh toán</span>
								</div>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ghi chú:</div>
									<Field as="textarea" name="note" rows="3" style={{ width: 206 }} />
								</div>
								<FooterForm handleClick={handleAddBill} />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleAddBill}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddPayment;
