import { Table, Popconfirm, Tag } from "antd";
import CommonApi from "helpers/APIS/CommonApi";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ModalAddService from "./components/ModalAddService";
import ModalUpdateService from "./components/ModalUpdateService";
import { toast } from "react-toastify";

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

	const [visibleUpdate, setVisibleUpdate] = useState({
		visible: false,
		detail: {},
	});

	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	useEffect(() => {
		async function getListService() {
			setLoading(true);
			const paramString = queryString.stringify(filters);
			CommonApi("GET", `/tenant/service-storage/services?${paramString}`).then(
				(res) => {
					setLoading(false);
					res.data.data.forEach((infor, index) => {
						allData.push({
							...infor,
							STT: index + 1,
						});
					});
					setListService(allData);
					setPagination(res.data.meta.pagination.total);
				}
			);
		}
		async function getListCategory() {
			CommonApi("GET", "/tenant/category/category").then((res) => {
				setListCategory(res.data.data);
			});
		}
		getListService();
		getListCategory();
	}, [filters, status, hotel_ID]);

	function handleAddListService() {
		setVisible(!visible);
	}

	function handleUpdateService(record) {
		setVisibleUpdate({
			visible: !visibleUpdate.visible,
			detail: record,
		});
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

	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	function confirm(id) {
		CommonApi("DELETE", `/tenant/service-storage/services/${id}`, null).then(
			(res) => {
				toast.success("Xóa thành công");
				handleSetStatus();
			}
		);
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Mã dịch vụ", dataIndex: "service_code", key: "service_code" },
		{ title: "Tên dịch vụ", dataIndex: "name", key: "name", width: "15%" },
		{
			title: "Giá bán",
			render: (record) => (
				<b className="ml-2 bold">{format_current(record.price)}</b>
			),
		},
		{
			title: "Loại dịch vụ",
			render: (record) => {
				for (var i = 0; i < listCategory.length; i++) {
					if (listCategory[i].id === record.category_id) {
						return (
							<Tag color="purple" className="mb-1 text-center w-full">
								{listCategory[i].name}
							</Tag>
						);
					}
				}
			},
		},
		{ title: "Ghi chú", dataIndex: "note", key: "note" },
		{
			title: "Thao tác",
			width: "10%",
			render: (record) => (
				<div className=" h-full flex justify-center items-center flex-wrap">
					<img
						src="/images/Actions/Edit.png"
						alt="Edit"
						className="ml-2 mr-1  cursor-pointer"
						onClick={() => handleUpdateService(record)}
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
			<ModalUpdateService
				listCategory={listCategory}
				visibleUpdate={visibleUpdate}
				handleUpdateService={handleUpdateService}
				handleSetStatus={handleSetStatus}
			/>
		</div>
	);
}

export default ManagerService;
