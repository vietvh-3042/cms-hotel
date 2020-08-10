import { Modal } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

ModalAddService.propTypes = {
	handleUpdateService: PropTypes.func,
	handleSetStatus: PropTypes.func,
	listCategory: PropTypes.array,
};
ModalAddService.defaultProps = {
	handleUpdateService: null,
	handleSetStatus: null,
	listCategory: [],
};

function ModalAddService(props) {
	const {
		visibleUpdate,
		handleUpdateService,
		handleSetStatus,
		listCategory,
	} = props;

	const initialValues = visibleUpdate.detail || "";

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
		category_id: Yup.string().required("Không được để trống."),
		price: Yup.number().typeError("Phải là số").required("Không được để trống."),
	});

	function handleSubmit(data, { resetForm }) {
		const { id } = visibleUpdate.detail;
		CommonApi("PUT", `/tenant/service-storage/services/${id}`, data).then(
			(res) => {
				toast.success("Cập nhật thành công");
				resetForm({});
				handleUpdateService({});
				handleSetStatus();
			}
		);
	}

	return (
		<Modal
			visible={visibleUpdate.visible}
			onCancel={() => handleUpdateService({})}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={400}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-update"></span>
					<span>Cập nhật dịch vụ dịch vụ</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						enableReinitialize
					>
						{({ errors, touched }) => (
							<Form>
								<FastField
									name="name"
									component={InputField}
									label="Tên dịch vụ:"
									width={200}
								/>
								<div className="flex mb-2">
									<div className="LabelCo">Nhóm Dịch vụ:</div>
									<Field
										as="select"
										name="category_id"
										style={{ width: 206, height: 30 }}
									>
										{listCategory.map((value) => (
											<option value={value.id} key={value.id}>
												{value.name}
											</option>
										))}
									</Field>
								</div>

								{errors.category_id && touched.category_id ? (
									<div className="flex items-center">
										<div className="LabelCo opacity-0">-----</div>
										<div className="custom-err-form">{errors.category_id}</div>
									</div>
								) : null}

								<FastField
									name="price"
									component={InputField}
									label="Giá bán:"
									width={200}
								/>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ghi chú:</div>
									<Field as="textarea" name="note" rows="3" style={{ width: 206 }} />
								</div>
								<FooterForm
									handleClick={() => handleUpdateService({})}
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
					onClick={() => handleUpdateService({})}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddService;
