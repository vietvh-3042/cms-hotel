import { Modal } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import TextAreaField from "helpers/CustomFields/TextAreaField";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

ModalAddCategory.propTypes = {
	handleAddListCategory: PropTypes.func,
	handleSetStatus: PropTypes.func,
	listTypeCategory: PropTypes.array,
};

ModalAddCategory.defaultProps = {
	handleSetStatus: null,
	handleAddListCategory: null,
	listTypeCategory: [],
};

function ModalAddCategory(props) {
	const {
		visible,
		handleAddListCategory,
		handleSetStatus,
		listTypeCategory,
	} = props;

	const initialValues = {
		name: "",
		type_category_id: listTypeCategory.length > 0 ? listTypeCategory[0].id : "",
		note: "",
		status: 1,
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
		type_category_id: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data, { resetForm }) {
		CommonApi("POST", "/tenant/category/category", data).then((res) => {
			toast.success("Tạo mới thành công");
			handleAddListCategory();
			handleSetStatus();
			resetForm({});
		});
	}
	return (
		<Modal
			visible={visible}
			onCancel={handleAddListCategory}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={390}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm dịch vụ</span>
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

								<FastField
									name="note"
									component={TextAreaField}
									label="Ghi chú:"
									width={206}
								/>

								<FooterForm handleClick={handleAddListCategory} />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleAddListCategory}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddCategory;
