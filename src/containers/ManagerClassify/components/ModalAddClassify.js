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

	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	const initialValues = {
		name: "",
		color_code: "#000001",
		description: "",
		note: "",
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		CommonApi(
			"POST",
			"/tenant/hotel-manager/classify",
			user.meta.access_token,
			user.data.name,
			hotel_ID,
			data
		).then((res) => {
			toast.success("Tạo mới thành công");
			handleAddClassify();
			handleSetStatus();
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
									<Field
										as="textarea"
										name="note"
										rows="3"
										style={{ width: 166 }}
									/>
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
