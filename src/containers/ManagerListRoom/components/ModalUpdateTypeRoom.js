import { Modal } from "antd";
import Axios from "axios";
import { FastField, Field, FieldArray, Form, Formik } from "formik";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { API_Timeout, endpoint } from "settings";
import * as Yup from "yup";

ModalUpdateTypeRoom.propTypes = {
	handleUpdateTypeRoom: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

function ModalUpdateTypeRoom(props) {
	const priceHour = [];
	const checkout_day = [];
	const checkout_night = [];
	const soon_day = [];
	const soon_night = [];
	const extrabed = [];

	const { visibleUpdate, handleUpdateTypeRoom, handleSetStatus } = props;
	const [price_by_hour, setprice_by_hour] = useState([]);

	const [
		additional_overtime_checkout_day,
		setadditional_overtime_checkout_day,
	] = useState([]);

	const [
		additional_overtime_checkout_night,
		setadditional_overtime_checkout_night,
	] = useState([]);

	const [
		additional_checkin_soon_day,
		setadditional_checkin_soon_day,
	] = useState([]);

	const [
		additional_checkin_soon_night,
		setadditional_checkin_soon_night,
	] = useState([]);

	const [additional_add_extrabed, setadditional_add_extrabed] = useState([]);

	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	useEffect(() => {
		if (visibleUpdate.detail) {
			const data = visibleUpdate.detail;
			if (data.typePrices) {
				data.typePrices.data.map((value) => {
					value.priceTimes.data.map((val) => {
						if (val.group_price_time_id === 1) priceHour.push(val);
						if (val.group_price_time_id === 2) checkout_day.push(val);
						if (val.group_price_time_id === 4) checkout_night.push(val);
						if (val.group_price_time_id === 8) soon_day.push(val);
						if (val.group_price_time_id === 16) soon_night.push(val);
						if (val.group_price_time_id === 32) extrabed.push(val);
					});
				});
				setprice_by_hour(priceHour);
				setadditional_overtime_checkout_day(checkout_day);
				setadditional_overtime_checkout_night(checkout_night);
				setadditional_checkin_soon_day(soon_day);
				setadditional_checkin_soon_night(soon_night);
				setadditional_add_extrabed(extrabed);
			}
		}
	}, [visibleUpdate.detail]);

	const initialValues = {
		name: visibleUpdate.detail ? visibleUpdate.detail.name : "",
		number_bed: visibleUpdate.detail ? visibleUpdate.detail.number_bed : "",
		number_person: visibleUpdate.detail
			? visibleUpdate.detail.number_person
			: "",
		price_day: visibleUpdate.detail
			? visibleUpdate.detail.typePrices
				? visibleUpdate.detail.typePrices.data[0].price_day
				: ""
			: "",
		price_night: visibleUpdate.detail
			? visibleUpdate.detail.typePrices
				? visibleUpdate.detail.typePrices.data[0].price_night
				: ""
			: "",
		price_by_hour: price_by_hour,
		additional_overtime_checkout_day: additional_overtime_checkout_day,
		additional_overtime_checkout_night: additional_overtime_checkout_night,
		additional_checkin_soon_day: additional_checkin_soon_day,
		additional_checkin_soon_night: additional_checkin_soon_night,
		additional_add_extrabed: additional_add_extrabed,
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
		number_bed: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
		number_person: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
		price_day: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
	});

	function handleSubmit(data) {
		const id = visibleUpdate.detail.id;
		let convert = {
			...data,
			price_by_hour: JSON.stringify({
				type_id: 1,
				data: data.price_by_hour,
			}),
			additional_overtime_checkout_day: JSON.stringify({
				type_id: 2,
				data: data.additional_overtime_checkout_day,
			}),
			additional_overtime_checkout_night: JSON.stringify({
				type_id: 4,
				data: data.additional_overtime_checkout_night,
			}),
			additional_checkin_soon_day: JSON.stringify({
				type_id: 8,
				data: data.additional_checkin_soon_day,
			}),
			additional_checkin_soon_night: JSON.stringify({
				type_id: 16,
				data: data.additional_checkin_soon_night,
			}),
			additional_add_extrabed: JSON.stringify({
				type_id: 32,
				data: data.additional_add_extrabed,
			}),
			number_room_available: 1,
			position: 1,
		};

		Axios({
			method: "PUT",
			url: endpoint + "/tenant/hotel-manager/type-room/" + id,
			data: JSON.stringify(convert),
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
				"hotel-id": hotel_ID,
			},
		})
			.then((res) => {
				toast.success("Cập nhật thành công");
				handleUpdateTypeRoom();
				handleSetStatus();
			})
			.catch((err) => {
				console.log(err.response);
			});
	}

	function renderHour() {
		let data = [];
		for (let index = 1; index <= 24; index++) {
			data.push(index);
		}
		return data.map((value, index) => (
			<option value={value} key={index} className="focus:outline-none">
				{value}h
			</option>
		));
	}

	function renderPerson() {
		let data = [];
		for (let index = 1; index <= 10; index++) {
			data.push(index);
		}
		return data.map((value, index) => (
			<option value={value} key={index} className="focus:outline-none">
				{value} P
			</option>
		));
	}

	return (
		<Modal
			visible={visibleUpdate.visible}
			onCancel={() => handleUpdateTypeRoom({})}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={1001}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm loại phòng</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						enableReinitialize
					>
						{() => (
							<Form>
								<div className="flex">
									<div className="w-4/12">
										<FastField
											name="name"
											component={InputField}
											label="Loại phòng:"
											width={156}
										/>
										<FastField
											name="number_bed"
											component={InputField}
											label="Số giường:"
											width={156}
										/>
										<FastField
											name="number_person"
											component={InputField}
											label="Số người:"
											width={156}
										/>
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
										<FieldArray name="price_by_hour">
											{(fieldArrayProps) => {
												const { push, remove, form } = fieldArrayProps;
												const { price_by_hour } = form.values;
												return (
													<fieldset
														className="mb-3"
														style={{ border: "1px solid #d0d0d0" }}
													>
														<legend
															className="groupHour w-280 mx-auto"
															onClick={() => push({ time: 1, amount: "50000" })}
														>
															<div className="flex">
																<img
																	src="/images/Common/add16.png"
																	alt="add"
																	className="mr-2"
																/>
																<span>Giá bán theo Giờ - Click để thêm</span>
															</div>
														</legend>
														{price_by_hour.map((value, index) => (
															<div
																className="flex justify-center items-center mb-2"
																key={index}
															>
																<span className="mr-2">Quá</span>
																<Field
																	as="select"
																	name={`price_by_hour.${index}.time`}
																	style={{ width: 50 }}
																	className="focus:outline-none"
																>
																	{renderHour()}
																</Field>

																<span className="mx-1">:</span>
																<Field
																	name={`price_by_hour.${index}.amount`}
																	type="text"
																	className="focus:outline-none font-extrabold"
																	style={{ width: 150 }}
																/>
																<img
																	src="/images/Common/cancel20.png"
																	alt="add"
																	className="ml-1"
																	onClick={() => remove(index)}
																/>
															</div>
														))}
													</fieldset>
												);
											}}
										</FieldArray>
									</div>

									<div className="w-4/12 mr-3">
										<FieldArray name="additional_overtime_checkout_day">
											{(fieldArrayProps) => {
												const { push, remove, form } = fieldArrayProps;
												const {
													additional_overtime_checkout_day,
												} = form.values;
												return (
													<fieldset
														className="mb-3"
														style={{ border: "1px solid #d0d0d0" }}
													>
														<legend
															className="groupHour w-280 mx-auto"
															onClick={() => push({ time: 1, amount: "50000" })}
														>
															<div className="flex">
																<img
																	src="/images/Common/add16.png"
																	alt="add"
																	className="mr-2"
																/>
																<span>
																	Phụ trội quá giờ Checkout (Theo ngày)
																</span>
															</div>
														</legend>
														{additional_overtime_checkout_day.map(
															(value, index) => (
																<div
																	className="flex justify-center items-center mb-2"
																	key={index}
																>
																	<span className="mr-2">Quá</span>
																	<Field
																		as="select"
																		name={`additional_overtime_checkout_day.${index}.time`}
																		style={{ width: 50 }}
																		value={value.time}
																		className="focus:outline-none"
																	>
																		{renderHour()}
																	</Field>

																	<span className="mx-1">:</span>
																	<Field
																		name={`additional_overtime_checkout_day.${index}.amount`}
																		type="text"
																		className="focus:outline-none font-extrabold"
																		style={{ width: 150 }}
																	/>
																	<img
																		src="/images/Common/cancel20.png"
																		alt="add"
																		className="ml-1"
																		onClick={() => remove(index)}
																	/>
																</div>
															)
														)}
													</fieldset>
												);
											}}
										</FieldArray>

										<FieldArray name="additional_overtime_checkout_night">
											{(fieldArrayProps) => {
												const { push, remove, form } = fieldArrayProps;
												const {
													additional_overtime_checkout_night,
												} = form.values;
												return (
													<fieldset
														className="mb-3"
														style={{ border: "1px solid #d0d0d0" }}
													>
														<legend
															className="groupHour w-280 mx-auto"
															onClick={() => push({ time: 1, amount: "50000" })}
														>
															<div className="flex">
																<img
																	src="/images/Common/add16.png"
																	alt="add"
																	className="mr-2"
																/>
																<span>
																	Phụ trội quá giờ Checkout (Theo ngày)
																</span>
															</div>
														</legend>
														{additional_overtime_checkout_night.map(
															(value, index) => (
																<div
																	className="flex justify-center items-center mb-2"
																	key={index}
																>
																	<span className="mr-2">Quá</span>
																	<Field
																		as="select"
																		name={`additional_overtime_checkout_night.${index}.time`}
																		style={{ width: 50 }}
																		className="focus:outline-none"
																	>
																		{renderHour()}
																	</Field>

																	<span className="mx-1">:</span>
																	<Field
																		name={`additional_overtime_checkout_night.${index}.amount`}
																		type="text"
																		className="focus:outline-none font-extrabold"
																		style={{ width: 150 }}
																	/>
																	<img
																		src="/images/Common/cancel20.png"
																		alt="add"
																		className="ml-1"
																		onClick={() => remove(index)}
																	/>
																</div>
															)
														)}
													</fieldset>
												);
											}}
										</FieldArray>
									</div>

									<div className="w-4/12">
										<FieldArray name="additional_checkin_soon_day">
											{(fieldArrayProps) => {
												const { push, remove, form } = fieldArrayProps;
												const { additional_checkin_soon_day } = form.values;
												return (
													<fieldset
														className="mb-3"
														style={{ border: "1px solid #d0d0d0" }}
													>
														<legend
															className="groupHour w-280 mx-auto"
															onClick={() => push({ time: 1, amount: "50000" })}
														>
															<div className="flex">
																<img
																	src="/images/Common/add16.png"
																	alt="add"
																	className="mr-2"
																/>
																<span>
																	Phụ trội quá giờ Checkout (Theo ngày)
																</span>
															</div>
														</legend>
														{additional_checkin_soon_day.map((value, index) => (
															<div
																className="flex justify-center items-center mb-2"
																key={index}
															>
																<span className="mr-2">Quá</span>
																<Field
																	as="select"
																	name={`additional_checkin_soon_day.${index}.time`}
																	style={{ width: 50 }}
																	className="focus:outline-none"
																>
																	{renderHour()}
																</Field>

																<span className="mx-1">:</span>
																<Field
																	name={`additional_checkin_soon_day.${index}.amount`}
																	type="text"
																	className="focus:outline-none font-extrabold"
																	style={{ width: 150 }}
																/>
																<img
																	src="/images/Common/cancel20.png"
																	alt="add"
																	className="ml-1"
																	onClick={() => remove(index)}
																/>
															</div>
														))}
													</fieldset>
												);
											}}
										</FieldArray>

										<FieldArray name="additional_checkin_soon_night">
											{(fieldArrayProps) => {
												const { push, remove, form } = fieldArrayProps;
												const { additional_checkin_soon_night } = form.values;
												return (
													<fieldset
														className="mb-3"
														style={{ border: "1px solid #d0d0d0" }}
													>
														<legend
															className="groupHour w-280 mx-auto"
															onClick={() => push({ time: 1, amount: "50000" })}
														>
															<div className="flex">
																<img
																	src="/images/Common/add16.png"
																	alt="add"
																	className="mr-2"
																/>
																<span>
																	Phụ trội quá giờ Checkout (Theo ngày)
																</span>
															</div>
														</legend>
														{additional_checkin_soon_night.map(
															(value, index) => (
																<div
																	className="flex justify-center items-center mb-2"
																	key={index}
																>
																	<span className="mr-2">Quá</span>
																	<Field
																		as="select"
																		name={`additional_checkin_soon_night.${index}.time`}
																		style={{ width: 50 }}
																		className="focus:outline-none"
																	>
																		{renderHour()}
																	</Field>

																	<span className="mx-1">:</span>
																	<Field
																		name={`additional_checkin_soon_night.${index}.amount`}
																		type="text"
																		className="focus:outline-none font-extrabold"
																		style={{ width: 150 }}
																	/>
																	<img
																		src="/images/Common/cancel20.png"
																		alt="add"
																		className="ml-1"
																		onClick={() => remove(index)}
																	/>
																</div>
															)
														)}
													</fieldset>
												);
											}}
										</FieldArray>

										<FieldArray name="additional_add_extrabed">
											{(fieldArrayProps) => {
												const { push, remove, form } = fieldArrayProps;
												const { additional_add_extrabed } = form.values;
												return (
													<fieldset
														className="mb-3"
														style={{ border: "1px solid #d0d0d0" }}
													>
														<legend
															className="groupHour w-280 mx-auto"
															onClick={() => push({ time: 1, amount: "50000" })}
														>
															<div className="flex">
																<img
																	src="/images/Common/add16.png"
																	alt="add"
																	className="mr-2"
																/>
																<span>Phụ trội thêm khách - Extra Bed</span>
															</div>
														</legend>
														{additional_add_extrabed.map((value, index) => (
															<div
																className="flex justify-center items-center mb-2"
																key={index}
															>
																<span className="mr-2">Quá</span>
																<Field
																	as="select"
																	name={`additional_add_extrabed.${index}.time`}
																	style={{ width: 50 }}
																	className="focus:outline-none"
																>
																	{renderPerson()}
																</Field>

																<span className="mx-1">:</span>
																<Field
																	name={`additional_add_extrabed.${index}.amount`}
																	type="text"
																	className="focus:outline-none font-extrabold"
																	style={{ width: 150 }}
																/>
																<img
																	src="/images/Common/cancel20.png"
																	alt="add"
																	className="ml-1"
																	onClick={() => remove(index)}
																/>
															</div>
														))}
													</fieldset>
												);
											}}
										</FieldArray>
									</div>
								</div>

								<div
									className="flex items-center justify-end"
									style={{ marginRight: 45 }}
								>
									<button
										type="button"
										className="submit_cancel_Building focus:outline-none"
										onClick={() => handleUpdateTypeRoom({})}
									>
										Cancel
									</button>
									<button
										type="submit"
										className="dashboardButton focus:outline-none"
									>
										Sửa
									</button>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={() => handleUpdateTypeRoom({})}
				/>
			</div>
		</Modal>
	);
}

export default ModalUpdateTypeRoom;
