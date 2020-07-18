import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

ManagerPriceTime.propTypes = {};

function ManagerPriceTime(props) {
	function handleAddPriceTime() {}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Thời điểm", dataIndex: "STT", key: "STT" },
		{ title: "Loại phòng", dataIndex: "STT", key: "STT" },
		{ title: "Giá mặc định của loại phòng", dataIndex: "STT", key: "STT" },
		{ title: "Giá sau khi điều chỉnh", dataIndex: "STT", key: "STT" },
		{ title: "Ghi chú", dataIndex: "STT", key: "STT" },
		{ title: "Thao tác", dataIndex: "STT", key: "STT" },
	];

	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="/images/Sidebar/Settings/price.png"
						alt="list-room"
						className="inline ml-3"
					/>
					<span className="titleMainContain">
						Danh sách các cài đặt theo thời điểm
					</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddPriceTime}
				>
					<span className="add"></span>
					<span>Thêm giá theo thời điểm</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table columns={columns} />
			</div>
		</div>
	);
}

export default ManagerPriceTime;
