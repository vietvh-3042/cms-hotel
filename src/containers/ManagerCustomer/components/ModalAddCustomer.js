import { DatePicker, Modal, Select } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import moment from "moment";
import { toast } from "react-toastify";

const { Option } = Select;

const date = new Date();

ModalAddEmployee.propTypes = {
	handleAddListCustomer: PropTypes.func,
	handleSetStatus: PropTypes.func,
	listGroup: PropTypes.array,
};

ModalAddEmployee.defaultProps = {
	handleAddListCustomer: null,
	handleSetStatus: null,
	listGroup: [],
};

function ModalAddEmployee(props) {
	const { visible, handleAddListCustomer, handleSetStatus, listGroup } = props;

	const [listNational, setListNational] = useState([]);

	// find id national
	const find = listNational.find((x) => x.nation_code === "VN");

	useEffect(() => {
		async function getNational() {
			CommonApi("GET", "/tenant/nation-manager/nations", null).then((res) =>
				setListNational(res.data.data)
			);
		}
		getNational();
	}, []);

	const initialValues = {
		name: "",
		identity_date: moment(date).format("DD/MM/YYYY"),
		identity_code: "",
		address: "",
		nation_id: find ? find.id : "",
	};

	const validationSchema = Yup.object().shape({
		name: Yup.string().required("Không được để trống."),
		identity_code: Yup.number()
			.typeError("Phải là số")
			.required("Không được để trống."),
	});

	function handleSubmit(data) {
		let body = {
			formParamsCustomers: JSON.stringify([
				{
					identity_code: data.identity_code,
					identity_date: data.identity_date,
					name: data.name,
					address: data.address,
					nation_id: data.nation_id,
				},
			]),
		};
		CommonApi("POST", "/tenant/customer-manager/customer", body)
			.then((res) => {
				toast.success("Tạo mới thành công");
				handleAddListCustomer();
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
			onCancel={() => handleAddListCustomer({})}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={390}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm khách hàng</span>
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
									label="Tên:"
									width={200}
								/>

								<FastField
									name="identity_code"
									component={InputField}
									label="CMND:"
									width={200}
								/>

								<FastField
									name="address"
									component={InputField}
									label="Địa chỉ:"
									width={200}
								/>

								<div className="flex mb-1 items-center">
									<div className="LabelCo">Quốc tịch:</div>
									<Select
										name="nation_id"
										showSearch
										value={values.nation_id}
										filterOption={(input, option) =>
											option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
										}
										style={{ width: 206, height: 30 }}
										onChange={(newValue) => setFieldValue("nation_id", newValue)}
									>
										{listNational.map((value) => (
											<Option value={value.id} key={value.id}>
												{value.name}
											</Option>
										))}
									</Select>
								</div>

								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ngày cấp:</div>
									<DatePicker
										name="identity_date"
										defaultValue={moment(date)}
										format="DD/MM/YYYY"
										style={{ width: 206 }}
										onChange={(date, dateString) =>
											setFieldValue("identity_date", dateString)
										}
									/>
								</div>
								<FooterForm handleClick={() => handleAddListCustomer({})} />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={() => handleAddListCustomer({})}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddEmployee;
