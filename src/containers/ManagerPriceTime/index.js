import { Popconfirm, Table } from "antd";
import CommonApi from "helpers/APIS/CommonApi";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

ManagerPriceTime.propTypes = {};

function ManagerPriceTime(props) {
	const allData = [];

	const [status] = useState(false);

	const [loading, setLoading] = useState(false);

	const [listPriceTime, setListPriceTime] = useState([]);

	const [pagination, setPagination] = useState();

	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
	});

	useEffect(() => {
		setLoading(true);
		const paramString = queryString.stringify(filters);
		CommonApi("GET", `/tenant/hotel-manager/price-time?${paramString}`).then(
			(res) => {
				setLoading(false);
				res.data.data.forEach((infor, index) => {
					allData.push({
						...infor,
						STT: index + 1,
					});
				});
				setListPriceTime(allData);
				setPagination(res.data.meta.pagination.total);
			}
		);
	}, [filters, status, hotel_ID]);

	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	function handleAddPriceTime() {}

	function handleOnChange(pagination) {
		setFilter({
			...filters,
			page: pagination.current,
		});
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT", width: "45px" },
		{ title: "Thời điểm", dataIndex: "", key: "", width: "230px" },
		{
			title: "Loại phòng",
			key: "name",
			width: "180px",
			render: (record) => (
				<b className="ml-2 bold" style={{ fontSize: 12 }}>
					{record.name}
				</b>
			),
		},
		{
			title: "Giá mặc định của loại phòng",
			key: "STT",
			width: "220px",
			render: (record) => (
				<div className="bg-green-300">
					<span>♦ Qua đêm: </span>
					<b className="ml-2 bold" style={{ fontSize: 12 }}>
						{format_current(record.price_day)}
					</b>
				</div>
			),
		},
		{
			title: "Giá sau khi điều chỉnh",
			dataIndex: "",
			key: "",
			width: "210px",
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
					<span className="titleMainContain">
						Danh sách các cài đặt theo thời điểm
					</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddPriceTime}
				>
					<span className="add"></span>
					<span>Thêm giá theo thời điểm</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table
					dataSource={listPriceTime}
					columns={columns}
					loading={loading}
					scroll={{ x: true }}
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

export default ManagerPriceTime;
