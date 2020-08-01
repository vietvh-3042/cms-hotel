import { Modal } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

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
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	const initialValues = visibleUpdateType.detail;

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		const id = visibleUpdateType.detail.id;
		CommonApi(
			"PUT",
			`/tenant/acl/groups/${id}`,
			user.meta.access_token,
			user.data.name,
			hotel_ID,
			data
		).then((res) => {
			toast.success("Cập nhật thành công");
			handleUpdateType();
			handleSetStatus();
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
