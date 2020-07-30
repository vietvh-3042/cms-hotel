import React from "react";
import PropTypes from "prop-types";
import { FastField, Form, Formik, Field } from "formik";
import { Modal } from "antd";
import Axios from "axios";
import InputField from "helpers/CustomFields/InputField";
import { toast } from "react-toastify";
import { API_Timeout, endpoint } from "settings";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import FooterForm from "components/utility/footerForm";

ModalUpdateGroup.propTypes = {
	handleUpdateType: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

ModalUpdateGroup.defaultProps = {
	handleUpdateType: null,
	handleSetStatus: null,
};

function ModalUpdateGroup(props) {
	const { visibleUpdateType, handleUpdateType, handleSetStatus } = props;
	const user = useSelector((state) => state.Auth.user);

	const initialValues = visibleUpdateType.detail;

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		const id = visibleUpdateType.detail.id;
		Axios({
			method: "PUT",
			url: endpoint + "/tenant/acl/groups/" + id,
			data: data,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
			},
		})
			.then((res) => {
				toast.success("Cập nhật thành công");
				handleUpdateType();
				handleSetStatus();
			})
			.catch((err) => {
				console.log(err.response);
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
			visible={visibleUpdateType.visible}
			onCancel={handleUpdateType}
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
						enableReinitialize
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
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ghi chú:</div>
									<Field
										as="textarea"
										name="note"
										rows="3"
										style={{ width: 166 }}
									/>
								</div>
								<FooterForm handleClick={handleUpdateType} update />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleUpdateType}
				/>
			</div>
		</Modal>
	);
}

export default ModalUpdateGroup;
