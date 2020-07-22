import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import queryString from "query-string";
import { Pagination, Popconfirm, Tooltip, Table, Tag } from "antd";
import Axios from "axios";
import { endpoint } from "settings";
import { useSelector } from "react-redux";
import { API_Timeout } from "settings";

ManagerHotelFloor.propTypes = {};

function ManagerHotelFloor(props) {
	const [status, setStatus] = useState(false);
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [listHotelFloor, setListHotelFloor] = useState([]);
	const [pagination, setPagination] = useState();
	const [visibleUpdate, setVisibleUpdate] = useState({
		visible: false,
		detail: {},
	});
	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
	});

	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	const allData = [];

	useEffect(() => {
		setLoading(true);
		const paramString = queryString.stringify(filters);
		Axios({
			method: "GET",
			url: endpoint + "/tenant/hotel-manager/floor?" + paramString,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
				"hotel-id": hotel_ID,
			},
			timeout: API_Timeout,
		}).then((res) => {
			setLoading(false);
			res.data.data.forEach((infor, index) => {
				allData.push({
					...infor,
					STT: index + 1,
				});
			});
			setListHotelFloor(allData);
			setPagination(res.data.meta.pagination.total);
		});
	}, [filters, status, hotel_ID]);

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
		Axios({
			method: "POST",
			url: endpoint + "/tenant/hotel-manager/hiden-floor",
			data: {
				status: 2,
				id,
			},
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
				"hotel-id": hotel_ID,
			},
		});
	}

	const columns = [
		{
			title: "Ẩn khỏi sơ đồ",
			render: (record) => (
				<Popconfirm
					placement="rightTop"
					title="Bạn muốn khỏi sơ đồ?"
					onConfirm={confirm}
				>
					<input
						type="checkbox"
						defaultChecked={record.show_diagram === 1 ? true : false}
						className="cursor-pointer"
					/>
				</Popconfirm>
			),
		},
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Tên Tầng", dataIndex: "name", key: "name" },
		{ title: "Số Phòng", dataIndex: "number_room", key: "number_room" },
		{ title: "Ghi chú", dataIndex: "note", key: "note" },
		{
			title: "Trạng thái",
			render: (record) => (
				<Tag color={record.show_diagram === 1 ? "#cd201f" : "#87d068"}>
					{record.show_diagram === 1 ? "Đang ẩn" : "Đang hiện"}
				</Tag>
			),
		},
		{ title: "Thao tác", dataIndex: "", key: "" },
	];

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
					rowKey={(record) => record.id}
					dataSource={listHotelFloor}
					columns={columns}
					loading={loading}
					pagination={{
						total: pagination,
						pageSize: filters.limit,
						current: filters.page,
					}}
				/>
			</div>
			{/* <ModalAddFloor
				visible={visible}
				handleAddFloor={handleAddFloor}
				handleSetStatus={handleSetStatus}
			/>
			<ModalUpdate
				visible={visibleUpdate}
				handleUpdateFloor={handleUpdateFloor}
				handleSetStatus={handleSetStatus}
			/> */}
		</div>
	);
}

export default ManagerHotelFloor;
