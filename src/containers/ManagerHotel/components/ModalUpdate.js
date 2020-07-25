import { Modal } from "antd";
import Axios from "axios";
import { FastField, Form, Formik } from "formik";
import InputField from "helpers/CustomFields/InputField";
import TextAreaField from "helpers/CustomFields/TextAreaField";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { API_Timeout, endpoint } from "settings";
import * as Yup from "yup";

ModalUpdate.propTypes = {
	handleUpdateHotel: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

function ModalUpdate(props) {
	const { visibleUpdate, handleUpdateHotel, handleSetStatus } = props;

	const initialValues = visibleUpdate.detail;

	const user = useSelector((state) => state.Auth.user);

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
		total_floor: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
		total_room: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
		address: Yup.string().required("Không được để trống."),
		province: Yup.string().required("Không được để trống."),
		phone: Yup.string().required("Không được để trống."),
		email: Yup.string()
			.email("Email không đúng định dạng")
			.required("Không được để trống."),
		website: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		const id = visibleUpdate.detail.id;
		Axios({
			method: "PUT",
			url: endpoint + "/tenant/hotel-manager/hotel/" + id,
			data: data,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
			},
			timeout: API_Timeout,
		})
			.then((res) => {
				toast.success("Cập nhật thành công");
				handleUpdateHotel();
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
			visible={visibleUpdate.visible}
			onCancel={handleUpdateHotel}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={425}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Chỉnh sửa thông tin</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						enableReinitialize
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{() => (
							<Form>
								<FastField
									name="name"
									component={InputField}
									label="Tên khách sạn:"
								/>
								<FastField
									name="total_floor"
									component={InputField}
									label="Số lầu:"
								/>
								<FastField
									name="total_room"
									component={InputField}
									label="Số phòng:"
								/>
								<FastField
									name="address"
									component={InputField}
									label="Địa chỉ:"
								/>
								<FastField
									name="province"
									component={InputField}
									label="Thành phố:"
								/>
								<FastField name="phone" component={InputField} label="Phone:" />
								<FastField name="email" component={InputField} label="Email:" />
								<FastField
									name="website"
									component={InputField}
									label="Website:"
								/>
								<FastField
									name="note"
									component={TextAreaField}
									label="Ghi chú:"
								/>
								<div
									className="flex items-center justify-end"
									style={{ marginRight: 45 }}
								>
									<button
										type="button"
										className="submit_cancel_Building focus:outline-none"
										onClick={handleUpdateHotel}
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
					onClick={handleUpdateHotel}
				/>
			</div>
		</Modal>
	);
}

export default ModalUpdate;
