import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import queryString from "query-string";
import { deleteHotel, getListHotel } from "@Actions/hotel";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import ModalAddHotel from "./components/ModalAddHotel";
import ModalAddLocation from "./components/ModalAddLocation";
import ModalUpdate from "./components/ModalUpdate";

ManagerHotel.propTypes = {};

function ManagerHotel(props) {
	const distPatch = useDispatch();
	const [status, setStatus] = useState(false);
	const [loading, setLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [visibleLocation, setVisibleLocation] = useState(false);
	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
	});
	const [visibleUpdate, setVisibleUpdate] = useState({
		visible: false,
		detail: {},
	});

	const listHotel = useSelector((state) => state.Hotel.listHotel);
	const pagination = useSelector((state) => state.Hotel.pagination);

	useEffect(() => {
		setLoading(true);
		const paramString = queryString.stringify(filters);
		distPatch(
			getListHotel(paramString, (err, res) => {
				res && setLoading(false);
			})
		);
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

	function handleAddLocation() {
		setVisibleLocation(!visibleLocation);
	}

	function handleSetStatus() {
		setStatus(!status);
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Tên KS", dataIndex: "name", key: "name" },
		{ title: "SL.Tầng", dataIndex: "total_floor", key: "total_floor" },
		{ title: "SL.Phòng", dataIndex: "total_room", key: "total_room" },
		{ title: "Địa chỉ", dataIndex: "address", key: "address" },
		{ title: "Phone", dataIndex: "phone", key: "phone" },
		{ title: "Email", dataIndex: "email", key: "email" },
		{ title: "Website", dataIndex: "website", key: "website" },
		{ title: "Ghi chú", dataIndex: "note", key: "note" },
		{ title: "Thao tác", dataIndex: "", key: "" },
	];

	const allData = [];

	listHotel &&
		listHotel.length > 0 &&
		listHotel.forEach((infor, index) => {
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
			<ModalAddLocation
				visible={visibleLocation}
				handleAddLocation={handleAddLocation}
			/>
		</div>
	);
}

export default ManagerHotel;
