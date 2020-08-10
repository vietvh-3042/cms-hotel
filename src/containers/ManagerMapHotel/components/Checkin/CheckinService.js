import React, { useEffect, useState } from "react";
import { FastField, Form, Formik, Field } from "formik";
import { renderQuantity } from "helpers/Common/CommonRoom";
import { Table, Popconfirm } from "antd";
import CommonApi from "helpers/APIS/CommonApi";
import PropTypes from "prop-types";

CheckinService.propTypes = {
	getService: PropTypes.func,
};

CheckinService.defaultProps = {
	getService: null,
};

function CheckinService(props) {
	const { getService, check } = props;

	let allService = [];

	const [listService, setListService] = useState([]);

	const [listUserService, setListUserService] = useState([]);

	const initialValues = {
		service_id: listService.length > 0 ? listService[0].id : "",
		quantity: 1,
	};

	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	useEffect(() => {
		CommonApi("GET", "/tenant/service-storage/services", null).then((res) =>
			setListService(res.data.data)
		);
	}, []);

	useEffect(() => {
		setListUserService([]);
	}, [check]);

	function handleAddService(data) {
		const find = listService.find((x) => x.id === data.service_id);
		setListUserService(
			listUserService.concat({
				service_id: find.id,
				name: find.name,
				quantity: data.quantity,
				amount: data.quantity * find.price,
				price: find.price,
			})
		);
	}

	function confirm(id) {
		const result = allService.find((x) => x.STT === id);
		allService.splice(result, 1);
		setListUserService([...allService]);
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Tên dịch vụ", dataIndex: "name", key: "name" },
		{ title: "Số lượng", dataIndex: "quantity", key: "quantity" },
		{
			title: "Đơn giá",
			render: (record) => (
				<b className="ml-2 bold">{format_current(record.price)}</b>
			),
		},
		{
			title: "Thành tiền",
			render: (record) => (
				<b className="ml-2 bold">{format_current(record.amount)}</b>
			),
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

	listUserService &&
		listUserService.length > 0 &&
		listUserService.forEach((infor, index) => {
			allService.push({
				...infor,
				STT: index + 1,
			});
		});

	getService(listUserService);

	return (
		<React.Fragment>
			<Formik
				initialValues={initialValues}
				onSubmit={handleAddService}
				enableReinitialize
			>
				{() => (
					<Form>
						<div className="grid grid-cols-7 mb-2 col-gap-2">
							<div className="col-span-4">
								<div className="flex mb-1 items-center">
									<div className="LabelCo text-sm">Dịch vụ:</div>
									<Field
										as="select"
										name="service_id"
										style={{ width: "100%", height: 30 }}
									>
										{listService.map((value) => (
											<option value={value.id} key={value.id}>
												{value.name}
											</option>
										))}
									</Field>
								</div>
							</div>
							<div className="col-span-2">
								<div className="flex mb-1 items-center">
									<div className="LabelCo text-sm">Số lượng:</div>
									<Field as="select" name="quantity" style={{ width: 226, height: 30 }}>
										{renderQuantity()}
									</Field>
								</div>
							</div>
							<div className="col-span-1 flex items-center justify-center">
								<button className="dashboardButton focus:outline-none">Thêm</button>
							</div>
						</div>
					</Form>
				)}
			</Formik>

			<Table
				rowKey={(record) => record.STT}
				dataSource={allService}
				columns={columns}
				bordered
				scroll={{ x: true }}
				className="mt-3 custom-table"
			/>
		</React.Fragment>
	);
}

export default CheckinService;
