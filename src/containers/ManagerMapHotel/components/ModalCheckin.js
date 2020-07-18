import { Input, Modal, Table } from "antd";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useSelector } from "react-redux";

const { Search } = Input;

ModalCheckin.propTypes = {
	handleCheckin: PropTypes.func,
};

ModalCheckin.defaultProps = {
	handleCheckin: null,
};

function ModalCheckin(props) {
	const { visible, handleCheckin } = props;
	const [loading, setLoading] = useState(true);

	const view = useSelector((state) => state.App.view);

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Code Book", dataIndex: "STT", key: "STT" },
		{ title: "Khách hàng", dataIndex: "STT", key: "STT" },
		{ title: "CMND/Passport", dataIndex: "STT", key: "STT" },
		{ title: "Checkin", dataIndex: "STT", key: "STT" },
		{ title: "Checkout", dataIndex: "STT", key: "STT" },
		{ title: "Phòng", dataIndex: "STT", key: "STT" },
		{ title: "Loại phòng", dataIndex: "STT", key: "STT" },
		{ title: "Group/CTY", dataIndex: "STT", key: "STT" },
		{ title: "Ghi chú", dataIndex: "STT", key: "STT" },
		{ title: "Đặt cọc", dataIndex: "STT", key: "STT" },
		{ title: "Nhân viên", dataIndex: "STT", key: "STT" },
		{ title: "Ngày tạo", dataIndex: "STT", key: "STT" },
		{ title: "Thao tác", dataIndex: "STT", key: "STT" },
	];

	const allData = [];

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
					<Search
						placeholder="input search text"
						onSearch={(value) => console.log(value)}
						enterButton
					/>

					<Table
						dataSource={allData}
						columns={columns}
						loading={loading}
						scroll={{ x: true }}
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
