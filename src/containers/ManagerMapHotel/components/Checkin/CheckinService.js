import React from "react";
import { Field } from "formik";
import { renderQuantity } from "helpers/Common/CommonRoom";
import { Table } from "antd";

function CheckinService(props) {
	let allService = [];

	// service
	// service_id: "",
	// name_service: "",
	// quantity: 1,
	// price: "",
	// amount : total price when push 1 obj with quantity * price

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Tên dịch vụ", dataIndex: "name", key: "name" },
		{ title: "Số lượng", dataIndex: "quantity", key: "quantity" },
		{ title: "Đơn giá", dataIndex: "amount", key: "amount" },
		{ title: "Thành tiền", dataIndex: "price", key: "price" },
		{ title: "Thao tác" },
	];
	return (
		<React.Fragment>
			<div className="grid grid-cols-7 mb-2 col-gap-2">
				<div className="col-span-4">
					<div className="flex mb-1 items-center">
						<div className="LabelCo text-sm">Dịch vụ:</div>
						<Field as="select" name="floor_id" style={{ width: "100%", height: 30 }}>
							<option>1</option>
						</Field>
					</div>
				</div>
				<div className="col-span-2">
					<div className="flex mb-1 items-center">
						<div className="LabelCo text-sm">Số lượng:</div>
						<Field as="select" name="floor_id" style={{ width: 226, height: 30 }}>
							{renderQuantity()}
						</Field>
					</div>
				</div>
				<div className="col-span-1 flex items-center justify-center">
					<button className="dashboardButton focus:outline-none">Thêm</button>
				</div>
			</div>
			<Table
				dataSource={allService}
				columns={columns}
				bordered
				scroll={{ x: true }}
			/>
		</React.Fragment>
	);
}

export default CheckinService;
