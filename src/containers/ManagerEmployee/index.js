import { Popconfirm, Table } from "antd";
import CommonApi from "helpers/APIS/CommonApi";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalAddEmployee from "./components/ModalAddEmployee";
import ModalUpdateEmployee from "./components/ModalUpdateEmployee";

ManagerEmployee.propTypes = {};

function ManagerEmployee(props) {
	const allData = [];
	const [status, setStatus] = useState(false);
	const [loading, setLoading] = useState(false);
	const [listEmployee, setListEmployee] = useState([]);
	const [listGroup, setListGroup] = useState([]);
	const [pagination, setPagination] = useState();
	const [visible, setVisible] = useState(false);
	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
	});

	const [visibleUpdate, setVisibleUpdate] = useState({
		visible: false,
		detail: {},
	});

	useEffect(() => {
		setLoading(true);
		const paramString = queryString.stringify(filters);
		CommonApi("GET", `/tenant/acl/employees?${paramString}`).then((res) => {
			setLoading(false);
			res.data.data.forEach((infor, index) => {
				allData.push({
					...infor,
					STT: index + 1,
				});
			});
			setListEmployee(allData);
			setPagination(res.data.meta.pagination.total);
		});
	}, [filters, status]);

	useEffect(() => {
		CommonApi("GET", "/tenant/acl/groups").then((res) => {
			setListGroup(res.data.data);
		});
	}, []);

	function handleAddListEmployee() {
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

	function handleUpdateEmployee(value) {
		setVisibleUpdate({
			visible: !visibleUpdate.visible,
			detail: value,
		});
	}

	function confirm(id) {
		CommonApi("DELETE", `/tenant/acl/employees/${id}`).then((res) => {
			toast.success("Xóa thành công");
			handleSetStatus();
		});
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "user_code", dataIndex: "user_code", key: "user_code" },
		{ title: "Tên", dataIndex: "name", key: "name" },
		{ title: "user_name", dataIndex: "user_name", key: "user_name" },
		{ title: "Email", dataIndex: "email", key: "email" },
		{
			title: "Giới tính",
			render: (record) => {
				if (record.gender === 1) return "Nam";
				else return "Nữ";
			},
		},
		{
			title: "CMND",
			dataIndex: "identity_code",
			key: "identity_code",
		},
		{
			title: "Ngày cấp",
			dataIndex: "identity_date",
			key: "identity_date",
		},
		{ title: "Ngày Sinh", dataIndex: "birthday", key: "birthday" },
		{ title: "Địa chỉ", dataIndex: "address", key: "address" },
		{ title: "Số điện thoại", dataIndex: "phone", key: "phone" },
		{
			title: "Nhóm Group",

			render: (record) => {
				for (var i = 0; i < listGroup.length; i++) {
					if (listGroup[i].id === record.group_id) {
						return listGroup[i].name;
					}
				}
			},
		},
		{ title: "Ngày làm việc", dataIndex: "work_date_at", key: "work_date_at" },
		{
			title: "Thao tác",
			render: (record) => (
				<div className=" h-full flex justify-center items-center flex-wrap">
					<img
						src="/images/Actions/Edit.png"
						alt="Edit"
						className="ml-2 mr-1  cursor-pointer"
						onClick={() => handleUpdateEmployee(record)}
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
					<span className="titleMainContain">Danh sách nhân viên</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddListEmployee}
				>
					<span className="add"></span>
					<span>Thêm mới</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table
					rowKey={(record) => record.id}
					dataSource={listEmployee}
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
			<ModalAddEmployee
				visible={visible}
				listGroup={listGroup}
				handleSetStatus={handleSetStatus}
				handleAddListEmployee={handleAddListEmployee}
			/>
			<ModalUpdateEmployee
				listGroup={listGroup}
				visibleUpdate={visibleUpdate}
				handleUpdateEmployee={handleUpdateEmployee}
				handleSetStatus={handleSetStatus}
			/>
		</div>
	);
}

export default ManagerEmployee;
