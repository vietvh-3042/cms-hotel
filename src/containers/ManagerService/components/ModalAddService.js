import { Modal } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { API_Timeout, endpoint } from "settings";
import Axios from "axios";
import { FastField, Form, Formik, Field } from "formik";
import InputField from "helpers/CustomFields/InputField";
import TextAreaField from "helpers/CustomFields/TextAreaField";

ModalAddService.propTypes = {
	handleAddListService: PropTypes.func,
};
ModalAddService.defaultProps = {
	handleAddListService: null,
};

function ModalAddService(props) {
	const { visible, handleAddListService } = props;

	function handleSubmit(data) {}

	return (
		<Modal
			visible={visible}
			onCancel={handleAddListService}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={400}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-update"></span>
					<span>Thêm một dịch vụ mới</span>
				</div>
				<div className="modal_content">
					<Formik onSubmit={handleSubmit}>
						{() => (
							<Form>
								<FastField
									name="name"
									component={InputField}
									label="Tên dịch vụ:"
									width={200}
								/>
								<div className="flex mb-2">
									<div className="LabelCo">Nhóm Dịch vụ:</div>
									<Field as="select" style={{ width: 206, height: 30 }}>
										<option value="1">Chọn Nhóm Dịch Vụ</option>
										<option value="2">Đồ Uống</option>
										<option value="3">Đồ Ăn</option>
									</Field>
								</div>
								<FastField
									name="name"
									component={InputField}
									label="Giá bán:"
									width={200}
								/>
								<FastField
									name="note"
									component={TextAreaField}
									label="Ghi chú:"
									width={206}
								/>
								<div
									className="flex items-center justify-end"
									style={{ marginRight: 45 }}
								>
									<button
										type="button"
										className="submit_cancel_Building focus:outline-none"
										onClick={handleAddListService}
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
					onClick={handleAddListService}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddService;
