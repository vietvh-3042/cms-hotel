import { Popconfirm, Table } from "antd";
import Axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { endpoint } from "settings";
import { toast } from "react-toastify";
import ModalAddClassify from "./components/ModalAddClassify";

ManagerClassify.propTypes = {};

function ManagerClassify(props) {
	const allData = [];
	const [status, setStatus] = useState(false);
	const [loading, setLoading] = useState(false);
	const [listClassify, setListClassify] = useState([]);
	const [pagination, setPagination] = useState();
	const [visible, setVisible] = useState(false);

	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
	});

	const [visibleUpdateClassify, setVisibleUpdateClassify] = useState({
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
			url: endpoint + "/tenant/hotel-manager/classify?" + paramString,
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
			setListClassify(allData);
			setPagination(res.data.meta.pagination.total);
		});
	}, [filters, status, hotel_ID]);

	function handleOnChange(pagination) {
		setFilter({
			...filters,
			page: pagination.current,
		});
	}

	function handleAddClassify() {
		setVisible(!visible);
	}

	function handleSetStatus() {
		setStatus(!status);
	}

	function confirm(id) {
		Axios({
			method: "DELETE",
			url: endpoint + "/tenant/hotel-manager/classify/" + id,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
				"hotel-id": hotel_ID,
			},
		})
			.then((res) => {
				toast.success("Xóa thành công");
				handleSetStatus();
			})
			.catch((err) => {
				let error = [];
				for (let value of Object.values(err.response.data.errors)) {
					error.push(value);
				}
				toast.error(
					<React.Fragment>
						{error.map((value, key) => (
							<div key={key}>{value}</div>
						))}
					</React.Fragment>
				);
			});
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Tên Phân Loại ", dataIndex: "name", key: "name" },
		{ title: "Màu Sắc Đánh Dấu", dataIndex: "color_code", key: "color_code" },
		{ title: "Mô Tả ", dataIndex: "description", key: "description" },
		{ title: "Chi Chú ", dataIndex: "note", key: "note" },
		{
			title: "Thao tác",
			render: (record) => (
				<div className=" h-full flex justify-center items-center flex-wrap">
					<img
						src="/images/Actions/Edit.png"
						alt="Edit"
						className="ml-2 mr-1  cursor-pointer"
						// onClick={() => handleUpdateCategory(record)}
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
			<div className="header flex flex-col md:flex-row md:justify-between md:items-center">
				<div className="h-full flex items-center group2">
					<img
						src="/images/Sidebar/Services/list-service.png"
						alt="list-service"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Danh sách nhóm phân loại</span>
				</div>
				<div>
					<button
						className="dashboardButton mr-3 focus:outline-none"
						onClick={handleAddClassify}
					>
						<span className="add"></span>
						<span>Thêm mới</span>
					</button>
				</div>
			</div>
			<div className="mt-2 mx-2">
				<Table
					rowKey={(record) => record.id}
					dataSource={listClassify}
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
			<ModalAddClassify
				visible={visible}
				handleAddClassify={handleAddClassify}
				handleSetStatus={handleSetStatus}
			/>
		</div>
	);
}

export default ManagerClassify;
