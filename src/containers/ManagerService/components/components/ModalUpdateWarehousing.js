import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import PropTypes from "prop-types";
import React from "react";
import { useParams } from "react-router-dom";

ModalAddWarehousing.propTypes = {
	handleUpdateWarehousing: PropTypes.func,
};

ModalAddWarehousing.defaultProps = {
	handleUpdateWarehousing: null,
};

function ModalAddWarehousing(props) {
	let { id } = useParams();
	const { visible, handleUpdateWarehousing } = props;
	return (
		<Modal
			visible={visible}
			onCancel={handleUpdateWarehousing}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={340}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-download"></span>
					<span>{`Chỉnh sửa nhập kho [${id}]`}</span>
				</div>
				<div className="modal_content">
					<div className="flex items-center mb-2">
						<div className="LabelCo">Số lượng:</div>
						<input type="text" style={{ width: 170 }} className="dashboard" />
					</div>
					<div className="flex items-center mb-2">
						<div className="LabelCo">Giá nhập:</div>
						<input type="text" style={{ width: 170 }} className="dashboard" />
					</div>
					<div className="flex items-center mb-2">
						<div className="LabelCo">Thành tiền:</div>
						<input type="text" style={{ width: 170 }} className="dashboard" />
					</div>
					<div className="flex items-center mb-2">
						<div className="LabelCo">Ghi chú:</div>
						<TextArea style={{ width: 176 }} />
					</div>
					<div
						className="flex items-center justify-end"
						style={{ marginRight: 20 }}
					>
						<button
							className="submit_cancel_Building focus:outline-none"
							onClick={handleUpdateWarehousing}
						>
							Cancel
						</button>
						<button className="dashboardButton focus:outline-none">
							Nhập kho
						</button>
					</div>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleUpdateWarehousing}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddWarehousing;
