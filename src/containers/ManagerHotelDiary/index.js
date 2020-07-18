import { Table } from "antd";
import React from "react";

ManagerHotelDiary.propTypes = {};

function ManagerHotelDiary(props) {
	const columns = [
		{ title: "Thời gian", dataIndex: "", key: "" },
		{ title: "Username", dataIndex: "", key: "" },
		{ title: "Thao tác", dataIndex: "", key: "" },
		{ title: "Chi tiết", dataIndex: "", key: "" },
	];

	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="/images/Header/diary.png"
						alt="list-hotel"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Nhật ký sử dụng</span>
				</div>
			</div>
			<div className="mt-2 mx-2">
				<Table columns={columns} />
			</div>
		</div>
	);
}

export default ManagerHotelDiary;
