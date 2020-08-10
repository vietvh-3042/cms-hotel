import { Select, Table, Popconfirm } from "antd";
import { FastField, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";

const { Option } = Select;

CheckinCustomer.propTypes = {
	getCustomer: PropTypes.func,
};

CheckinCustomer.defaultProps = {
	getCustomer: null,
};

function CheckinCustomer(props) {
	let allCustomer = [];

	const { getCustomer, check } = props;
	const [listCustomer, setLisCustomer] = useState([]);

	const [listNational, setListNational] = useState([]);

	// find id national
	const find = listNational.find((x) => x.nation_code === "VN");

	const initialValues = {
		//customer
		name: "",
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

	function handleAddCustomer(data, { resetForm }) {
		setLisCustomer(
			listCustomer.concat({
				...data,
			})
		);
		resetForm({
			name: "",
			identity_code: "",
			address: "",
			nation_id: find ? find.id : "",
		});
	}

	function confirm(id) {
		const result = allCustomer.find((x) => x.STT === id);
		allCustomer.splice(result, 1);
		setLisCustomer([...allCustomer]);
	}

	function handleReset(setFieldValue) {
		setFieldValue("name", "");
		setFieldValue("identity_code", "");
		setFieldValue("address", "");
	}

	useEffect(() => {
		async function getNational() {
			CommonApi("GET", "/tenant/nation-manager/nations", null).then((res) =>
				setListNational(res.data.data)
			);
		}
		getNational();
	}, []);

	useEffect(() => {
		setLisCustomer([]);
	}, [check]);

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Họ tên", dataIndex: "name", key: "name" },
		{ title: "CMND/Passport", dataIndex: "identity_code", key: "identity_code" },
		{ title: "Địa chỉ", dataIndex: "address", key: "address" },
		{
			title: "Quốc tịch",
			render: (record) => {
				for (var i = 0; i < listNational.length; i++) {
					if (listNational[i].id === record.nation_id) {
						return listNational[i].name;
					}
				}
			},
		},

		{
			title: "Thao tác",
			render: (record) => (
				<Popconfirm
					title="Bạn thực sự muốn xóa bản ghi này?"
					onConfirm={() => confirm(record.STT)}
					okText="Yes"
					cancelText="No"
					placement="topRight"
				>
					<img
						src="/images/Actions/Delete.png"
						alt="Delete"
						className="cursor-pointer"
					/>
				</Popconfirm>
			),
		},
	];

	listCustomer &&
		listCustomer.length > 0 &&
		listCustomer.forEach((infor, index) => {
			allCustomer.push({
				...infor,
				STT: index + 1,
			});
		});

	getCustomer(listCustomer);

	return (
		<React.Fragment>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={handleAddCustomer}
				enableReinitialize
			>
				{({ values, setFieldValue }) => (
					<Form name="formCustomer">
						<div className="grid grid-cols-2">
							<FastField
								name="identity_code"
								component={InputField}
								label="CMND/Passport:"
								width={190}
							/>
							<FastField
								name="name"
								component={InputField}
								label="Tên khách hàng:"
								width={190}
								placeholder="Khách Lẻ"
							/>
							<FastField
								name="address"
								component={InputField}
								label="Địa chỉ:"
								width={190}
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
									style={{ width: 196, height: 30 }}
									onChange={(newValue) => setFieldValue("nation_id", newValue)}
								>
									{listNational.map((value) => (
										<Option value={value.id} key={value.id}>
											{value.name}
										</Option>
									))}
								</Select>
							</div>
						</div>
						<div className="mt-2 flex items-center ml-40">
							<button
								className="submit_cancel_Building focus:outline-none"
								onClick={() => handleReset(setFieldValue)}
							>
								Reset
							</button>
							<button type="submit" className="dashboardButton focus:outline-none">
								Thêm
							</button>
						</div>
					</Form>
				)}
			</Formik>
			<Table
				rowKey={(record) => record.STT}
				dataSource={allCustomer}
				columns={columns}
				bordered
				scroll={{ x: true }}
				className="mt-3 custom-table"
			/>
		</React.Fragment>
	);
}

export default CheckinCustomer;
