import { Modal } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

ModalUpdateTypeCategory.propTypes = {
	handleUpdateType: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

ModalUpdateTypeCategory.defaultProps = {
	handleUpdateType: null,
	handleSetStatus: null,
};

function ModalUpdateTypeCategory(props) {
	const { visibleUpdateType, handleUpdateType, handleSetStatus } = props;

	const initialValues = visibleUpdateType.detail || "";

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		const id = visibleUpdateType.detail.id;
		CommonApi("PUT", `/tenant/category/type-category/${id}`, {
			...data,
			status: 1,
		}).then((res) => {
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
								<FooterForm handleClick={handleUpdateType} title="Cập nhật" />
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

export default ModalUpdateTypeCategory;
