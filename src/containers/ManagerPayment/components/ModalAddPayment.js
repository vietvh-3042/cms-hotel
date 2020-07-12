import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import PropTypes from "prop-types";
import React from "react";

ModalAddPayment.propTypes = {
	handleAddPayment: PropTypes.func,
};

ModalAddPayment.defaultProps = {
	handleAddPayment: null,
};

function ModalAddPayment(props) {
	const { visible, handleAddPayment } = props;
	function handleSubmit(e) {
		e.preventDefault();
	}
	return (
		<Modal
			visible={visible}
			onCancel={handleAddPayment}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={390}
		>
			<div className="relative">
				<div className="modal_header_action flex items-center">
					<img
						src="http://server6.skyhotel.vn/images/icons/costcaraddt32.png"
						alt="phieu thu"
						style={{ marginRight: 10 }}
					/>
					<span>Thêm phiếu chi phí</span>
				</div>
				<div className="modal_content">
					<form onSubmit={handleSubmit}>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Diễn giải chi phí:</div>
							<input type="text" style={{ width: 200 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Số tiền:</div>
							<input type="text" style={{ width: 200 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Hình thức trả:</div>
							<select style={{ width: 206 }}>
								<option value="">---Chọn loại chi phí---</option>
								<option value="1">Đồ dùng</option>
								<option value="2">Điện Nước</option>
								<option value="3">Tiền Lương</option>
							</select>
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Chi bằng:</div>
							<select defaultValue="1" style={{ width: 206 }}>
								<option value="1">Tiền Mặt</option>
								<option value="2">Chuyển Khoản</option>
								<option value="3">Thẻ Tín Dụng</option>
							</select>
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Tên nhận:</div>
							<input type="text" style={{ width: 200 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Trạng thái:</div>
							<input type="checkbox" />
							<label
								htmlFor="cost_payok"
								className="mb-0 font-medium text-black text-xs"
							>
								Đã thanh toán
							</label>
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
								onClick={handleAddPayment}
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
					onClick={handleAddPayment}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddPayment;
