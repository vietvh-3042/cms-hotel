import { Collapse, DatePicker, Modal, TimePicker } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import TextAreaField from "helpers/CustomFields/TextAreaField";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";
import CheckinCustomer from "../Checkin/CheckinCustomer";
import CheckinService from "../Checkin/CheckinService";
import ModalFlexibleCustom from "./ModalFlexibleCustom";

const { Panel } = Collapse;

const date = new Date();
const time = date.getTime();
const format = "HH:mm";

ModalCheckinRoom.propTypes = {
	handleCheckinRoom: PropTypes.func,
	handleStatus: PropTypes.func,
};

ModalCheckinRoom.defaultProps = {
	handleCheckinRoom: null,
	handleStatus: null,
};

function ModalCheckinRoom(props) {
	let allCustomer = [];

	const { visibleCheckinRoom, handleCheckinRoom, handleStatus } = props;
	const { detail } = visibleCheckinRoom;

	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	const [listSamplePriceDefault, setListSamplePriceDefault] = useState([]);

	const [listPaymentMethod, setListPaymentMethod] = useState([]);

	const [listCustomerDefault, setCustomerDefault] = useState([]);

	const [flexibleCustom, setFlexibleCustom] = useState([]);

	const [visibleCustom, setVisibleCustom] = useState({
		visible: false,
		detail: {},
		samplePrice: {},
		callBack: {},
	});

	useEffect(() => {
		async function getSamplePriceDefault() {
			CommonApi(
				"GET",
				"/tenant/hotel-manager/sample-price?type=1&include=typeRoom.typePrices.priceTimes",
				null
			).then((res) => setListSamplePriceDefault(res.data.data));
		}

		async function getListPaymentMethod() {
			CommonApi(
				"GET",
				"/tenant/payslip-receipt/payment-method",
				null
			).then((res) => setListPaymentMethod(res.data.data));
		}

		async function getCustomerDefault() {
			CommonApi("GET", "/tenant/customer-manager/customer?litmit=1").then((res) =>
				setCustomerDefault(res.data.data)
			);
		}
		getSamplePriceDefault();
		getListPaymentMethod();
		getCustomerDefault();
	}, [hotel_ID]);

	//find infor sample price by type room id
	const result = findSamplePriceDefaultByTypeRoom(detail);

	const initialValues = {
		//infor room
		price_check_in: result ? result.price_day : "",
		type_price_id: result ? result.id : "",
		date_in: moment(date).format("DD/MM/YYYY"),
		time_in: moment(time).format(format),
		date_out_temp: moment(date).format("DD/MM/YYYY"),
		time_out_temp: moment(time).format(format),
		prepayment: 100000,
		payment_method_id:
			listPaymentMethod.length > 0 ? listPaymentMethod[0].id : "",
		note_payment: "",
		note_diagram: "",
		note: "",
	};

	const validationSchema = Yup.object().shape({
		price_check_in: Yup.string().required("Không được để trống."),
		prepayment: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
		payment_method_id: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		let body = {
			price_check_in: data.price_check_in,
			date_in: data.date_in,
			time_in: data.time_in,
			date_out_temp: data.date_out_temp,
			time_out_temp: data.time_out_temp,
			prepayment: data.prepayment,
			number_people_in_room: allCustomer.length > 0 ? allCustomer.length : 1,
			type_check_in_id: 1,
			note_diagram: data.note_diagram,
			note: data.note,
			room_id: detail.id,
			customer:
				allCustomer.length > 0
					? JSON.stringify({
							data: allCustomer,
					  })
					: JSON.stringify({
							data: [
								{
									name: listCustomerDefault[0].name,
									identity_code: listCustomerDefault[0].identity_code,
									address: listCustomerDefault[0].address,
									nation_id: listCustomerDefault[0].nation_id,
								},
							],
					  }),
			deposit: JSON.stringify({
				data: [
					{
						amount: data.prepayment,
						payment_method_id: data.payment_method_id,
						amount_usd: 8,
						note: data.note_payment,
					},
				],
			}),
			service: JSON.stringify({ data: [] }),
			type_price_id: data.type_price_id,
			flexible_prices_for_customers: JSON.stringify({
				data: flexibleCustom,
			}),
		};

		CommonApi("POST", "/tenant/checkin-manager/checkin", body)
			.then((res) => {
				toast.success("Đặt phòng thành công");
				handleCheckinRoom({});
				handleStatus();
			})
			.catch((err) => console.log(err.response));
	}

	function findSamplePriceDefaultByTypeRoom(value) {
		if (value) {
			const result = listSamplePriceDefault.find(
				(x) => x.type_room_id === value.type_room_id
			);
			if (result) return result;
		}
	}

	function getCustomer(value) {
		allCustomer = [...value];
	}

	function handleOpenFlexibleCustom(detail, samplePrice, setFieldValue) {
		setVisibleCustom({
			visible: !visibleCustom.visible,
			detail: detail,
			samplePrice: samplePrice,
			callBack: setFieldValue,
		});
	}

	function getFlexiblePriceCustom(value, setFieldValue) {
		setVisibleCustom({
			visible: !visibleCustom.visible,
			detail: {},
		});
		setFieldValue("price_check_in", value.price_day);
		setFieldValue("type_price_id", value.type_price_id);
		setFlexibleCustom(value);
	}

	return (
		<Modal
			visible={visibleCheckinRoom.visible}
			onCancel={() => handleCheckinRoom({})}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={760}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>{`Nhận ${detail.name}`}</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						enableReinitialize
					>
						{({ setFieldValue }) => (
							<Form name="mainForm">
								<fieldset className="mb-3" style={{ border: "1px solid #d0d0d0" }}>
									<legend className="groupHour w-280 ml-3">
										<span>Thông tin đăng ký - Phòng Đơn</span>
									</legend>
									<div className="flex">
										<div className="w-6/12">
											<div className="flex items-center justify-between">
												<FastField
													name="price_check_in"
													component={InputField}
													label="Giá:"
													width={220}
													visible={true}
												/>
												<i
													className="fas fa-pencil-alt cursor-pointer"
													onClick={() =>
														handleOpenFlexibleCustom(detail, result, setFieldValue)
													}
												/>
											</div>
											<div className="flex mb-1">
												<div className="flex items-center">
													<div className="LabelCo">Ngày vào:</div>
													<DatePicker
														name="date_in"
														defaultValue={moment(date)}
														format="DD/MM/YYYY"
														style={{ width: 125 }}
														onChange={(date, dateString) =>
															setFieldValue("date_in", dateString)
														}
													/>
												</div>
												<div className="flex items-center">
													<div className="LabelCo" style={{ width: 35 }}>
														Lúc:
													</div>
													<TimePicker
														style={{ width: 85 }}
														defaultValue={moment(time)}
														format={format}
														onChange={(time, timeString) =>
															setFieldValue("time_in", timeString)
														}
													/>
												</div>
											</div>
											<div className="flex mb-1">
												<div className="flex items-center">
													<div className="LabelCo">Ngày ra dự kiến:</div>
													<DatePicker
														name="date_out_temp"
														defaultValue={moment(date)}
														format="DD/MM/YYYY"
														style={{ width: 125 }}
														onChange={(date, dateString) =>
															setFieldValue("date_out_temp", dateString)
														}
													/>
												</div>
												<div className="flex items-center">
													<div className="LabelCo" style={{ width: 35 }}>
														Lúc:
													</div>
													<TimePicker
														style={{ width: 85 }}
														defaultValue={moment(time)}
														format={format}
														onChange={(time, timeString) =>
															setFieldValue("time_out_temp", timeString)
														}
													/>
												</div>
											</div>
											<FastField
												name="prepayment"
												component={InputField}
												label="Số tiền kí gửi:"
												width={230}
											/>
											<div className="flex mb-1 items-center">
												<div className="LabelCo">Hình thức trả:</div>
												<Field
													as="select"
													name="payment_method_id"
													style={{ width: 236, height: 30 }}
												>
													{listPaymentMethod.map((value) => (
														<option value={value.id} key={value.id}>
															{value.name}
														</option>
													))}
												</Field>
											</div>
										</div>
										<div className="w-6/12">
											<FastField
												name="note_payment"
												component={TextAreaField}
												label="Ghi chú hình thức:"
												width={230}
											/>
											<FastField
												name="note_diagram"
												component={InputField}
												label="Ghi sơ đồ:"
												width={230}
											/>
											<FastField
												name="note"
												component={TextAreaField}
												label="Ghi chú:"
												width={230}
											/>
										</div>
									</div>
								</fieldset>

								<Collapse className="mt-3 collapseRoom" defaultActiveKey={["2"]}>
									<Panel header="Thêm dịch vụ" key="1" className="text-xs black">
										<CheckinService />
									</Panel>
									<Panel header="Thông tin khách hàng" key="2" className="text-xs black">
										<CheckinCustomer getCustomer={getCustomer} />
									</Panel>
								</Collapse>
								<div className="mt-3">
									<FooterForm
										handleClick={() => handleCheckinRoom({})}
										title="Nhận Phòng"
									/>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={() => handleCheckinRoom({})}
				/>
			</div>
			<ModalFlexibleCustom
				visibleCustom={visibleCustom}
				handleOpenFlexibleCustom={handleOpenFlexibleCustom}
				getFlexiblePriceCustom={getFlexiblePriceCustom}
			/>
		</Modal>
	);
}

export default ModalCheckinRoom;
