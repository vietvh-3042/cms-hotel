import React, { useState } from "react";
import PropTypes from "prop-types";
import { Table, Popconfirm } from "antd";
import ModalAddService from "./components/ModalAddService";

ManagerService.propTypes = {};

function ManagerService(props) {
	const [loading, setLoading] = useState(false);
	const [listService, setListService] = useState([]);
	const [pagination, setPagination] = useState();
	const [visible, setVisible] = useState(false);
	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
	});

	function handleAddListService() {
		setVisible(!visible);
	}

	function handleOnChange(pagination) {
		setFilter({
			...filters,
			page: pagination.current,
		});
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
				visible={visible}
				handleAddListService={handleAddListService}
			/>
		</div>
	);
}

export default ManagerService;
