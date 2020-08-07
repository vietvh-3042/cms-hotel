import { Modal } from "antd";
import { FastField, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import TextAreaField from "helpers/CustomFields/TextAreaField";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

ModalAddFloor.propTypes = {
	handleAddFloor: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

ModalAddFloor.defaultProps = {
	handleAddFloor: null,
	handleSetStatus: null,
};

function ModalAddFloor(props) {
	const { visible, handleAddFloor, handleSetStatus } = props;

	const initialValues = {
		name: "",
		number_room: "",
		note: "",
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
		number_room: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
	});

	function handleSubmit(data) {
		CommonApi("POST", "/tenant/hotel-manager/floor", {
			...data,
			show_diagram: 2,
		})
			.then((res) => {
				toast.success("Thêm mới thành công");
				handleAddFloor();
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
			onCancel={handleAddFloor}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={350}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm lầu mới</span>
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
									label="Tên tầng:"
									width={160}
								/>
								<FastField
									name="number_room"
									component={InputField}
									label="Số lượng phòng:"
									width={160}
								/>
								<FastField
									name="note"
									component={TextAreaField}
									label="Ghi chú:"
									width={166}
								/>
								<div
									className="flex items-center justify-end"
									style={{ marginRight: 45 }}
								>
									<button
										type="button"
										className="submit_cancel_Building focus:outline-none"
										onClick={handleAddFloor}
									>
										Cancel
									</button>
									<button type="submit" className="dashboardButton focus:outline-none">
										Thêm
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
					onClick={handleAddFloor}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddFloor;
