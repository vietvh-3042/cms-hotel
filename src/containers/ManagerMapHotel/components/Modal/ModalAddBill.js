import { Modal } from "antd";
import React from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { FastField, Form, Formik, Field } from "formik";
import InputField from "helpers/CustomFields/InputField";

ModalAddBill.propTypes = {
	handleAddBill: PropTypes.func,
};

ModalAddBill.defaultProps = {
	handleAddBill: null,
};

function ModalAddBill(props) {
	const { visible, handleAddBill } = props;
	const initialValues = {
		toggle: false,
	};
	const validationSchema = Yup.object().shape({});

	function handleSubmit(data) {
		console.log(data);
	}
	return (
		<Modal
			visible={visible}
			onCancel={handleAddBill}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={390}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm Phiếu Chi Phí</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ values }) => (
							<Form>
								<FastField
									name="name"
									component={InputField}
									label="Diễn giải chi phí:"
									width={200}
								/>
								<FastField
									name="name"
									component={InputField}
									label="Số tiền:"
									width={200}
								/>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Loại chi phí:</div>
									<Field as="select" style={{ width: 206, height: 30 }}>
										<option value="1">Chọn loại chi phí</option>
										<option value="2">Đồ Dùng</option>
										<option value="3">Điện Nước</option>
									</Field>
								</div>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Chi tiết:</div>
									<Field as="select" style={{ width: 206, height: 30 }}>
										<option value="1">Tiền Mặt</option>
										<option value="2">Chuyển Khoản</option>
										<option value="3">Thẻ Tín Dụng</option>
									</Field>
								</div>
								<FastField
									name="name"
									component={InputField}
									label="Người nhận:"
									width={200}
								/>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Trạng thái:</div>
									<Field type="checkbox" name="toggle" />
									<span>Đã thanh toán</span>
								</div>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ghi chú:</div>
									<Field
										as="textarea"
										name="123"
										rows="3"
										style={{ width: 206 }}
									/>
								</div>
								<div
									className="flex items-center justify-end"
									style={{ marginRight: 45 }}
								>
									<button
										type="button"
										className="submit_cancel_Building focus:outline-none"
										onClick={handleAddBill}
									>
										Cancel
									</button>
									<button
										type="submit"
										className="dashboardButton focus:outline-none"
									>
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
					onClick={handleAddBill}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddBill;
