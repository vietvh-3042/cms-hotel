import { Modal } from "antd";
import Axios from "axios";
import FooterForm from "components/utility/footerForm";
import { FastField, FieldArray, Form, Formik } from "formik";
import { renderHour, renderPerson } from "helpers/Common/CommonRoom";
import FiledArrayCustom from "helpers/CustomFields/FiledArray";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { endpoint } from "settings";
import * as Yup from "yup";
import CommonApi from "helpers/APIS/CommonApi";

ModalAddListRoom.propTypes = {
	handleAddListRoom: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

ModalAddListRoom.defaultProps = {
	handleAddListRoom: null,
	handleSetStatus: null,
};

function ModalAddListRoom(props) {
	const { visible, handleAddListRoom, handleSetStatus } = props;
	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	const initialValues = {
		name: "",
		number_bed: "",
		number_person: "",
		price_day: "",
		price_night: "",
		price_by_hour: [{ time: "1", amount: "50000" }],
		additional_overtime_checkout_day: [{ time: "1", amount: "50000" }],
		additional_overtime_checkout_night: [{ time: "1", amount: "50000" }],
		additional_checkin_soon_day: [{ time: "1", amount: "50000" }],
		additional_checkin_soon_night: [{ time: "1", amount: "50000" }],
		additional_add_extrabed: [{ person: "1", amount: "50000" }],
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
		price_night: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
	});

	function handleSubmit(data, { resetForm }) {
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
		CommonApi("POST", "/tenant/hotel-manager/type-room", JSON.stringify(convert))
			.then((res) => {
				toast.success("Tạo mới thành công");
				handleAddListRoom();
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
			onCancel={handleAddListRoom}
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
					>
						{({ values }) => (
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
								<FooterForm handleClick={handleAddListRoom} />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleAddListRoom}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddListRoom;
