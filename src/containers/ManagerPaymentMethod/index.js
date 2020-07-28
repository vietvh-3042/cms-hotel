import { Popconfirm, Table, Tag } from "antd";
import Axios from "axios";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { endpoint } from "settings";
import shortid from "shortid";
import ModalAddPaymentMethod from "./components/ModalAddPaymentMethod";
import ModalUpdatePaymentMethod from "./components/ModalUpdatePaymentMethod";

ManagerPaymentMethod.propTypes = {};

function ManagerPaymentMethod(props) {
	const [status, setStatus] = useState(false);
	const [loading, setLoading] = useState(false);
	const [listPaymentMethod, setListPaymentMethod] = useState([]);
	const [pagination, setPagination] = useState();
	const [visibleType, setVisibleType] = useState(false);
	const [visibleUpdateType, setVisibleUpdateType] = useState({
		detail: {},
		visible: false,
	});
	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
	});

	const allData = [];
	const user = useSelector((state) => state.Auth.user);

	useEffect(() => {
		setLoading(true);
		const paramString = queryString.stringify(filters);
		Axios({
			method: "GET",
			url: endpoint + "/tenant/payslip-receipt/payment-method?" + paramString,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
			},
		}).then((res) => {
			setLoading(false);
			res.data.data.forEach((infor, index) => {
				allData.push({
					...infor,
					STT: index + 1,
				});
			});
			setListPaymentMethod(allData);
			setPagination(res.data.meta.pagination.total);
		});
	}, [filters, status]);

	function handleAddListTypeCategory() {
		setVisibleType(!visibleType);
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

	function handleUpdateType(record) {
		setVisibleUpdateType({
			detail: record,
			visible: !visibleUpdateType.visible,
		});
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Tên", dataIndex: "name", key: "name" },
		{
			title: (
				<span className="inline-block w-full text-center">Trạng thái</span>
			),
			render: (record) => {
				if (record.status === 1)
					return (
						<div className="text-center">
							<Tag color="#87d068">Có hỗ trợ thanh toán</Tag>
						</div>
					);
				else
					return (
						<div className="text-center">
							<Tag color="#f50">Không còn hỗ trợ</Tag>
						</div>
					);
			},
		},
		{
			title: "Thao tác",
			render: (record) => (
				<div className=" h-full flex items-center flex-wrap">
					<img
						src="/images/Actions/Edit.png"
						alt="Edit"
						className="ml-2 mr-1  cursor-pointer"
						onClick={() => handleUpdateType(record)}
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
					<span className="titleMainContain">
						Danh sách phương thức thanh toán
					</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddListTypeCategory}
				>
					<span className="add"></span>
					<span>Thêm mới</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table
					rowKey={(record) => shortid.generate()}
					dataSource={listPaymentMethod}
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
			<ModalAddPaymentMethod
				visible={visibleType}
				handleAddListTypeCategory={handleAddListTypeCategory}
				handleSetStatus={handleSetStatus}
			/>
			<ModalUpdatePaymentMethod
				visibleUpdateType={visibleUpdateType}
				handleUpdateType={handleUpdateType}
				handleSetStatus={handleSetStatus}
			/>
		</div>
	);
}

export default ManagerPaymentMethod;
