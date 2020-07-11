import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import PropTypes from "prop-types";
import React from "react";

ModalUpdate.propTypes = {
	handleUpdateHotel: PropTypes.func,
};

ModalUpdate.defaultProps = {
	handleUpdateHotel: null,
};

function ModalUpdate(props) {
	const { handleUpdateHotel, visible } = props;
	return (
		<Modal
			visible={visible}
			onCancel={handleUpdateHotel}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={425}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Chỉnh sửa thông tin</span>
				</div>
				<div className="modal_content">
					<form>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Tên khách sạn:</div>
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
							<div className="LabelCo">CA khu vực:</div>
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
								onClick={handleUpdateHotel}
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
					onClick={handleUpdateHotel}
				/>
			</div>
		</Modal>
	);
}

export default ModalUpdate;
