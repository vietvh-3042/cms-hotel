import { Modal } from "antd";
import Axios from "axios";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { endpoint } from "settings";
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
	const {
		visible,
		handleAddListService,
		handleSetStatus,
		listCategory,
	} = props;

	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	const initialValues = {
		name: "",
		category_id: "",
		price: "",
		note: "",
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
		category_id: Yup.string().required("Không được để trống."),
		price: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
	});

	function handleSubmit(data) {
		Axios({
			method: "POST",
			url: endpoint + "/tenant/service-storage/services",
			data: data,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
				"hotel-id": hotel_ID,
			},
		})
			.then((res) => {
				toast("Tạo mới thành công");
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
					<span>Thêm một dịch vụ mới</span>
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
									<Field as="select" style={{ width: 206, height: 30 }}>
										<option value="1">Chọn Nhóm Dịch Vụ</option>
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
									name="name"
									component={InputField}
									label="Giá bán:"
									width={200}
								/>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ghi chú:</div>
									<Field
										as="textarea"
										name="note"
										rows="3"
										style={{ width: 206 }}
									/>
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
