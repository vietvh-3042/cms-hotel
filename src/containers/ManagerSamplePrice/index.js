import { Table, Popconfirm } from "antd";
import Axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { endpoint } from "settings";
import SettingPrice from "./SettingPrice";
import SettingAdditional from "./SettingAdditional";

ManagerSamplePrice.propTypes = {};

function ManagerSamplePrice(props) {
	const allData = [];
	const [status, setStatus] = useState(false);
	const [loading, setLoading] = useState(false);
	const [listSamplePrice, setListSamplePrice] = useState([]);
	const [pagination, setPagination] = useState();
	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
	});

	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	useEffect(() => {
		setLoading(true);
		const paramString = queryString.stringify(filters);
		Axios({
			method: "GET",
			url: endpoint + "/tenant/hotel-manager/sample-price?" + paramString,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
				"hotel-id": hotel_ID,
			},
		}).then((res) => {
			setLoading(false);
			res.data.data.forEach((infor, index) => {
				allData.push({
					...infor,
					STT: index + 1,
				});
			});
			setListSamplePrice(allData);
			setPagination(res.data.meta.pagination.total);
		});
	}, [filters, status, hotel_ID]);

	function handleAddPriceTime() {}

	function handleOnChange(pagination) {
		setFilter({
			...filters,
			page: pagination.current,
		});
	}

	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{
			title: "Giá mẫu",
			width: "150px",
			key: "name",
			render: (record) => (
				<b className="ml-2 bold" style={{ fontSize: 12 }}>
					{record.name}
				</b>
			),
		},
		{
			title: "Giá phòng",
			key: "price_day",
			width: "110px",
			render: (record) => (
				<b className="ml-2 bold" style={{ fontSize: 12 }}>
					{format_current(record.price_day)}
				</b>
			),
		},
		{
			title: "Cài đặt giá",
			width: "200px",
			render: (record) => <SettingPrice value={record} />,
		},
		{
			title: "Qui định phụ trội",
			render: (record) => <SettingAdditional />,
		},
		{ title: "Ghi chú", dataIndex: "note", key: "note", width: "85px" },
		{
			title: "Thao tác",
			width: "95px",
			render: (record) => (
				<div className=" h-full flex justify-center items-center flex-wrap">
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
				<Table
					rowKey={(record) => record.id}
					dataSource={listSamplePrice}
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
		</div>
	);
}

export default ManagerSamplePrice;
