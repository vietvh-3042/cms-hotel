import { Modal } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

ModalUpdateClassify.propTypes = {
	handleAddClassify: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

ModalUpdateClassify.defaultProps = {
	handleAddClassify: null,
	handleSetStatus: null,
};

function ModalUpdateClassify(props) {
	const { visibleUpdateClassify, handleUpdateClassify, handleSetStatus } = props;

	const initialValues = visibleUpdateClassify.detail;

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data, { resetForm }) {
		const { id } = visibleUpdateClassify.detail;
		CommonApi("PUT", `/tenant/hotel-manager/classify/${id}`, data).then((res) => {
			toast.success("Cập nhật thành công");
			resetForm({});
			handleUpdateClassify({})();
			handleSetStatus();
		});
	}

	return (
		<Modal
			visible={visibleUpdateClassify.visible}
			onCancel={() => handleUpdateClassify({})}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={370}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Cập nhật Phân Loại Mới</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						enableReinitialize
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
									<Field as="textarea" name="note" rows="3" style={{ width: 166 }} />
								</div>
								<FooterForm
									handleClick={() => handleUpdateClassify({})}
									title="Cập nhật"
								/>
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={() => handleUpdateClassify({})}
				/>
			</div>
		</Modal>
	);
}

export default ModalUpdateClassify;
