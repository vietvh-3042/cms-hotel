import { Popconfirm, Table } from "antd";
import CommonApi from "helpers/APIS/CommonApi";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import shortid from "shortid";
import ModalAddGroup from "./components/ModalAddGroup";
import ModalUpdateGroup from "./components/ModalUpdateGroup";

ManagerPaymentMethod.propTypes = {};

function ManagerPaymentMethod(props) {
	const [status, setStatus] = useState(false);
	const [loading, setLoading] = useState(false);
	const [listGroup, setListGroup] = useState([]);
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

	useEffect(() => {
		setLoading(true);
		const paramString = queryString.stringify(filters);
		CommonApi("GET", `/tenant/acl/groups?${paramString}`).then((res) => {
			console.log(res);
			setLoading(false);
			res.data.data.forEach((infor, index) => {
				allData.push({
					...infor,
					STT: index + 1,
				});
			});
			setListGroup(allData);
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

	function confirm(id) {
		CommonApi("DELETE", `/tenant/acl/groups/${id}`).then((res) => {
			toast.success("Xóa thành công");
			handleSetStatus();
		});
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Tên", dataIndex: "name", key: "name" },
		{ title: "Ghi chú", dataIndex: "note", key: "note" },
		{
			title: "Thao tác",
			render: (record) => (
				<div className=" h-full flex justify-center items-center flex-wrap">
					<img
						src="/images/Actions/Edit.png"
						alt="Edit"
						className="ml-2 mr-1  cursor-pointer"
						onClick={() => handleUpdateType(record)}
					/>
					<Popconfirm
						title="Bạn thực sự muốn xóa?"
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
					<span className="titleMainContain">Danh sách nhóm group</span>
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
					dataSource={listGroup}
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
			<ModalAddGroup
				visible={visibleType}
				handleAddListTypeCategory={handleAddListTypeCategory}
				handleSetStatus={handleSetStatus}
			/>
			<ModalUpdateGroup
				visibleUpdateType={visibleUpdateType}
				handleUpdateType={handleUpdateType}
				handleSetStatus={handleSetStatus}
			/>
		</div>
	);
}

export default ManagerPaymentMethod;
