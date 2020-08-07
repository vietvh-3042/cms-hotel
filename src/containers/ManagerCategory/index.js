import { Popconfirm, Table } from "antd";
import CommonApi from "helpers/APIS/CommonApi";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalAddCategory from "./components/ModalAddCategory";
import ModalUpdateCategory from "./components/ModalUpdateCategory";
import { toast } from "react-toastify";

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

	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	useEffect(() => {
		async function getListCategory() {
			setLoading(true);
			const paramString = queryString.stringify(filters);
			CommonApi("GET", `/tenant/category/category?${paramString}`, null).then(
				(res) => {
					setLoading(false);
					res.data.data.forEach((infor, index) => {
						allData.push({
							...infor,
							STT: index + 1,
						});
					});
					setListCategory(allData);
					setPagination(res.data.meta.pagination.total);
				}
			);
		}
		async function getListTypeCategory() {
			CommonApi("GET", "/tenant/category/type-category", null).then((res) => {
				setListTypeCategory(res.data.data);
			});
		}
		getListCategory();
		getListTypeCategory();
	}, [filters, status, hotel_ID]);

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

	function confirm(id) {
		CommonApi("DELETE", `/tenant/category/category/${id}`, null).then((res) => {
			toast.success("Xóa thành công");
			handleSetStatus();
		});
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Mã", dataIndex: "category_code", key: "category_code" },
		{ title: "Nhóm Dịch vụ", dataIndex: "name", key: "name" },
		{
			title: "Loại Dịch vụ",
			render: (record) => {
				for (var i = 0; i < listTypeCategory.length; i++) {
					if (listTypeCategory[i].id === record.type_category_id) {
						return listTypeCategory[i].name;
					}
				}
			},
		},
		{ title: "Ghi chú", dataIndex: "note", key: "note" },
		{
			title: "Thao tác",
			width: "120px",
			render: (record) => (
				<div className=" h-full flex items-center">
					<img
						src="/images/Actions/Edit.png"
						alt="Edit"
						className="mr-1  cursor-pointer"
						onClick={() => handleUpdateCategory(record)}
					/>
					<Popconfirm
						title="Bạn thực sự muốn xóa bản ghi này"
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
