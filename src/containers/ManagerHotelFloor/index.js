import { Popconfirm, Table } from "antd";
import CommonApi from "helpers/APIS/CommonApi";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalAddFloor from "./components/ModalAddFloor";
import ModalUpdate from "./components/ModalUpdate";

ManagerHotelFloor.propTypes = {};

function ManagerHotelFloor(props) {
	const allData = [];
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

	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	useEffect(() => {
		setLoading(true);
		const paramString = queryString.stringify(filters);
		CommonApi("GET", `/tenant/hotel-manager/floor?${paramString}`).then((res) => {
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

	function handleOnChangePage(current, size) {
		setFilter({
			...filters,
			page: current.current,
		});
	}

	function confirm(id) {
		CommonApi("DELETE", `/tenant/hotel-manager/floor/${id}`).then((res) => {
			toast.success("Xóa thành công");
			handleSetStatus();
		});
	}

	function handleAddFloor() {
		setVisible(!visible);
	}

	function handleUpdateFloor(value) {
		setVisibleUpdate({
			visible: !visibleUpdate.visible,
			detail: value,
		});
	}

	function handleSetStatus() {
		setStatus(!status);
	}

	const columns = [
		// {
		// 	title: "Ẩn khỏi sơ đồ",
		// 	render: (record) => (
		// 		<Popconfirm
		// 			placement="rightTop"
		// 			title={`Bạn muốn ${
		// 				record.show_diagram === 1 ? "hiện" : "ẩn"
		// 			} trên sơ đồ?`}
		// 			onConfirm={() => confirm(record.id, record.show_diagram, record.name)}
		// 		>
		// 			<input
		// 				type="checkbox"
		// 				checked={record.show_diagram === 1 ? true : false}
		// 				onChange={() => {}}
		// 				className="cursor-pointer"
		// 			/>
		// 		</Popconfirm>
		// 	),
		// },
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Tên Tầng", dataIndex: "name", key: "name" },
		{ title: "Số Phòng", dataIndex: "number_room", key: "number_room" },
		{ title: "Ghi chú", dataIndex: "note", key: "note" },
		// {
		// 	title: "Trạng thái",
		// 	render: (record) => (
		// 		<Tag color={record.show_diagram === 1 ? "#cd201f" : "#87d068"}>
		// 			{record.show_diagram === 1 ? "Đang ẩn" : "Đang hiện"}
		// 		</Tag>
		// 	),
		// },
		{
			title: "Thao tác",
			render: (record) => (
				<div className=" h-full flex items-center flex-wrap">
					<img
						src="/images/Actions/Edit.png"
						alt="Edit"
						className="mr-1  cursor-pointer"
						onClick={() => handleUpdateFloor(record)}
					/>
					<Popconfirm
						title="Bạn thực sự muốn xóa khách sạn này"
						onConfirm={() => confirm(record.id)}
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
					bordered
					pagination={{
						total: pagination,
						pageSize: filters.limit,
						current: filters.page,
					}}
					onChange={handleOnChangePage}
				/>
			</div>
			<ModalAddFloor
				visible={visible}
				handleAddFloor={handleAddFloor}
				handleSetStatus={handleSetStatus}
			/>
			<ModalUpdate
				visibleUpdate={visibleUpdate}
				handleUpdateFloor={handleUpdateFloor}
				handleSetStatus={handleSetStatus}
			/>
		</div>
	);
}

export default ManagerHotelFloor;
