import { getListHotelFloor, hideHotelFloor } from "@Actions/hotel_floor";
import { Pagination, Popconfirm, Tooltip, Table } from "antd";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalAddFloor from "./components/ModalAddFloor";
import ModalUpdate from "./components/ModalUpdate";

ManagerHotelFloor.propTypes = {};

function ManagerHotelFloor(props) {
	const distPatch = useDispatch();
	const [status, setStatus] = useState(false);
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [visibleUpdate, setVisibleUpdate] = useState({
		visible: false,
		detail: {},
	});

	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
	});

	const pagination = useSelector((state) => state.HotelFloor.pagination);
	const listHotelFloor = useSelector(
		(state) => state.HotelFloor.listHotelFloor
	);

	useEffect(() => {
		setLoading(true);
		const paramString = queryString.stringify(filters);
		distPatch(
			getListHotelFloor(paramString, (err, res) => {
				res && setLoading(false);
			})
		);
	}, [filters, status]);

	function handleAddFloor() {
		setVisible(!visible);
	}

	function handleUpdateFloor(value) {
		setVisibleUpdate({
			visible: !visibleUpdate.visible,
			detail: value,
		});
	}

	function handleOnChangePage(current, size) {
		setFilter({
			...filters,
			page: current,
		});
	}

	function handleSetStatus() {
		setStatus(!status);
	}

	function confirm(id, show_diagram, name) {
		distPatch(
			hideHotelFloor(
				{ status: show_diagram === 1 ? 2 : 1, id: id },
				(er, res) => {
					if (res) {
						handleSetStatus();
						toast.success(
							`Bạn vừa ${
								show_diagram === 1 ? "hiện" : "ẩn"
							} ${name} trên sơ đồ khách sạn`
						);
					}
				}
			)
		);
	}

	const columns = [
		{ title: "Ẩn khỏi sơ đồ", dataIndex: "", key: "" },
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Tên Tầng", dataIndex: "name", key: "name" },
		{ title: "Số Phòng", dataIndex: "number_room", key: "number_room" },
		{ title: "Ghi chú", dataIndex: "note", key: "note" },
		{ title: "Thao tác", dataIndex: "", key: "" },
	];

	const allData = [];

	listHotelFloor &&
		listHotelFloor.length > 0 &&
		listHotelFloor.forEach((infor, index) => {
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
						src="/images/Sidebar/Hotel/sub-hotel.png"
						alt="list-hotel"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Danh sách tầng lầu</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddFloor}
				>
					<span className="add"></span>
					<span>Thêm</span>
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
			<ModalAddFloor
				visible={visible}
				handleAddFloor={handleAddFloor}
				handleSetStatus={handleSetStatus}
			/>
			<ModalUpdate
				visible={visibleUpdate}
				handleUpdateFloor={handleUpdateFloor}
				handleSetStatus={handleSetStatus}
			/>
		</div>
	);
}

export default ManagerHotelFloor;
