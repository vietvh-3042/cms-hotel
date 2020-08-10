import Modal from "antd/lib/modal/Modal";
import { FastField, Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import TextAreaField from "helpers/CustomFields/TextAreaField";
import _ from "lodash";
import PropTypes from "prop-types";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import PDF from "components/utility/PDF";
import { useReactToPrint } from "react-to-print";
import { Dropdown, Menu } from "antd";
import PDFService from "components/utility/PDF_Service";

ModalCheckoutRoom.propTypes = {
	handleCheckoutRoom: PropTypes.func,
	handleStatus: PropTypes.func,
};

ModalCheckoutRoom.defaultProps = {
	handleCheckoutRoom: null,
	handleStatus: null,
};

function ModalCheckoutRoom(props) {
	const pdfExportComponent = useRef();

	const pdfExportComponentService = useRef();

	const { visibleCheckoutRoom, handleCheckoutRoom, handleStatus } = props;

	const [inforCheckout, setInforCheckout] = useState();

	const [listPaymentMethod, setListPaymentMethod] = useState([]);

	useEffect(() => {
		async function getInforCheckout() {
			const checkin_id = visibleCheckoutRoom.detail;
			if (_.isNumber(checkin_id)) {
				CommonApi(
					"GET",
					`/tenant/checkin-manager/get-checkout/${checkin_id}`
				).then((res) => setInforCheckout(res.data.data[0]));
			}
		}

		async function getListPaymentMethod() {
			CommonApi(
				"GET",
				"/tenant/payslip-receipt/payment-method",
				null
			).then((res) => setListPaymentMethod(res.data.data));
		}
		getInforCheckout();
		getListPaymentMethod();
	}, [visibleCheckoutRoom]);

	const initialValues = {
		prepayment: inforCheckout ? inforCheckout.prepayment : "",
		reduce: "",
		surcharge: "",
		price_room: inforCheckout ? inforCheckout.room.price_room : "",
		amount: inforCheckout ? inforCheckout.total_bill_payment : "",
		payment_method_id:
			listPaymentMethod.length > 0 ? listPaymentMethod[0].id : "",
		currency_id: 1,
		date_in: inforCheckout ? inforCheckout.check_in : "",
		date_out: inforCheckout ? inforCheckout.check_out : "",
		check_in_id: "",
		room_id: "",
		note: "",
		note_status: "",
		status: "1",
		customer_id: "",
	};

	const validationSchema = Yup.object().shape({});

	function handleSubmit(data) {
		CommonApi("POST", "/tenant/checkout-manager/single-customer", {
			...data,
			check_in_id: inforCheckout.check_in_id,
			room_id: inforCheckout.room.id,
			customer_id: inforCheckout.customer.id,
		})
			.then((res) => {
				toast.success("Thanh toán thành công");
				handleCheckoutRoom({});
				handleStatus();
			})
			.catch((err) => console.log(err.response));
	}

	const MyInput = ({ field, form, visible, ...props }) => {
		return (
			<input
				{...field}
				{...props}
				disabled={visible}
				style={{ width: 80, fontWeight: "bold" }}
			/>
		);
	};

	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	function totalRoom(value) {
		let listPrice = [];
		value.map((val) => {
			for (let total of Object.values(val)) {
				listPrice.push(total);
			}
		});
		return format_current(
			listPrice.reduce((accumulator, currentValue) => accumulator + currentValue)
		);
	}

	function renderListTime(value) {
		return value.map((val, key) => (
			<div key={key} className="grid grid-cols-4 w-full">
				<div className="col-span-3">
					<div className="timerange text-checkin">{Object.keys(val)[0]}</div>
				</div>
				<div className="col-span-1">
					<div className="money text-checkin">{`[${format_current(
						Object.values(val)[0]
					)}]`}</div>
				</div>
			</div>
		));
	}

	function renderListService(value) {
		return value.map((val, key) => (
			<div key={key} className="flex justify-between w-full">
				<div className="timerange text-checkin">{Object.keys(val)[0]}</div>
				<div className="text-checkin quantity">
					{Object.values(val)[0].price}
					<span className="ml-2">X</span>
				</div>
				<div className="text-checkin quantity">
					{Object.values(val)[0].quantity}
				</div>
				<div className="money text-checkin">{`[${format_current(
					Object.values(val)[0].amount
				)}]`}</div>
			</div>
		));
	}

	const handleExportBill = useReactToPrint({
		content: () => pdfExportComponent.current,
		onBeforeGetContent: () => {
			CommonApi("POST", "/tenant/checkout-manager/single-customer", {
				...initialValues,
				check_in_id: inforCheckout.check_in_id,
				room_id: inforCheckout.room.id,
				customer_id: inforCheckout.customer.id,
			})
				.then((res) => {
					toast.success("Thanh toán thành công");
					handleCheckoutRoom({});
					handleStatus();
				})
				.catch((err) => console.log(err.response));
		},
	});

	const handleExportBillService = useReactToPrint({
		content: () => pdfExportComponentService.current,
	});

	const menu = (
		<Menu>
			<Menu.Item className="text-xs" onClick={handleExportBill}>
				Xuất hóa đơn
			</Menu.Item>
			<Menu.Item className="text-xs" onClick={handleExportBillService}>
				Xuất hóa đơn dịch vụ
			</Menu.Item>
		</Menu>
	);

	function handleOnChangeCheckout(e, setFieldValue) {
		const { value } = e.target;
		setFieldValue("status", value);
	}

	return (
		<Modal
			visible={visibleCheckoutRoom.visible}
			onCancel={() => handleCheckoutRoom({})}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={570}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>{inforCheckout ? `Hóa Đơn ${inforCheckout.room.name}` : ""}</span>
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
									<div className="grid grid-cols-2 mb-2">
										{/* infor hoa don */}
										<div className="checkout-item justify-center">
											<img
												src="/images/Common/khachhang.png"
												alt="khachhang"
												className="inline-block"
											/>
											<span className="text-checkin">Khách hàng:</span>
											<span
												className="text-bold text-checkin text-value"
												style={{ width: 120 }}
											>
												{inforCheckout ? inforCheckout.customer.name : ""}
											</span>
										</div>
										<div className="checkout-item justify-center">
											<span className="text-checkin">Mã HĐ:</span>
											<span className="text-bold text-checkin text-value">
												{inforCheckout ? inforCheckout.bill_code : ""}
											</span>
										</div>
										<div className="checkout-item justify-center">
											<span className="text-checkin">Vào lúc:</span>
											<span
												className="text-bold text-checkin text-value"
												style={{ width: 100 }}
											>
												{values.date_in}
											</span>
										</div>
										<div className="checkout-item justify-center">
											<span className="text-checkin">Trả lúc:</span>
											<span
												className="text-bold text-checkin text-value"
												style={{ width: 100 }}
											>
												{values.date_out}
											</span>
										</div>
										<div className="checkout-item justify-center">
											<span className="text-checkin">Loại phòng:</span>
											<span className="text-bold text-checkin text-value">
												{inforCheckout ? inforCheckout.room.type_room : ""}
											</span>
										</div>
										<div className="split col-span-2"></div>
									</div>

									{/* infor current */}
									<div className="grid grid-cols-2 mb-2">
										<div className="checkout-item col-span-2">
											<div className="text-checkin" style={{ width: 160 }}>
												<img
													src="/images/Common/moneyRoom.png"
													alt="moneyRoom"
													className="inline-block mr-2"
												/>
												<span>Tiền phòng:</span>
											</div>
											<span
												className="text-bold text-checkin text-value"
												style={{ fontSize: 16 }}
											>
												{inforCheckout ? totalRoom(inforCheckout.room.bill_price_room) : ""}
											</span>
										</div>
										<div className="mt-1 flex justify-between col-span-2 flex-wrap">
											{inforCheckout
												? renderListTime(inforCheckout.room.bill_price_room)
												: ""}
										</div>
										<div className="split mt-2 col-span-2"></div>
									</div>
									{/* current service */}
									<div className="grid grid-cols-2 mb-2">
										<div className="checkout-item col-span-2">
											<div className="text-checkin" style={{ width: 165 }}>
												<img
													src="/images/Common/addService.png"
													alt="addService"
													className="inline-block mr-2"
												/>
												<span>Tiền dịch vụ:</span>
											</div>
											<span
												className="text-bold text-checkin text-value"
												style={{ fontSize: 16 }}
											>
												{inforCheckout
													? format_current(inforCheckout.room.service_use.total)
													: ""}
											</span>
										</div>
										<div className="mt-1 flex justify-between col-span-2 flex-wrap">
											{inforCheckout
												? renderListService(inforCheckout.room.service_use.detail)
												: ""}
										</div>
										<div className="split mt-2 col-span-2"></div>
									</div>

									<div className="checkout-item mt-3 justify-between">
										<div>
											<div className="text-checkin">Phụ thu:</div>
											<Field name="surcharge" component={MyInput} />
										</div>
										<div>
											<div className="text-checkin">Giảm trừ:</div>
											<Field name="reduce" component={MyInput} />
										</div>
										<div>
											<div className="text-checkin">Trả trước:</div>
											<Field name="prepayment" component={MyInput} visible={true} />
										</div>
									</div>

									<div className="grid grid-cols-2 mb-2 mt-3">
										<div className="checkout-item justify-center">
											<div className="text-checkin" style={{ width: 165 }}>
												<img
													src="/images/Common/caculator.png"
													alt="caculator"
													className="inline-block mr-2"
												/>
												<span>Thanh toán:</span>
											</div>
											<span
												className="text-bold text-checkin text-value"
												style={{ fontSize: 16 }}
											>
												{format_current(values.amount)}
											</span>
										</div>
									</div>

									<div className="flex mb-3">
										<div className="flex mb-1 items-center">
											<div className="text-checkin">Trạng thái:</div>
											<Field
												as="select"
												name="status"
												style={{ width: 233, height: 24 }}
												onChange={(e) => handleOnChangeCheckout(e, setFieldValue)}
											>
												<option value="1">Đã thanh toán</option>
												<option value="2">Chưa thanh toán</option>
												<option value="4">Đưa vào công nợ</option>
												<option value="8">Chuyển phòng</option>
											</Field>
										</div>
										<div className="flex mb-1 items-center">
											<div className="text-checkin">Hình thức trả:</div>
											<Field
												as="select"
												name="payment_method_id"
												style={{ width: 115, height: 24 }}
											>
												{listPaymentMethod.map((value) => (
													<option value={value.id} key={value.id}>
														{value.name}
													</option>
												))}
											</Field>
										</div>
									</div>

									<FastField
										name="note"
										component={TextAreaField}
										label="Ghi chú:"
										width={"100%"}
									/>
									<div className="flex items-center justify-end mr-0 mt-2">
										<button
											type="button"
											className="submit_cancel_Building focus:outline-none"
											onClick={() => handleCheckoutRoom({})}
										>
											Cancel
										</button>
										<Dropdown overlay={menu}>
											<button className="grey mr-2" type="button">
												<span className="print" />
												<span>Export hóa đơn </span>
											</button>
										</Dropdown>

										<button type="submit" className="dashboardButton focus:outline-none">
											Trả Phòng
										</button>
									</div>
								</Form>
							);
						}}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={() => handleCheckoutRoom({})}
				/>
			</div>
			<PDF pdfExportComponent={pdfExportComponent} inforCheckout={inforCheckout} />
			<PDFService
				pdfExportComponent={pdfExportComponentService}
				inforCheckout={inforCheckout}
			/>
		</Modal>
	);
}

export default ModalCheckoutRoom;
