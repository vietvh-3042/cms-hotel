import React, { useState, useEffect } from "react";
import { Table, Tag } from "antd";
import { useSelector } from "react-redux";
import CommonApi from "helpers/APIS/CommonApi";
import queryString from "query-string";

ManagerBill.propTypes = {};

function ManagerBill(props) {
	const allData = [];

	const [status, setStatus] = useState(false);

	const [loading, setLoading] = useState(false);

	const [listBill, setListBill] = useState([]);

	const [pagination, setPagination] = useState();

	const [filters, setFilter] = useState({
		limit: 10,
		page: 1,
		include: "checkIn.typeCheckIn,customer,employee,paymentMethod",
	});

	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	useEffect(() => {
		async function getListBill() {
			setLoading(true);
			const paramString = queryString.stringify(filters);
			CommonApi("GET", `/tenant/checkin-manager/bill?${paramString}`, null).then(
				(res) => {
					setLoading(false);
					res.data.data.forEach((infor, index) => {
						allData.push({
							...infor,
							STT: index + 1,
						});
					});
					setListBill(allData);
					setPagination(res.data.meta.pagination.total);
				}
			);
		}
		getListBill();
	}, [filters, status, hotel_ID]);

	function handleOnChange(pagination) {
		setFilter({
			...filters,
			page: pagination.current,
		});
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Mã HĐ", dataIndex: "bill_code", key: "bill_code" },
		{
			title: "Tên khách hàng",
			render: (record) => {
				if (record.customer) {
					if (record.customer.data.name)
						return (
							<Tag color="#3b5999" className="mb-1 text-center w-full">
								{record.customer.data.name}
							</Tag>
						);
					else return null;
				}
			},
		},
		{
			title: "Vào lúc",
			render: (record) => {
				if (record.checkIn) {
					if (record.checkIn.data.date_in)
						return (
							<Tag color="#3b5999" className="mb-1 text-center w-full">
								{record.checkIn.data.date_in}
							</Tag>
						);
					else return null;
				}
			},
		},
		{
			title: "Trả lúc",
			render: (record) => {
				if (record.checkIn) {
					if (record.checkIn.data.date_out)
						return (
							<Tag color="#3b5999" className="mb-1 text-center w-full">
								{record.checkIn.data.date_out}
							</Tag>
						);
					else return null;
				}
			},
		},
		{ title: "Tổng cộng", dataIndex: "STT", key: "STT" },
		{
			title: "Trạng thái",
			render: (record) => {
				if (record.checkIn) {
					if (record.checkIn.data.status === 1)
						return (
							<Tag color="green" className="mb-1 text-center w-full">
								Đã thanh toán
							</Tag>
						);
					else
						return (
							<Tag color="red" className="mb-1 text-center w-full">
								Chưa thanh toán
							</Tag>
						);
				}
			},
		},
		{
			title: "Hình thức TT",
			render: (record) => {
				if (record.paymentMethod) {
					if (record.paymentMethod.data.name)
						return (
							<Tag color="#3b5999" className="mb-1 text-center w-full">
								{record.paymentMethod.data.name}
							</Tag>
						);
					else return null;
				}
			},
		},
		{
			title: "NV Checkin",
			render: (record) => {
				if (record.employee) {
					if (record.employee.data.name)
						return (
							<Tag color="#3b5999" className="mb-1 text-center w-full">
								{record.employee.data.name}
							</Tag>
						);
					else return null;
				}
			},
		},
		{
			title: "NV Checkout",
			render: (record) => {
				if (record.employee) {
					if (record.employee.data.name)
						return (
							<Tag color="#3b5999" className="mb-1 text-center w-full">
								{record.employee.data.name}
							</Tag>
						);
					else return null;
				}
			},
		},
	];

	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="http://server6.skyhotel.vn/images/icons/hoadon.png"
						alt="revenue"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Danh sách hóa đơn</span>
				</div>
			</div>
			<div className="mt-2 mx-2">
				<Table
					rowKey={(record) => record.id}
					dataSource={listBill}
					columns={columns}
					loading={loading}
					scroll={{ x: 1300 }}
					bordered
					pagination={{
						total: pagination,
						pageSize: filters.limit,
						current: filters.page,
					}}
					onChange={handleOnChange}
				/>
			</div>
		</div>
	);
}

export default ManagerBill;
