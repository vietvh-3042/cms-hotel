import { Modal } from "antd";
import Axios from "axios";
import { FastField, Form, Formik } from "formik";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { endpoint } from "settings";
import * as Yup from "yup";

ModalAddTypeCategory.propTypes = {
	handleAddListTypeCategory: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

ModalAddTypeCategory.defaultProps = {
	handleAddListTypeCategory: null,
	handleSetStatus: null,
};

function ModalAddTypeCategory(props) {
	const { visible, handleAddListTypeCategory, handleSetStatus } = props;

	const user = useSelector((state) => state.Auth.user);

	const initialValues = {
		name: "",
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		Axios({
			method: "POST",
			url: endpoint + "/tenant/category/type-category",
			data: {
				...data,
				status: 1,
			},
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
			},
		})
			.then((res) => {
				toast.success("Thêm mới thành công");
				handleAddListTypeCategory();
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
			onCancel={handleAddListTypeCategory}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={350}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm loại danh mục</span>
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
									label="Tên loại:"
									width={160}
								/>
								<div
									className="flex items-center justify-end"
									style={{ marginRight: 45 }}
								>
									<button
										type="button"
										className="submit_cancel_Building focus:outline-none"
										onClick={handleAddListTypeCategory}
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
					onClick={handleAddListTypeCategory}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddTypeCategory;
