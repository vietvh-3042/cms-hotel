import { Modal, Switch } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

ModalUpdatePaymentMethod.propTypes = {
	handleUpdateType: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

ModalUpdatePaymentMethod.defaultProps = {
	handleUpdateType: null,
	handleSetStatus: null,
};

function ModalUpdatePaymentMethod(props) {
	const { visibleUpdateType, handleUpdateType, handleSetStatus } = props;

	const initialValues = {
		...visibleUpdateType.detail,
		status: visibleUpdateType.detail.status === 1 ? true : false,
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		const id = visibleUpdateType.detail.id;
		CommonApi("PUT", `/tenant/payslip-receipt/payment-method/${id}`, {
			name: data.name,
			status: data.status ? 1 : 2,
		}).then((res) => {
			toast.success("Thêm mới thành công");
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
					<span>Chỉnh sửa phương thức thanh toán</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						enableReinitialize
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
					>
						{({ values, setFieldValue }) => (
							<Form>
								<FastField
									name="name"
									component={InputField}
									label="Tên loại:"
									width={160}
								/>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Status:</div>
									<Switch
										defaultChecked={values.status ? true : false}
										checkedChildren="Active"
										unCheckedChildren="UnActive"
										onChange={(checked) => setFieldValue("status", checked)}
									/>
								</div>

								<FooterForm handleClick={handleUpdateType} title="Sửa" />
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

export default ModalUpdatePaymentMethod;
