import { Popconfirm, Table } from "antd";
import CommonApi from "helpers/APIS/CommonApi";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ModalAddCustomer from "./components/ModalAddCustomer";
import ModalUpdateCustomer from "./components/ModalUpdateCustomer";

ManagerCustomer.propTypes = {};

function ManagerCustomer(props) {
	const allData = [];

	const [status, setStatus] = useState(false);

	const [loading, setLoading] = useState(false);

	const [listCustomer, setListCustomer] = useState([]);

	const [pagination, setPagination] = useState();

	const [visible, setVisible] = useState(false);

	const [listNation, setListNation] = useState([]);

	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
	});

	const [visibleUpdate, setVisibleUpdate] = useState({
		visible: false,
		detail: {},
	});

	useEffect(() => {
		async function getListCustomer() {
			setLoading(true);
			const paramString = queryString.stringify(filters);
			CommonApi("GET", `/tenant/customer-manager/customer?${paramString}`).then(
				(res) => {
					setLoading(false);
					res.data.data.forEach((infor, index) => {
						allData.push({
							...infor,
							STT: index + 1,
						});
					});
					setListCustomer(allData);
					setPagination(res.data.meta.pagination.total);
				}
			);
		}

		async function getListNation() {
			CommonApi("GET", "/tenant/nation-manager/nations", null).then((res) =>
				setListNation(res.data.data)
			);
		}
		getListCustomer();
		getListNation();
	}, [filters, status]);

	function handleAddListCustomer() {
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
		CommonApi("DELETE", `/tenant/customer-manager/customer/${id}`).then((res) => {
			toast.success("Xóa thành công");
			handleSetStatus();
		});
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Tên", dataIndex: "name", key: "name" },
		{ title: "CMND/PassPort", dataIndex: "identity_code", key: "identity_code" },
		{
			title: "Ngày cấp",
			dataIndex: "identity_date",
			key: "identity_date",
		},
		{ title: "Địa chỉ", dataIndex: "address", key: "address" },
		{
			title: "Quốc tịch",
			render: (record) => {
				for (var i = 0; i < listNation.length; i++) {
					if (listNation[i].id === record.nation_id) {
						return listNation[i].name;
					}
				}
			},
		},
		{
			title: "Thao tác",
			render: (record) => (
				<div className=" h-full flex items-center">
					<img
						src="/images/Actions/Edit.png"
						alt="Edit"
						className="mr-1  cursor-pointer"
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
					<span className="titleMainContain">Danh sách khách hàng</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddListCustomer}
				>
					<span className="add"></span>
					<span>Thêm mới</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table
					rowKey={(record) => record.id}
					dataSource={listCustomer}
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
			<ModalAddCustomer
				visible={visible}
				handleSetStatus={handleSetStatus}
				handleAddListCustomer={handleAddListCustomer}
			/>
			<ModalUpdateCustomer
				visibleUpdate={visibleUpdate}
				handleUpdateEmployee={handleUpdateEmployee}
				handleSetStatus={handleSetStatus}
			/>
		</div>
	);
}

export default ManagerCustomer;
