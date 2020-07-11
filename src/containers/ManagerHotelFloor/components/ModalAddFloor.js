import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React from "react";

ModalAddHotel.propTypes = {};

function ModalAddHotel(props) {
	const { visible, handleAddFloor } = props;

	function handleSubmit(e) {
		e.preventDefault();
	}

	return (
		<Modal
			visible={visible}
			onCancel={handleAddFloor}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={350}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm lầu mới</span>
				</div>
				<div className="modal_content">
					<form onSubmit={handleSubmit}>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Tên tầng:</div>
							<input type="text" style={{ width: 160 }} className="dashboard" />
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Số lượng phòng:</div>
							<input type="text" style={{ width: 160 }} className="dashboard" />
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Loại phòng:</div>
							<select defaultValue="1" className="focus:outline-none">
								<option value="1">Phòng Đơn</option>
								<option value="2">Phòng Đôi</option>
							</select>
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Ghi chú:</div>
							<TextArea style={{ width: 166 }} />
						</div>
						<div
							className="flex items-center justify-end"
							style={{ marginRight: 45 }}
						>
							<button
								className="submit_cancel_Building focus:outline-none"
								onClick={handleAddFloor}
							>
								Cancel
							</button>
							<button className="focus:outline-none">Thêm</button>
						</div>
					</form>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleAddFloor}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddHotel;
