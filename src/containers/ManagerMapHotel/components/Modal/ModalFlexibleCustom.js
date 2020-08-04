import { DatePicker, Modal, Select } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, FieldArray, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import { renderHour, renderPerson } from "helpers/Common/CommonRoom";
import FiledArrayCustom from "helpers/CustomFields/FiledArray";
import InputField from "helpers/CustomFields/InputField";
import _ from "lodash";
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
	let priceHour = [];
	let checkout_day = [];
	let checkout_night = [];
	let soon_day = [];
	let soon_night = [];
	let extrabed = [];

	const {
		visibleCustom,
		handleOpenFlexibleCustom,
		getFlexiblePriceCustom,
	} = props;

	const value = visibleCustom.detail.infoTypeRoom;
	const { inforRoom } = visibleCustom.detail;

	const { callBack } = visibleCustom;

	const [listSamplePrice, setListSamplePrice] = useState([]);

	useEffect(() => {
		async function getListSamplePrice() {
			CommonApi(
				"GET",
				"/tenant/hotel-manager/sample-price?include=priceTimes",
				null
			).then((res) => setListSamplePrice(res.data.data));
		}
		getListSamplePrice();
	}, []);

	const initialValues = {
		type_price_id: "",
		start_time: moment(date).format("DD/MM/YYYY"),
		end_time: moment(date).format("DD/MM/YYYY"),
		price_day: !_.isEmpty(value) ? value.typePrices.data[0].price_day : "",
		price_night: !_.isEmpty(value) ? value.typePrices.data[0].price_night : "",
		price_month: !_.isEmpty(value) ? value.typePrices.data[0].price_month : "",
		price_by_hour: [{ time: "1", amount: "50000" }],
		additional_overtime_checkout_day: [{ time: "1", amount: "50000" }],
		additional_overtime_checkout_night: [{ time: "1", amount: "50000" }],
		additional_checkin_soon_day: [{ time: "1", amount: "50000" }],
		additional_checkin_soon_night: [{ time: "1", amount: "50000" }],
		additional_add_extrabed: [{ person: "1", amount: "50000" }],
	};

	const validationSchema = Yup.object().shape({
		price_day: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
		price_night: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
	});

	function handleSubmit(data) {
		let convert = {
			room_id: inforRoom.id,
			type_price_id: data.type_price_id === "" ? value.id : data.type_price_id,
			start_time: data.start_time,
			end_time: data.end_time,
			price_day: data.price_day,
			price_night: data.price_night,
			price_month: data.price_month === "" ? 0 : data.price_month,
			price_time: {
				price_by_hour: {
					type_id: 1,
					data: data.price_by_hour,
				},
				additional_overtime_checkout_day: {
					type_id: 2,
					data: data.additional_overtime_checkout_day,
				},
				additional_overtime_checkout_night: {
					type_id: 4,
					data: data.additional_overtime_checkout_night,
				},
				additional_checkin_soon_day: {
					type_id: 8,
					data: data.additional_checkin_soon_day,
				},
				additional_checkin_soon_night: {
					type_id: 16,
					data: data.additional_checkin_soon_night,
				},
				additional_add_extrabed: {
					type_id: 32,
					data: data.additional_add_extrabed,
				},
			},
		};
		console.log(data);
		// getFlexiblePriceCustom(convert, callBack);
	}

	function handeOnChange(val, setFieldValue) {
		priceHour = [];
		checkout_day = [];
		checkout_night = [];
		soon_day = [];
		soon_night = [];
		extrabed = [];
		if (val === "") {
			setFieldValue("type_price_id", "");
			setFieldValue("price_day", value.typePrices.data[0].price_day);
			setFieldValue("price_night", value.typePrices.data[0].price_night);
			setFieldValue("price_month", value.typePrices.data[0].price_month);

			setFieldValue("price_by_hour", [{ time: "1", amount: "50000" }]);
			setFieldValue("additional_overtime_checkout_day", [
				{ time: "1", amount: "50000" },
			]);
			setFieldValue("additional_overtime_checkout_night", [
				{ time: "1", amount: "50000" },
			]);
			setFieldValue("additional_checkin_soon_day", [
				{ time: "1", amount: "50000" },
			]);
			setFieldValue("additional_checkin_soon_night", [
				{ time: "1", amount: "50000" },
			]);
			setFieldValue("additional_add_extrabed", [{ person: "1", amount: "50000" }]);
		} else {
			const result = listSamplePrice.find((x) => x.id === val);
			setFieldValue("type_price_id", result.id);
			setFieldValue("price_day", result.price_day);
			setFieldValue("price_night", result.price_night);
			setFieldValue("price_month", result.price_month);
			if (result.priceTimes.data.length > 0) {
				result.priceTimes.data.map((val) => {
					if (val.group_price_time_id === 1) priceHour.push(val);
					if (val.group_price_time_id === 2) checkout_day.push(val);
					if (val.group_price_time_id === 4) checkout_night.push(val);
					if (val.group_price_time_id === 8) soon_day.push(val);
					if (val.group_price_time_id === 16) soon_night.push(val);
					if (val.group_price_time_id === 32) extrabed.push(val);

					setFieldValue("price_by_hour", priceHour);
					setFieldValue("additional_overtime_checkout_day", checkout_day);
					setFieldValue("additional_overtime_checkout_night", checkout_night);
					setFieldValue("additional_checkin_soon_day", soon_day);
					setFieldValue("additional_checkin_soon_night", soon_night);
					setFieldValue("additional_add_extrabed", extrabed);
				});
			} else {
				setFieldValue("price_by_hour", []);
				setFieldValue("additional_overtime_checkout_day", []);
				setFieldValue("additional_overtime_checkout_night", []);
				setFieldValue("additional_checkin_soon_day", []);
				setFieldValue("additional_checkin_soon_night", []);
				setFieldValue("additional_add_extrabed", []);
			}
		}
	}

	function findTypePrice() {
		if (inforRoom) {
			if (listSamplePrice.length > 0) {
				console.log(listSamplePrice);
				const result = listSamplePrice.find(
					(x) => x.type_room_id === inforRoom.type_room_id
				);
				console.log(result);
			}
		}
	}

	findTypePrice();

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
					>
						{({ values, setFieldValue }) => (
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
												<Option value="">Giá mặc định hiện tại</Option>
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
						)}
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
