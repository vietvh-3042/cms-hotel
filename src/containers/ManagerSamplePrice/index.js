import React from "react";
import PropTypes from "prop-types";
import { Table } from "antd";

ManagerSamplePrice.propTypes = {};

function ManagerSamplePrice(props) {
	function handleAddPriceTime() {}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Loại phòng", dataIndex: "name", key: "nameSTT" },
		{ title: "Giá phòng", dataIndex: "STT", key: "STT" },
		{ title: "Cài đặt giá", dataIndex: "STT", key: "STT" },
		{ title: "Qui định phụ trội", dataIndex: "STT", key: "STT" },
		{ title: "SL.G", dataIndex: "number_bed", key: "number_bed" },
		{ title: "SL.N", dataIndex: "number_person", key: "number_person" },
		{ title: "Ghi chú", dataIndex: "note", key: "note" },
		{ title: "Thao tác", dataIndex: "", key: "" },
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
					<span className="titleMainContain">Danh sách giá mẫu</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddPriceTime}
				>
					<span className="add"></span>
					<span>Thêm giá mẫu</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table columns={columns} />
			</div>
		</div>
	);
}

export default ManagerSamplePrice;
