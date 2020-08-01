import { Popconfirm, Table } from "antd";
import CommonApi from "helpers/APIS/CommonApi";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalAddHotel from "./components/ModalAddHotel";
import ModalUpdate from "./components/ModalUpdate";

ManagerHotel.propTypes = {};

function ManagerHotel(props) {
	const [status, setStatus] = useState(false);
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [listHotel, setListHotel] = useState([]);
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
		CommonApi(
			"GET",
			`/tenant/hotel-manager/hotel?${paramString}`,
			user.meta.access_token,
			user.data.name,
			hotel_ID,
			null
		).then((res) => {
			setLoading(false);
			res.data.data.forEach((infor, index) => {
				allData.push({
					...infor,
					STT: index + 1,
				});
			});
			setListHotel(allData);
			setPagination(res.data.meta.pagination.total);
		});
	}, [filters, status]);

	function handleAddHotel() {
		setVisible(!visible);
	}

	function handleUpdateHotel(value) {
		setVisibleUpdate({
			visible: !visibleUpdate.visible,
			detail: value,
		});
	}

	function handleSetStatus() {
		setStatus(!status);
	}

	function confirm(id) {
		CommonApi(
			"DELETE",
			`/tenant/hotel-manager/hotel/${id}`,
			user.meta.access_token,
			user.data.name,
			hotel_ID,
			null
		).then((res) => {
			toast.success("Cập nhật thành công");
			handleSetStatus();
		});
	}

	function handleOnChange(pagination) {
		setFilter({
			...filters,
			page: pagination.current,
		});
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Tên KS", dataIndex: "name", key: "name", width: "15%" },
		{ title: "SL.Tầng", dataIndex: "total_floor", key: "total_floor" },
		{ title: "SL.Phòng", dataIndex: "total_room", key: "total_room" },
		{ title: "Địa chỉ", dataIndex: "address", key: "address", width: "15%" },
		{ title: "Phone", dataIndex: "phone", key: "phone" },
		{ title: "Email", dataIndex: "email", key: "email" },
		{ title: "Website", dataIndex: "website", key: "website" },
		{ title: "Ghi chú", dataIndex: "note", key: "note", width: "15%" },
		{
			title: "Thao tác",
			width: "120px",
			render: (record) => (
				<div className=" h-full flex justify-center items-center flex-wrap">
					<img
						src="/images/Actions/Edit.png"
						alt="Edit"
						className="ml-2 mr-1  cursor-pointer"
						onClick={() => handleUpdateHotel(record)}
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
					<span className="titleMainContain">Danh sách khách sạn</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddHotel}
				>
					<span className="add"></span>
					<span>Thêm</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table
					rowKey={(record) => record.id}
					dataSource={listHotel}
					columns={columns}
					loading={loading}
					scroll={{ x: 1500 }}
					bordered
					pagination={{
						total: pagination,
						pageSize: filters.limit,
						current: filters.page,
					}}
					onChange={handleOnChange}
				/>
			</div>
			<ModalAddHotel
				visible={visible}
				handleAddHotel={handleAddHotel}
				handleSetStatus={handleSetStatus}
			/>
			<ModalUpdate
				visibleUpdate={visibleUpdate}
				handleUpdateHotel={handleUpdateHotel}
				handleSetStatus={handleSetStatus}
			/>
		</div>
	);
}

export default ManagerHotel;
