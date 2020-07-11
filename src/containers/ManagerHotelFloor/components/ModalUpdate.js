import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";

ModalUpdate.propTypes = {};

function ModalUpdate(props) {
	const { visible, handleUpdateFloor } = props;
	function handleSubmit(e) {
		e.preventDefault();
	}

	return (
		<Modal
			visible={visible}
			onCancel={handleUpdateFloor}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={350}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-update"></span>
					<span>Sửa tầng</span>
				</div>
				<div className="modal_content">
					<form onSubmit={handleSubmit}>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Tầng:</div>
							<input type="text" style={{ width: 160 }} className="dashboard" />
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
								onClick={handleUpdateFloor}
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
					onClick={handleUpdateFloor}
				/>
			</div>
		</Modal>
	);
}

export default ModalUpdate;
