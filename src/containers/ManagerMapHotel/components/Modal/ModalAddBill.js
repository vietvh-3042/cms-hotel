import { Modal } from "antd";
import { FastField, Form, Formik } from "formik";
import InputField from "helpers/CustomFields/InputField";
import React from "react";
import * as Yup from "yup";

ModalAddBill.propTypes = {};

function ModalAddBill(props) {
	const { visible, handleAddService } = props;
	const initialValues = {};
	const validationSchema = Yup.object().shape({});

	function handleSubmit(data) {
		console.log(data);
	}
	return (
		<Modal
			visible={visible}
			onCancel={handleAddService}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={800}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm Hóa Đơn</span>
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
									label="Khách hàng:"
									width={200}
								/>
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleAddService}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddBill;
