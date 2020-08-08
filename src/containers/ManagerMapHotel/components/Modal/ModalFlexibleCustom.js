import { DatePicker, Modal, Select } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, FieldArray, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import { renderHour, renderPerson } from "helpers/Common/CommonRoom";
import FiledArrayCustom from "helpers/CustomFields/FiledArray";
import InputField from "helpers/CustomFields/InputField";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

const date = new Date();
const { Option } = Select;

ModalFlexibleCustom.propTypes = {
	getFlexiblePriceCustom: PropTypes.func,
	handleOpenFlexibleCustom: PropTypes.func,
};

ModalFlexibleCustom.defaultProps = {
	getFlexiblePriceCustom: null,
	handleOpenFlexibleCustom: null,
};

function ModalFlexibleCustom(props) {
	const {
		visibleCustom,
		handleOpenFlexibleCustom,
		getFlexiblePriceCustom,
	} = props;

	const { detail, samplePrice, callBack } = visibleCustom;

	const [listSamplePrice, setListSamplePrice] = useState([]);

	const flag = samplePrice ? samplePrice : "";

	useEffect(() => {
		async function getSamplePrice() {
			CommonApi(
				"GET",
				"/tenant/hotel-manager/sample-price?type=2&include=priceTimes",
				null
			).then((res) => setListSamplePrice(res.data.data));
		}
		getSamplePrice();
	}, []);

	function fillterDefault(data, id) {
		let result = [];
		if (data) {
			if (data.typeRoom) {
				if (data.typeRoom.data.typePrices) {
					if (data.typeRoom.data.typePrices.data.length > 0) {
						data.typeRoom.data.typePrices.data.map((value) => {
							if (value.priceTimes) {
								if (value.priceTimes.data.length > 0) {
									const priceTimes = value.priceTimes.data;
									let data = priceTimes.filter((x) => x.group_price_time_id === id);
									result.push(data);
									return null;
								} else return null;
							} else return null;
						});
					}
				}
			} else return [];
		}
		return result[0];
	}

	function fillterPrice(data, id) {
		if (data) {
			if (data.priceTimes) {
				if (data.priceTimes.data.length > 0) {
					return data.priceTimes.data.filter((x) => x.group_price_time_id === id);
				}
			}
		} else return [];
	}

	function handeOnChange(val, setFieldValue) {
		if (val === flag.id) {
			setFieldValue("type_price_id", flag.id);
			setFieldValue("price_day", flag.price_day);
			setFieldValue("price_night", flag.price_night);
			setFieldValue("price_month", flag.price_month);
			setFieldValue("price_by_hour", fillterDefault(flag, 1));
			setFieldValue("additional_overtime_checkout_day", fillterDefault(flag, 2));
			setFieldValue("additional_overtime_checkout_night", fillterDefault(flag, 4));
			setFieldValue("additional_checkin_soon_day", fillterDefault(flag, 8));
			setFieldValue("additional_checkin_soon_night", fillterDefault(flag, 16));
			setFieldValue("additional_add_extrabed", fillterDefault(flag, 32));
		} else {
			const result = listSamplePrice.find((x) => x.id === val);
			setFieldValue("type_price_id", result.id);
			setFieldValue("price_day", result.price_day);
			setFieldValue("price_night", result.price_night);
			setFieldValue("price_month", result.price_month);
			setFieldValue("price_by_hour", fillterPrice(result, 1));
			setFieldValue("additional_overtime_checkout_day", fillterPrice(result, 2));
			setFieldValue("additional_overtime_checkout_night", fillterPrice(result, 4));
			setFieldValue("additional_checkin_soon_day", fillterPrice(result, 8));
			setFieldValue("additional_checkin_soon_night", fillterPrice(result, 16));
			setFieldValue("additional_add_extrabed", fillterPrice(result, 32));
		}
	}

	function handleSubmit(data) {
		let convert = {
			room_id: detail.id,
			type_price_id: data.type_price_id,
			start_time: moment(date).format("DD/MM/YYYY"),
			end_time: moment(date).format("DD/MM/YYYY"),
			price_day: data.price_day,
			price_night: data.price_night,
			price_month: data.price_month === "" ? 0 : data.price_month,
			price_time: {
				price_by_hour: {
					type_id: 1,
					data: data.price_by_hour.map((value) => ({
						time: value.time,
						amount: value.amount,
					})),
				},
				additional_overtime_checkout_day: {
					type_id: 2,
					data: data.additional_overtime_checkout_day.map((value) => ({
						time: value.time,
						amount: value.amount,
					})),
				},
				additional_overtime_checkout_night: {
					type_id: 4,
					data: data.additional_overtime_checkout_night.map((value) => ({
						time: value.time,
						amount: value.amount,
					})),
				},
				additional_checkin_soon_day: {
					type_id: 8,
					data: data.additional_checkin_soon_day.map((value) => ({
						time: value.time,
						amount: value.amount,
					})),
				},
				additional_checkin_soon_night: {
					type_id: 16,
					data: data.additional_checkin_soon_night.map((value) => ({
						time: value.time,
						amount: value.amount,
					})),
				},
				additional_add_extrabed: {
					type_id: 32,
					data: data.additional_add_extrabed.map((value) => ({
						time: value.time,
						amount: value.amount,
					})),
				},
			},
		};
		getFlexiblePriceCustom(convert, callBack);
	}

	const initialValues = {
		type_price_id: samplePrice ? samplePrice.id : "",
		price_day: samplePrice ? samplePrice.price_day : "",
		price_night: samplePrice ? samplePrice.price_night : "",
		price_month: samplePrice ? samplePrice.price_month : "",
		price_by_hour: fillterDefault(samplePrice, 1),
		additional_overtime_checkout_day: fillterDefault(samplePrice, 2),
		additional_overtime_checkout_night: fillterDefault(samplePrice, 4),
		additional_checkin_soon_day: fillterDefault(samplePrice, 8),
		additional_checkin_soon_night: fillterDefault(samplePrice, 16),
		additional_add_extrabed: fillterDefault(samplePrice, 32),
	};

	const validationSchema = Yup.object().shape({
		price_day: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
		price_night: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
	});

	return (
		<Modal
			visible={visibleCustom.visible}
			onCancel={() => handleOpenFlexibleCustom({})}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={1001}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm cài đặt giá thay đổi cho khách</span>
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
									<div className="flex">
										<div className="w-4/12">
											<div className="mb-2 flex items-center">
												<div className="LabelCo">Lấy từ giá mẫu:</div>
												<Select
													name="type_price_id"
													value={values.type_price_id}
													style={{ width: 179, height: 30 }}
													onChange={(val) => handeOnChange(val, setFieldValue)}
												>
													<Option value={flag.id}>Giá mặc định hiện tại</Option>
													{listSamplePrice.map((value) => (
														<Option value={value.id} key={value.id}>
															{value.name}
														</Option>
													))}
												</Select>
											</div>
											<div className="mb-2 flex items-center">
												<div className="LabelCo">Thời gian bắt đầu:</div>
												<DatePicker
													name="start_time"
													defaultValue={moment(date)}
													format="DD/MM/YYYY"
													style={{ width: 159 }}
													onChange={(date, dateString) =>
														setFieldValue("start_time", dateString)
													}
												/>
											</div>
											<div className="mb-2 flex items-center">
												<div className="LabelCo">Thời gian kết thúc:</div>
												<DatePicker
													name="end_time"
													defaultValue={moment(date)}
													format="DD/MM/YYYY"
													style={{ width: 159 }}
													onChange={(date, dateString) =>
														setFieldValue("end_time", dateString)
													}
												/>
											</div>
											<FastField
												name="price_day"
												component={InputField}
												label="Giá theo ngày:"
												width={156}
											/>
											<FastField
												name="price_night"
												component={InputField}
												label="Giá qua đêm:"
												width={156}
											/>
											<FastField
												name="price_month"
												component={InputField}
												label="Giá theo tháng:"
												width={156}
											/>
											<FieldArray
												name="price_by_hour"
												component={(props) => (
													<FiledArrayCustom
														{...props}
														name="price_by_hour"
														label="Giá bán theo Giờ - Click để thêm"
														titleArray="Quá"
														array={values.price_by_hour}
														renderOption={renderHour}
													/>
												)}
											/>
										</div>
										<div className="w-4/12 mr-3">
											<FieldArray
												name="additional_overtime_checkout_day"
												component={(props) => (
													<FiledArrayCustom
														{...props}
														name="additional_overtime_checkout_day"
														label="Phụ trội quá giờ Checkout (Theo ngày)"
														titleArray="Quá"
														array={values.additional_overtime_checkout_day}
														renderOption={renderHour}
													/>
												)}
											/>
											<FieldArray
												name="additional_overtime_checkout_night"
												component={(props) => (
													<FiledArrayCustom
														{...props}
														name="additional_overtime_checkout_night"
														label="Phụ trội quá giờ Checkout (Qua đêm)"
														titleArray="Quá"
														array={values.additional_overtime_checkout_night}
														renderOption={renderHour}
													/>
												)}
											/>
										</div>
										<div className="w-4/12">
											<FieldArray
												name="additional_checkin_soon_day"
												component={(props) => (
													<FiledArrayCustom
														{...props}
														name="additional_checkin_soon_day"
														label="Phụ trội Checkin sớm (Theo ngày)"
														titleArray="Trước"
														array={values.additional_checkin_soon_day}
														renderOption={renderHour}
													/>
												)}
											/>
											<FieldArray
												name="additional_checkin_soon_night"
												component={(props) => (
													<FiledArrayCustom
														{...props}
														name="additional_checkin_soon_night"
														label="Phụ trội Checkin sớm (Qua đêm)"
														titleArray="Trước"
														array={values.additional_checkin_soon_night}
														renderOption={renderHour}
													/>
												)}
											/>
											<FieldArray
												name="additional_add_extrabed"
												component={(props) => (
													<FiledArrayCustom
														{...props}
														name="additional_add_extrabed"
														label="Phụ trội thêm khách - Extra Bed"
														titleArray="Thêm"
														keyArray={{ person: "1", amount: "50000" }}
														keyArrayText="person"
														array={values.additional_add_extrabed}
														renderOption={renderPerson}
													/>
												)}
											/>
										</div>
									</div>
									<FooterForm handleClick={() => handleOpenFlexibleCustom({})} />
								</Form>
							);
						}}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={() => handleOpenFlexibleCustom({})}
				/>
			</div>
		</Modal>
	);
}

export default ModalFlexibleCustom;
