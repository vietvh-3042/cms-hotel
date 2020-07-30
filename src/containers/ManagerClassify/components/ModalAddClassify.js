import { Modal } from "antd";
import Axios from "axios";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { endpoint } from "settings";
import * as Yup from "yup";
import { toast } from "react-toastify";

ModalAddClassify.propTypes = {
	handleAddClassify: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

ModalAddClassify.defaultProps = {
	handleAddClassify: null,
	handleSetStatus: null,
};

function ModalAddClassify(props) {
	const { visible, handleAddClassify, handleSetStatus } = props;

	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	const initialValues = {
		name: "",
		color_code: "#000001",
		description: "",
		note: "",
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		Axios({
			method: "POST",
			url: endpoint + "/tenant/hotel-manager/classify",
			data: data,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
				"hotel-id": hotel_ID,
			},
		})
			.then((res) => {
				toast.success("Tạo mới thành công");
				handleAddClassify();
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
			onCancel={handleAddClassify}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={370}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Tạo Phân Loại Mới</span>
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
									label="Phân loại:"
									width={160}
								/>
								<FastField
									name="description"
									component={InputField}
									label="Mô tả:"
									width={160}
								/>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ghi chú:</div>
									<Field
										as="textarea"
										name="note"
										rows="3"
										style={{ width: 166 }}
									/>
								</div>
								<FooterForm handleClick={handleAddClassify} />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleAddClassify}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddClassify;
