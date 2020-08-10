import { Modal } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

ModalAddClassify.propTypes = {
	handleAddClassify: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

ModalAddClassify.defaultProps = {
	handleAddClassify: null,
	handleSetStatus: null,
};

function ModalAddClassify(props) {
	const { visible, handleAddClassify, handleSetStatus } = props;

	const initialValues = {
		name: "",
		color_code: "#000001",
		description: "",
		note: "",
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data, { resetForm }) {
		CommonApi("POST", "/tenant/hotel-manager/classify", data)
			.then((res) => {
				toast.success("Tạo mới thành công");
				resetForm({});
				handleAddClassify();
				handleSetStatus();
			})
			.catch((err) => {
				let error = [];
				for (let value of Object.values(err.response.data.errors)) {
					error.push(value);

					toast.error(
						<React.Fragment>
							{error.map((value, key) => (
								<div key={key}>{value}</div>
							))}
						</React.Fragment>
					);
				}
			});
	}

	return (
		<Modal
			visible={visible}
			onCancel={handleAddClassify}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={370}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Tạo Phân Loại Mới</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
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
								<FooterForm handleClick={handleAddClassify} />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleAddClassify}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddClassify;
