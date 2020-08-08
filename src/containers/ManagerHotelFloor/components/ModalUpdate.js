import { Modal } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import TextAreaField from "helpers/CustomFields/TextAreaField";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

ModalUpdate.propTypes = {
	handleUpdateFloor: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

function ModalUpdate(props) {
	const { visibleUpdate, handleUpdateFloor, handleSetStatus } = props;

	const initialValues = visibleUpdate.detail || "";

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		const { id } = visibleUpdate.detail;
		CommonApi("PUT", `/tenant/hotel-manager/floor/${id}`, data)
			.then((res) => {
				toast.success("Cập nhật thành công");
				handleUpdateFloor({});
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
			onCancel={() => handleUpdateFloor()}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={350}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Chỉnh sửa tầng lầu</span>
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
									label="Tên tầng:"
									width={160}
								/>
								<FastField
									name="note"
									component={TextAreaField}
									label="Ghi chú:"
									width={166}
								/>
								<FooterForm handleClick={() => handleUpdateFloor()} title="Cập nhật" />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={() => handleUpdateFloor()}
				/>
			</div>
		</Modal>
	);
}

export default ModalUpdate;
