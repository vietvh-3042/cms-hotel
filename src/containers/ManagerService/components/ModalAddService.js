import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";

ModalAddService.propTypes = {
	handleAddListService: PropTypes.func,
};
ModalAddService.defaultProps = {
	handleAddListService: null,
};

function ModalAddService(props) {
	const { visible, handleAddListService } = props;
	function handleSubmit(e) {
		e.preventDefault();
	}
	return (
		<Modal
			visible={visible}
			onCancel={handleAddListService}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={400}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-update"></span>
					<span>Thêm một dịch vụ mới</span>
				</div>
				<div className="modal_content">
					<form onSubmit={handleSubmit}>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Tên Dịch vụ:</div>
							<input type="text" style={{ width: 200 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Nhóm Dịch vụ:</div>
							<select style={{ width: 206 }} className="focus:outline-none">
								<option value="1">Chọn Nhóm Dịch Vụ</option>
								<option value="2">Đồ Uống</option>
								<option value="3">Đồ Ăn</option>
							</select>
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Giá Bán:</div>
							<input type="text" style={{ width: 200 }} className="dashboard" />
							<img
								src="/images/Modal/addAction.png"
								alt="addAction"
								className="ml-2 cursor-pointer"
							/>
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Ghi chú:</div>
							<TextArea style={{ width: 206 }} />
						</div>
						<div
							className="flex items-center justify-end"
							style={{ marginRight: 45 }}
						>
							<button
								className="submit_cancel_Building focus:outline-none"
								onClick={handleAddListService}
							>
								Cancel
							</button>
							<button className="dashboardButton focus:outline-none">
								Thêm
							</button>
						</div>
					</form>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleAddListService}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddService;
