import { Popconfirm, Table } from "antd";
import Axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { endpoint } from "settings";
import ModalAddCategory from "./components/ModalAddCategory";
import ModalUpdateCategory from "./components/ModalUpdateCategory";

ManagerCategory.propTypes = {};

function ManagerCategory(props) {
	const allData = [];
	const [status, setStatus] = useState(false);
	const [loading, setLoading] = useState(false);
	const [listCategory, setListCategory] = useState([]);
	const [listTypeCategory, setListTypeCategory] = useState([]);
	const [pagination, setPagination] = useState();
	const [visible, setVisible] = useState(false);
	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
	});

	const [visibleUpdateCategory, setVisibleUpdateCategory] = useState({
		detail: {},
		visible: false,
	});

	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	useEffect(() => {
		setLoading(true);
		const paramString = queryString.stringify(filters);
		Axios({
			method: "GET",
			url: endpoint + "/tenant/category/category?" + paramString,
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
			setListCategory(allData);
			setPagination(res.data.meta.pagination.total);
		});
	}, [filters, status, hotel_ID]);

	useEffect(() => {
		Axios({
			method: "GET",
			url: endpoint + "/tenant/category/type-category",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
				"hotel-id": hotel_ID,
			},
		}).then((res) => {
			setListTypeCategory(res.data.data);
		});
	}, []);

	function handleAddListCategory() {
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

	function handleUpdateCategory(record) {
		setVisibleUpdateCategory({
			visible: !visibleUpdateCategory.visible,
			detail: record,
		});
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Mã", dataIndex: "category_code", key: "category_code" },
		{ title: "Nhóm Dịch vụ", dataIndex: "name", key: "name" },
		{ title: "Loại Dịch vụ", dataIndex: "", key: "" },
		{ title: "Ghi chú", dataIndex: "note", key: "note" },
		{
			title: "Thao tác",
			render: (record) => (
				<div className=" h-full flex justify-center items-center flex-wrap">
					<img
						src="/images/Actions/Edit.png"
						alt="Edit"
						className="ml-2 mr-1  cursor-pointer"
						onClick={() => handleUpdateCategory(record)}
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
			<div className="header flex flex-col md:flex-row md:justify-between md:items-center">
				<div className="h-full flex items-center group2">
					<img
						src="/images/Sidebar/Services/list-service.png"
						alt="list-service"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Danh sách nhóm dịch vụ</span>
				</div>
				<div>
					<button
						className="dashboardButton mr-3 focus:outline-none"
						onClick={handleAddListCategory}
					>
						<span className="add"></span>
						<span>Thêm mới</span>
					</button>
				</div>
			</div>
			<div className="mt-2 mx-2">
				<Table
					rowKey={(record) => record.id}
					dataSource={listCategory}
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
			<ModalAddCategory
				visible={visible}
				listTypeCategory={listTypeCategory}
				handleAddListCategory={handleAddListCategory}
				handleSetStatus={handleSetStatus}
			/>
			<ModalUpdateCategory
				listTypeCategory={listTypeCategory}
				visibleUpdateCategory={visibleUpdateCategory}
				handleUpdateCategory={handleUpdateCategory}
				handleSetStatus={handleSetStatus}
			/>
		</div>
	);
}

export default ManagerCategory;
