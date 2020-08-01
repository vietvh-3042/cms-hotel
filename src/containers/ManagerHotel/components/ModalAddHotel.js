import { Modal } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import TextAreaField from "helpers/CustomFields/TextAreaField";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { checkFlagHotel } from "redux/actions/app";
import * as Yup from "yup";

ModalAddHotel.propTypes = {
	handleAddHotel: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

function ModalAddHotel(props) {
	const dispatch = useDispatch();
	const { visible, handleAddHotel, handleSetStatus } = props;

	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	const initialValues = {
		name: "",
		total_floor: "",
		total_room: "",
		address: "",
		province: "",
		phone: "",
		email: "",
		website: "",
		note: "",
	};

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
		CommonApi(
			"POST",
			"/tenant/hotel-manager/hotel",
			user.meta.access_token,
			user.data.name,
			hotel_ID,
			data
		).then((res) => {
			toast.success("Tạo mới thành công");
			dispatch(checkFlagHotel());
			handleAddHotel();
			handleSetStatus();
		});
	}

	return (
		<Modal
			visible={visible}
			onCancel={handleAddHotel}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={425}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm khách sạn</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
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
								<FooterForm handleClick={handleAddHotel} />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleAddHotel}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddHotel;
