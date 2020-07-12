import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";

ModalUpdateReceipt.propTypes = {
	handleUpdateReceipt: PropTypes.func,
};

ModalUpdateReceipt.defaultProps = {
	handleUpdateReceipt: null,
};

function ModalUpdateReceipt(props) {
	const { visible, handleUpdateReceipt } = props;
	function handleSubmit(e) {
		e.preventDefault();
	}
	return (
		<Modal
			visible={visible}
			onCancel={handleUpdateReceipt}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={380}
		>
			<div className="relative">
				<div className="modal_header_action flex items-center">
					<img
						src="http://server6.skyhotel.vn/images/icons/moneyediticon32.png"
						alt="phieu thu"
						style={{ marginRight: 10 }}
					/>
					<span>Sửa phiếu thu tiền</span>
				</div>
				<div className="modal_content">
					<form onSubmit={handleSubmit}>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Diễn giải thu:</div>
							<input type="text" style={{ width: 200 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Số tiền phải thu:</div>
							<input type="text" style={{ width: 200 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Hình thức trả:</div>
							<select defaultValue="1" style={{ width: 206 }}>
								<option value="1">Tiền Mặt</option>
								<option value="2">Chuyển Khoản</option>
								<option value="3">Thẻ Tín Dụng</option>
							</select>
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Tên người trả:</div>
							<input type="text" style={{ width: 200 }} className="dashboard" />
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
								onClick={handleUpdateReceipt}
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
					onClick={handleUpdateReceipt}
				/>
			</div>
		</Modal>
	);
}

export default ModalUpdateReceipt;
