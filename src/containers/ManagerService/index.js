import { Table } from "antd";
import Axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { endpoint } from "settings";
import ModalAddService from "./components/ModalAddService";

ManagerService.propTypes = {};

function ManagerService(props) {
	const allData = [];
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState(false);
	const [listService, setListService] = useState([]);
	const [listCategory, setListCategory] = useState([]);
	const [pagination, setPagination] = useState();
	const [visible, setVisible] = useState(false);
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
			url: endpoint + "/tenant/service-storage/services?" + paramString,
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
			setListService(allData);
			setPagination(res.data.meta.pagination.total);
		});
	}, [filters, status, hotel_ID]);

	useEffect(() => {
		Axios({
			method: "GET",
			url: endpoint + "/tenant/category/category",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
				"hotel-id": hotel_ID,
			},
		}).then((res) => {
			setListCategory(res.data.data);
		});
	}, []);

	function handleAddListService() {
		setVisible(!visible);
	}

	function handleOnChange(pagination) {
		setFilter({
			...filters,
			page: pagination.current,
		});
	}
	function handleSetStatus() {
		setStatus(!status);
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Tên dịch vụ", dataIndex: "", key: "" },
		{ title: "Giá bán", dataIndex: "", key: "" },
		{ title: "SL.tồn Đầu kỳ(1)", dataIndex: "", key: "" },
		{
			title: "Đã nhập Trong kỳ(2)",
			dataIndex: "number_bed",
			key: "number_bed",
		},
		{
			title: "Đã bán Trong kỳ(3)",
			dataIndex: "number_person",
			key: "number_person",
		},
		{ title: "Doanh thu Trong kỳ", dataIndex: "note", key: "note" },
		{ title: "SL. Tồn Cuối kỳ(1+2+3)", dataIndex: "note", key: "note" },
		{ title: "Ghi chú", dataIndex: "note", key: "note" },
		{ title: "Thao tác", dataIndex: "note", key: "note" },
	];

	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex flex-col md:flex-row md:justify-between md:items-center">
				<div className="h-full flex items-center group2">
					<img
						src="/images/Sidebar/Services/list-service.png"
						alt="list-service"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Dịch vụ và kho</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddListService}
				>
					<span className="add"></span>
					<span>Thêm dịch vụ</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table
					rowKey={(record) => record.id}
					dataSource={listService}
					columns={columns}
					loading={loading}
					bordered
					scroll={{ x: 1100 }}
					pagination={{
						total: pagination,
						pageSize: filters.limit,
						current: filters.page,
					}}
					onChange={handleOnChange}
				/>
			</div>
			<ModalAddService
				listCategory={listCategory}
				visible={visible}
				handleAddListService={handleAddListService}
				handleSetStatus={handleSetStatus}
			/>
		</div>
	);
}

export default ManagerService;
