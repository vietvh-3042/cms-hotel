import { Modal, Switch } from "antd";
import Axios from "axios";
import { FastField, Form, Formik } from "formik";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { endpoint } from "settings";
import * as Yup from "yup";
import CommonApi from "helpers/APIS/CommonApi";
import FooterForm from "components/utility/footerForm";

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
		status: true,
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data, { resetForm }) {
		CommonApi("POST", "/tenant/category/type-category", {
			...data,
			status: data.status ? 1 : 2,
		})
			.then((res) => {
				toast.success("Thêm mới thành công");
				resetForm({});
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
								<FooterForm handleClick={handleAddListTypeCategory} />
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
