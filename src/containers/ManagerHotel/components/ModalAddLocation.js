import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";

ModalAddLocation.propTypes = {
	handleAddLocation: PropTypes.func,
};

ModalAddLocation.defaultProps = {
	handleAddLocation: null,
};

function ModalAddLocation(props) {
	const { handleAddLocation, visible } = props;
	return (
		<Modal
			visible={visible}
			onCancel={handleAddLocation}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={425}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm khu vực</span>
				</div>
				<div className="modal_content">
					<form>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Tên khu vực:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Tên vị trí:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Số Dãy.Lầy:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Tổng số:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Mã hóa đơn:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Địa chỉ:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Tỉnh/Thành phố:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Phone:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Email:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Website:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Ghi chú:</div>
							<TextArea style={{ width: 226 }} />
						</div>
						<div
							className="flex items-center justify-end"
							style={{ marginRight: 45 }}
						>
							<button
								className="submit_cancel_Building focus:outline-none"
								onClick={handleAddLocation}
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
					onClick={handleAddLocation}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddLocation;
