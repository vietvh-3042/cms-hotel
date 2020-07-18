import { getListTypeRoom } from "@Actions/type_room";
import { Table } from "antd";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

ManagerListRoom.propTypes = {};

function ManagerListRoom(props) {
	const distPatch = useDispatch();
	const [status, setStatus] = useState(false);
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);

	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
	});

	const listTypeRoom = useSelector((state) => state.TypeRoom.listTypeRoom);
	const pagination = useSelector((state) => state.TypeRoom.pagination);

	useEffect(() => {
		setLoading(true);
		const paramString = queryString.stringify(filters);
		distPatch(
			getListTypeRoom(paramString, (err, res) => {
				res && setLoading(false);
			})
		);
	}, [filters, status]);

	function handleOnChangePage(current, size) {
		setFilter({
			...filters,
			page: current,
		});
	}

	function handleAddListRoom() {}

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

	const allData = [];

	listTypeRoom &&
		listTypeRoom.length > 0 &&
		listTypeRoom.forEach((infor, index) => {
			allData.push({
				...infor,
				STT: index + 1,
			});
		});

	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="/images/Sidebar/Settings/price.png"
						alt="list-room"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Danh sách các loại phòng</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddListRoom}
				>
					<span className="add"></span>
					<span>Thêm loại phòng</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table
					dataSource={allData}
					columns={columns}
					loading={loading}
					pagination={{
						total: pagination.total,
						pageSize: filters.limit,
						current: filters.page,
					}}
				/>
			</div>
		</div>
	);
}

export default ManagerListRoom;
