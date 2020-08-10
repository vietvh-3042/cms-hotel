import { Input, Modal, Table, Popconfirm, Tag } from "antd";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CommonApi from "helpers/APIS/CommonApi";
import queryString from "query-string";

ModalCheckin.propTypes = {
	handleCheckin: PropTypes.func,
};

ModalCheckin.defaultProps = {
	handleCheckin: null,
};

function ModalCheckin(props) {
	const allData = [];

	const { visible, handleCheckin } = props;

	const [loading, setLoading] = useState(false);

	const [listCheckin, setListCheckin] = useState([]);

	const [pagination, setPagination] = useState();

	const view = useSelector((state) => state.App.view);

	const [filters, setFilter] = useState({
		limit: 5,
		page: 1,
		include: "customer,room.typeRoom",
	});

	useEffect(() => {
		async function getListCheckin() {
			setLoading(true);
			const paramString = queryString.stringify(filters);
			CommonApi(
				"GET",
				`/tenant/checkin-manager/checkin?${paramString}`,
				null
			).then((res) => {
				setLoading(false);
				res.data.data.forEach((infor, index) => {
					allData.push({
						...infor,
						STT: index + 1,
					});
				});
				setListCheckin(allData);
				setPagination(res.data.meta.pagination.total);
			});
		}
		getListCheckin();
	}, [filters]);

	function handleOnChange(pagination) {
		setFilter({
			...filters,
			page: pagination.current,
		});
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Code Book", dataIndex: "code_book", key: "code_book" },
		{
			title: "Khách hàng",
			render: (record) => {
				if (record.customer) {
					return record.customer.data.map((value, key) => (
						<Tag color="#3b5999" className="mb-1 text-center w-full" key={key}>
							{value.name}
						</Tag>
					));
				}
			},
		},
		{
			title: "CMND/Passport",
			render: (record) => {
				if (record.customer) {
					return record.customer.data.map((value, key) => (
						<Tag color="#3b5999" className="mb-1 text-center w-full" key={key}>
							{value.identity_code}
						</Tag>
					));
				}
			},
		},
		{
			title: "Địa chỉ",
			render: (record) => {
				if (record.customer) {
					return record.customer.data.map((value, key) => (
						<Tag color="#3b5999" className="mb-1 text-center w-full" key={key}>
							{value.address}
						</Tag>
					));
				}
			},
		},
		{ title: "Giá Checkin", dataIndex: "price_check_in", key: "price_check_in" },
		{
			title: "Phòng",
			render: (record) => {
				if (record.room) {
					return record.room.data.map((value, key) => (
						<Tag color="#3b5999" className="mb-1 text-center w-full" key={key}>
							{value.name}
						</Tag>
					));
				}
			},
		},
		{
			title: "Loại phòng",
			render: (record) => {
				if (record.room) {
					return record.room.data.map((value, key) => {
						if (value.typeRoom)
							return (
								<Tag color="#3b5999" className="mb-1 text-center w-full" key={key}>
									{value.typeRoom.data.name}
								</Tag>
							);
					});
				}
			},
		},
		{ title: "Ghi chú", dataIndex: "note", key: "note" },
		{ title: "Đặt cọc", dataIndex: "prepayment", key: "prepayment" },
		{
			title: "Nhân viên",
			render: (record) => {
				return <Tag color="#3b5999">vuhongviet</Tag>;
			},
		},
		{ title: "Ngày tạo", dataIndex: "created_at", key: "created_at" },
	];

	return (
		<Modal
			visible={visible}
			onCancel={handleCheckin}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={view === "TabView" ? 700 : view === "DesktopView" ? 1150 : 520}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>DS Checkin</span>
				</div>
				<div className="modal_content">
					<Table
						rowKey={(record) => record.id}
						dataSource={listCheckin}
						bordered
						columns={columns}
						loading={loading}
						scroll={{ x: 1300 }}
						pagination={{
							total: pagination,
							pageSize: filters.limit,
							current: filters.page,
						}}
						onChange={handleOnChange}
					/>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleCheckin}
				/>
			</div>
		</Modal>
	);
}

export default ModalCheckin;
