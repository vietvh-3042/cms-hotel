import { Popconfirm, Table } from "antd";
import CommonApi from "helpers/APIS/CommonApi";
import queryString from "query-string";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalAddReceipt from "./components/ModalAddReceipt";
import ModalUpdateReceipt from "./components/ModalUpdateReceipt";

ManagerReceipts.propTypes = {};

function ManagerReceipts(props) {
	const allData = [];

	const [loading, setLoading] = useState(false);

	const [status, setStatus] = useState(false);

	const [listReceipts, setListReceipts] = useState([]);

	const [pagination, setPagination] = useState();

	const [visible, setVisible] = useState(false);

	const [visibleUpdate, setVisibleUpdate] = useState(false);

	const [listPaymentMethod, setListPaymentMethod] = useState([]);

	const [listEmployee, setListEmployee] = useState([]);

	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
		include: "bills",
	});

	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	useEffect(() => {
		async function getListReceipt() {
			setLoading(true);
			const paramString = queryString.stringify(filters);
			CommonApi("GET", `/tenant/payslip-receipt/receipt?${paramString}`).then(
				(res) => {
					setLoading(false);
					res.data.data.forEach((infor, index) => {
						allData.push({
							...infor,
							STT: index + 1,
						});
					});
					setListReceipts(allData);

					setPagination(res.data.meta.pagination.total);
				}
			);
		}

		async function getListPaymentMethod() {
			CommonApi(
				"GET",
				"/tenant/payslip-receipt/payment-method",
				null
			).then((res) => setListPaymentMethod(res.data.data));
		}

		async function getListEmployee() {
			CommonApi("GET", "/tenant/acl/employees", null).then((res) =>
				setListEmployee(res.data.data)
			);
		}

		getListReceipt();
		getListPaymentMethod();
		getListEmployee();
	}, [filters, status, hotel_ID]);

	function handleAddReceipt() {
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

	function handleUpdateReceipt(value) {
		setVisibleUpdate({
			visible: !visibleUpdate.visible,
			detail: value,
		});
	}

	function confirm(id) {
		CommonApi("DELETE", `/tenant/payslip-receipt/receipt/${id}`).then((res) => {
			toast.success("X??a th??nh c??ng");
			handleSetStatus();
		});
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "M?? Phi???u", dataIndex: "receipt_code", key: "receipt_code" },
		{
			title: "Ng??y t???o",
			dataIndex: "date_created",
			key: "date_created",
		},

		{ title: "Di???n gi???i phi???u thu", dataIndex: "content", key: "content" },
		{ title: "S??? ti???n", dataIndex: "amount", key: "amount" },
		{
			title: "H??nh th???c",
			render: (record) => {
				for (var i = 0; i < listPaymentMethod.length; i++) {
					if (listPaymentMethod[i].id === record.payment_method_id) {
						return listPaymentMethod[i].name;
					}
				}
			},
		},
		{ title: "Ng?????i tr???", dataIndex: "", key: "" },
		{
			title: "T???o b???i",
			render: (record) => {
				for (var i = 0; i < listEmployee.length; i++) {
					if (listEmployee[i].id === record.employee_id) {
						return listEmployee[i].name;
					}
				}
			},
		},
		{ title: "Ghi ch??", dataIndex: "note", key: "note" },
		{
			title: "Thao t??c",
			render: (record) => (
				<div className=" h-full flex justify-center items-center flex-wrap">
					<Popconfirm
						title="B???n th???c s??? mu???n x??a b???n ghi n??y?"
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
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="/images/Sidebar/TienChi/receipts.png"
						alt="list-service"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Qu???n l?? phi???u thu </span>
				</div>
				<div>
					<button
						className="dashboardButton mr-3 focus:outline-none"
						onClick={handleAddReceipt}
					>
						<span className="add"></span>
						<span>Th??m</span>
					</button>
				</div>
			</div>
			<div className="mt-2 mx-2">
				<Table
					rowKey={(record) => record.id}
					dataSource={listReceipts}
					columns={columns}
					loading={loading}
					scroll={{ x: 1200 }}
					bordered
					pagination={{
						total: pagination,
						pageSize: filters.limit,
						current: filters.page,
					}}
					onChange={handleOnChange}
				/>
			</div>
			<ModalAddReceipt
				visible={visible}
				handleSetStatus={handleSetStatus}
				handleAddReceipt={handleAddReceipt}
			/>
			<ModalUpdateReceipt
				visibleUpdate={visibleUpdate}
				handleUpdateReceipt={handleUpdateReceipt}
				handleSetStatus={handleSetStatus}
			/>
		</div>
	);
}

export default ManagerReceipts;
