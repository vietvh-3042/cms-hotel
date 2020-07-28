import { Table } from "antd";
import Axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { endpoint } from "settings";

ManagerReceipts.propTypes = {};

function ManagerReceipts(props) {
	const allData = [];
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState(false);
	const [listReceipts, setListReceipts] = useState([]);
	const [pagination, setPagination] = useState();
	const [visible, setVisible] = useState(false);
	const [visibleUpdate, setVisibleUpdate] = useState(false);
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
			url: endpoint + "/tenant/payslip-receipt/receipt?" + paramString,
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
			setListReceipts(allData);
			setPagination(res.data.meta.pagination.total);
		});
	}, [filters, status, hotel_ID]);

	function handleAddReceipt() {
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

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Mã Phiếu", dataIndex: "", key: "" },
		{ title: "Ngày tạo", dataIndex: "", key: "" },
		{ title: "Diễn giải phiếu thu", dataIndex: "", key: "" },
		{ title: "Số tiền", dataIndex: "", key: "" },
		{ title: "Hình thức", dataIndex: "", key: "" },
		{ title: "Người trả", dataIndex: "", key: "" },
		{ title: "Tạo bởi", dataIndex: "", key: "" },
		{ title: "Ghi chú", dataIndex: "", key: "" },
		{ title: "Thao tác", dataIndex: "", key: "" },
	];

	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="/images/Sidebar/TienChi/receipts.png"
						alt="list-service"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Quản lý phiếu thu </span>
				</div>
				<div>
					<button
						className="dashboardButton mr-3 focus:outline-none"
						onClick={handleAddReceipt}
					>
						<span className="add"></span>
						<span>Thêm</span>
					</button>
				</div>
			</div>
			<div className="mt-2 mx-2">
				<Table
					dataSource={listReceipts}
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

export default ManagerReceipts;
