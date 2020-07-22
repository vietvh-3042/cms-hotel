import { Table, Popconfirm } from "antd";
import Axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_Timeout, endpoint } from "settings";
import ModalAddListRoom from "./components/ModalAddListRoom";
import ModalUpdateTypeRoom from "./components/ModalUpdateTypeRoom";

ManagerListRoom.propTypes = {};

function ManagerListRoom(props) {
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [status, setStatus] = useState(false);
	const [listTypeRoom, setListTypeRoom] = useState([]);
	const [pagination, setPagination] = useState();
	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
	});

	const [visibleUpdate, setVisibleUpdate] = useState({
		visible: false,
		detail: {},
	});

	const allData = [];

	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	useEffect(() => {
		setLoading(true);
		const paramString = queryString.stringify(filters);
		Axios({
			method: "GET",
			url: endpoint + "/tenant/hotel-manager/type-room?" + paramString,
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
			setListTypeRoom(allData);
			setPagination(res.data.meta.pagination.total);
		});
	}, [filters, status, hotel_ID]);

	function handleAddListRoom() {
		setVisible(!visible);
	}

	function handleSetStatus() {
		setStatus(!status);
	}

	function handleOnChange(pagination) {
		setFilter({
			...filters,
			page: pagination.current,
		});
	}

	function handleUpdateTypeRoom(value) {
		console.log(value);
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{
			title: "Loại phòng",
			dataIndex: "name",
			key: "name",
			render: (record) => (
				<span className="capitalize font-bold">{record}</span>
			),
		},
		{ title: "Giá phòng", dataIndex: "", key: "" },
		{ title: "Cài đặt giá", dataIndex: "", key: "" },
		{ title: "Qui định phụ trội", dataIndex: "", key: "" },
		{ title: "SL.G", dataIndex: "number_bed", key: "number_bed" },
		{ title: "SL.N", dataIndex: "number_person", key: "number_person" },
		{ title: "Ghi chú", dataIndex: "note", key: "note" },
		{
			title: "Thao tác",
			width: "120px",
			render: (record) => (
				<div className=" h-full flex justify-center items-center flex-wrap">
					<img
						src="/images/Actions/Edit.png"
						alt="Edit"
						className="ml-2 mr-1  cursor-pointer"
						onClick={() => handleUpdateTypeRoom(record)}
					/>

					<Popconfirm
						title="Bạn thực sự muốn xóa khách sạn này"
						// onConfirm={() => confirm(record.id)}
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
				</div>
			),
		},
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
					rowKey={(record) => record.id}
					dataSource={listTypeRoom}
					columns={columns}
					loading={loading}
					pagination={{
						total: pagination,
						pageSize: filters.limit,
						current: filters.page,
					}}
					onChange={handleOnChange}
				/>
			</div>
			<ModalAddListRoom
				visible={visible}
				handleAddListRoom={handleAddListRoom}
				handleSetStatus={handleSetStatus}
			/>
			<ModalUpdateTypeRoom
				visibleUpdate={visibleUpdate}
				handleUpdateTypeRoom={handleUpdateTypeRoom}
				handleSetStatus={handleSetStatus}
			/>
		</div>
	);
}

export default ManagerListRoom;
