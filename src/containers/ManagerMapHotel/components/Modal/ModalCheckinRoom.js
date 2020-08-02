import { Collapse, DatePicker, Modal, Select, Table, TimePicker } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import { renderQuantity } from "helpers/Common/CommonRoom";
import InputField from "helpers/CustomFields/InputField";
import TextAreaField from "helpers/CustomFields/TextAreaField";
import _ from "lodash";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import ModalFlexibleCustom from "./ModalFlexibleCustom";

const { Panel } = Collapse;
const { Option } = Select;

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
	const allData = [];
	const { visibleCheckinRoom, handleCheckinRoom, handleStatus } = props;

	const value = visibleCheckinRoom.detail;

	const [infoRoom, setinfoRoom] = useState({});
	const [listTypeCheckin, setListTypeCheckin] = useState([]);
	const [listPaymentMethod, setListPaymentMethod] = useState([]);
	const [listTypeRoom, setListTypeRoom] = useState([]);
	const [listNational, setListNational] = useState([]);
	const [visibleCustom, setVisibleCustom] = useState({
		visible: false,
		detail: {},
	});

	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	useEffect(() => {
		async function getListSamplePrice() {
			CommonApi(
				"GET",
				"/tenant/hotel-manager/type-room?include=typePrices",
				null
			).then((res) => setListTypeRoom(res.data.data));
		}
		async function getInfoRoom() {
			if (value.type_room_id) {
				CommonApi(
					"GET",
					`/tenant/hotel-manager/type-room/${value.type_room_id}?include=typePrices`,
					+null
				).then((res) => {
					setinfoRoom(res.data.data);
				});
			} else return setinfoRoom({});
		}

		async function getListTypeCheckin() {
			CommonApi("GET", "/tenant/checkin-manager/type-checkin").then((res) =>
				setListTypeCheckin(res.data.data)
			);
		}

		async function getListPaymentMethod() {
			CommonApi(
				"GET",
				"/tenant/payslip-receipt/payment-method",
				null
			).then((res) => setListPaymentMethod(res.data.data));
		}
		async function getNational() {
			CommonApi("GET", "/tenant/nation-manager/nations", null).then((res) =>
				setListNational(res.data.data)
			);
		}
		getListSamplePrice();
		getInfoRoom();
		getListTypeCheckin();
		getListPaymentMethod();
		getNational();
	}, [hotel_ID, value]);

	const find = listNational.find((x) => x.nation_code === "VN");

	const initialValues = {
		type_price_id: value.type_room_id,
		price_check_in: !_.isEmpty(infoRoom)
			? infoRoom.typePrices.data[0].price_day
			: "",
		date_in: moment(date).format("DD/MM/YYYY"),
		time_in: moment(time).format(format),
		date_out_temp: moment(date).format("DD/MM/YYYY"),
		time_out_temp: moment(time).format(format),
		prepayment: 100000,
		number_people_in_room: "",
		type_check_in_id: listTypeCheckin.length > 0 ? listTypeCheckin[0].id : "",
		note_diagram: "",
		note: "",
		room_id: value.id,
		name: "",
		identity_code: "",
		address: "",
		nation_id: find ? find.id : "",
		payment_method_id:
			listPaymentMethod.length > 0 ? listPaymentMethod[0].id : "",
		note_payment: "",
	};

	const validationSchema = Yup.object().shape({
		number_people_in_room: Yup.string().required("Không được để trống."),
		identity_code: Yup.string().required("Không được để trống."),
		name: Yup.string().required("Không được để trống."),
		address: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		let body = {
			price_check_in: data.price_check_in,
			date_in: data.date_in,
			time_in: data.time_in,
			date_out_temp: data.date_out_temp,
			time_out_temp: data.time_out_temp,
			prepayment: data.prepayment,
			number_people_in_room: data.number_people_in_room,
			type_check_in_id: 1,
			note_diagram: data.note_diagram,
			note: data.note,
			room_id: data.room_id,
			customer: JSON.stringify({
				data: [
					{
						name: data.name,
						identity_code: data.identity_code,
						address: data.address,
						nation_id: data.nation_id,
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
			service: JSON.stringify({ data: allData }),
			type_price_id: data.type_price_id,
			flexible_prices_for_customers: JSON.stringify({ data: [] }),
		};

		CommonApi("POST", "/tenant/checkin-manager/checkin", body);
	}

	function handleAddCheckinService() {
		// allData.push({
		// 	name,
		// 	quantity,
		// 	amount,
		// 	price: quantity * amount,
		// });
	}

	function handleOnChange(value, setFieldValue) {
		const price = listTypeRoom.find((x) => x.id === value);
		setFieldValue("type_price_id", value);
		setFieldValue("price_check_in", price.typePrices.data[0].price_day);
	}

	function handleOpenFlexibleCustom(price) {
		setVisibleCustom({
			visible: !visibleCustom.visible,
			detail: price,
		});
	}

	function getFlexiblePriceCustom(value) {
		setVisibleCustom({
			visible: !visibleCustom.visible,
			detail: {},
		});
		console.log(value);
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Tên dịch vụ", dataIndex: "name", key: "name" },
		{ title: "Số lượng", dataIndex: "quantity", key: "quantity" },
		{ title: "Đơn giá", dataIndex: "amount", key: "amount" },
		{ title: "Thành tiền", dataIndex: "price", key: "price" },
		{ title: "Thao tác" },
	];

	return (
		<Modal
			visible={visibleCheckinRoom.visible}
			onCancel={handleCheckinRoom}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={760}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>{`Nhận Phòng ${value.name}`}</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						enableReinitialize
					>
						{({ setFieldValue, values }) => (
							<Form>
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
												/>
												<i
													className="fas fa-pencil-alt cursor-pointer"
													onClick={() => handleOpenFlexibleCustom(infoRoom)}
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
											<div className="flex mb-1 items-center">
												<div className="LabelCo">Loại Checkin:</div>
												<Field
													as="select"
													name="type_check_in_id"
													style={{ width: 249, height: 30 }}
												>
													{listTypeCheckin.map((value) => (
														<option value={value.id} key={value.id}>
															{value.name}
														</option>
													))}
												</Field>
											</div>
											<FastField
												name="number_people_in_room"
												component={InputField}
												label="Số lượng người:"
												width={213}
											/>
										</div>
										<div className="w-6/12">
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
										<div className="grid grid-cols-7 mb-2">
											<div className="col-span-4">
												<div className="flex mb-1 items-center">
													<div className="LabelCo">Dịch vụ:</div>
													<Field
														as="select"
														name="floor_id"
														style={{ width: 226, height: 30 }}
													>
														<option>1</option>
													</Field>
												</div>
											</div>
											<div className="col-span-2">
												<div className="flex mb-1 items-center">
													<div className="LabelCo">Số lượng:</div>
													<Field
														as="select"
														name="floor_id"
														style={{ width: 226, height: 30 }}
													>
														{renderQuantity()}
													</Field>
												</div>
											</div>
											<div className="col-span-1 flex items-center justify-center">
												<button
													className="dashboardButton focus:outline-none"
													onClick={handleAddCheckinService}
												>
													Thêm
												</button>
											</div>
										</div>
										<Table
											dataSource={allData}
											columns={columns}
											bordered
											scroll={{ x: true }}
										/>
									</Panel>
									<Panel header="Thông tin khách hàng" key="2" className="text-xs black">
										<div className="grid grid-cols-2">
											<FastField
												name="identity_code"
												component={InputField}
												label="CMND/Passport:"
												width={190}
											/>
											<FastField
												name="name"
												component={InputField}
												label="Tên khách hàng:"
												width={190}
											/>
											<FastField
												name="address"
												component={InputField}
												label="Địa chỉ:"
												width={190}
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
													style={{ width: 196, height: 30 }}
													onChange={(newValue) => setFieldValue("nation_id", newValue)}
												>
													{listNational.map((value) => (
														<Option value={value.id} key={value.id}>
															{value.name}
														</Option>
													))}
												</Select>
											</div>
										</div>
									</Panel>
								</Collapse>
								<div className="mt-3">
									<FooterForm handleClick={handleCheckinRoom} title="Nhận Phòng" />
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleCheckinRoom}
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
