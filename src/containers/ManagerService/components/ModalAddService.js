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
	handleAddListService: PropTypes.func,
	handleSetStatus: PropTypes.func,
	listCategory: PropTypes.array,
};
ModalAddService.defaultProps = {
	handleAddListService: null,
	handleSetStatus: null,
	listCategory: [],
};

function ModalAddService(props) {
	const { visible, handleAddListService, handleSetStatus, listCategory } = props;

	const initialValues = {
		name: "",
		category_id: listCategory.length > 0 ? listCategory[0].id : "",
		price: "",
		note: "",
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
		category_id: Yup.string().required("Không được để trống."),
		price: Yup.number().typeError("Phải là số").required("Không được để trống."),
	});

	function handleSubmit(data, { resetForm }) {
		CommonApi("POST", "/tenant/service-storage/services", data)
			.then((res) => {
				toast.success("Tạo mới thành công");
				resetForm({});
				handleAddListService();
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
			onCancel={handleAddListService}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={400}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-update"></span>
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
								<FooterForm handleClick={handleAddListService} />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleAddListService}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddService;
