import { Modal } from "antd";
import CommonApi from "helpers/APIS/CommonApi";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";

ModalDeleteRoom.propTypes = {
	handleDeleteRoom: PropTypes.func,
	handleStatus: PropTypes.func,
};

ModalDeleteRoom.defaultProps = {
	handleDeleteRoom: null,
	handleStatus: null,
};

function ModalDeleteRoom(props) {
	const { visibleDelete, handleDeleteRoom, handleStatus } = props;

	function handleDelete() {
		CommonApi(
			"DELETE",
			`/tenant/hotel-manager/room/${visibleDelete.detail}`,
			null
		).then((res) => {
			toast.success("Xóa thành công");
			handleDeleteRoom();
			handleStatus();
		});
	}
	return (
		<Modal
			visible={visibleDelete.visible}
			onCancel={handleDeleteRoom}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={390}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Xác Nhận</span>
				</div>
				<div className="modal_content">
					<div className="font-bold">Bạn thực sự muốn xóa?</div>
					<div
						className="flex items-center justify-end"
						style={{ marginRight: 45 }}
					>
						<button
							className="submit_cancel_Building focus:outline-none"
							onClick={handleDeleteRoom}
						>
							Cancel
						</button>
						<button
							className="dashboardButton focus:outline-none"
							onClick={handleDelete}
						>
							OK
						</button>
					</div>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleDeleteRoom}
				/>
			</div>
		</Modal>
	);
}

export default ModalDeleteRoom;
