import { Modal } from "antd";
import React from "react";
import TextArea from "antd/lib/input/TextArea";

ModalAddHotel.propTypes = {};

function ModalAddHotel(props) {
	const { visible, handleAddHotel } = props;

	return (
		<Modal
			visible={visible}
			onCancel={handleAddHotel}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={425}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm khách sạn</span>
				</div>
				<div className="modal_content">
					<form>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Tên khách sạn:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Số lầu:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Số phòng:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Số phòng trệt:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Địa chỉ:</div>
							<input type="text" style={{ width: 220 }} className="dashboard" />
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Thành phố:</div>
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
								onClick={handleAddHotel}
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
					onClick={handleAddHotel}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddHotel;
