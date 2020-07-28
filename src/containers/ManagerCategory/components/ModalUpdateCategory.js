import { Modal } from "antd";
import Axios from "axios";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { endpoint } from "settings";
import * as Yup from "yup";

ModalAddCategory.propTypes = {
	handleUpdateCategory: PropTypes.func,
	handleSetStatus: PropTypes.func,
	listTypeCategory: PropTypes.array,
};

ModalAddCategory.defaultProps = {
	handleSetStatus: null,
	handleUpdateCategory: null,
	listTypeCategory: [],
};

function ModalAddCategory(props) {
	const {
		visibleUpdateCategory,
		handleUpdateCategory,
		handleSetStatus,
		listTypeCategory,
	} = props;

	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	const initialValues = visibleUpdateCategory.detail;

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		const id = visibleUpdateCategory.detail.id;
		Axios({
			method: "PUT",
			url: endpoint + "/tenant/category/category/" + id,
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
				toast.success("Cập nhật thành công");
				handleUpdateCategory();
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
			visible={visibleUpdateCategory.visible}
			onCancel={handleUpdateCategory}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={390}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm nhóm dịch vụ</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ errors, touched }) => (
							<Form>
								<FastField
									name="name"
									component={InputField}
									label="Tên:"
									width={200}
								/>

								<div className="flex mb-1 items-center">
									<div className="LabelCo">Loại dịch vụ:</div>
									<Field
										as="select"
										name="type_category_id"
										style={{ width: 206, height: 30 }}
									>
										{listTypeCategory.map((value) => (
											<option value={value.id} key={value.id}>
												{value.name}
											</option>
										))}
									</Field>
								</div>

								{errors.type_category_id && touched.type_category_id ? (
									<div className="flex items-center">
										<div className="LabelCo opacity-0">-----</div>
										<div className="custom-err-form">
											{errors.type_category_id}
										</div>
									</div>
								) : null}

								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ghi chú:</div>
									<Field
										as="textarea"
										name="note"
										rows="3"
										style={{ width: 206 }}
									/>
								</div>
								<FooterForm handleClick={handleUpdateCategory} update />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleUpdateCategory}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddCategory;
