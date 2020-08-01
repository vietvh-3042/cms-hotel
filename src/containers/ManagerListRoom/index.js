import { Popconfirm, Table } from "antd";
import CommonApi from "helpers/APIS/CommonApi";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalAddListRoom from "./components/ModalAddListRoom";
import ModalUpdateTypeRoom from "./components/ModalUpdateTypeRoom";
import SettingAdditional from "./SettingAdditional";
import SettingPrice from "./SettingPrice";

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
		include: "typePrices.priceTimes",
	});

	const [visibleUpdate, setVisibleUpdate] = useState({
		visible: false,
		detail: {},
	});

	const allData = [];

	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	useEffect(() => {
		setLoading(true);
		const paramString = queryString.stringify(filters);
		CommonApi(
			"GET",
			`/tenant/hotel-manager/type-room?${paramString}`,
			null
		).then((res) => {
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
		setVisibleUpdate({
			visible: !visibleUpdate.visible,
			detail: value,
		});
	}

	function confirm(id) {
		CommonApi("DELETE", `/tenant/hotel-manager/type-room/${id}`).then((res) => {
			toast.success("Xóa thành công");
			handleSetStatus();
		});
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
		{
			title: (
				<span className="text-left inline-block w-full ml-3">Cài đặt giá</span>
			),
			render: (record) => (
				<div className="text-left">
					<SettingPrice value={record} />
				</div>
			),
		},
		{
			title: (
				<span className="text-left inline-block w-full ml-10">
					Qui định phụ trội
				</span>
			),

			render: (record) => (
				<div className="text-left ml-12">
					<SettingAdditional value={record} />
				</div>
			),
		},
		{ title: "SL.G", dataIndex: "number_bed", key: "number_bed" },
		{ title: "SL.N", dataIndex: "number_person", key: "number_person" },
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
						title="Bạn thực sự muốn xóa bản ghi này?"
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
					scroll={{ x: true }}
					bordered
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
