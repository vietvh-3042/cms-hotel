import { Modal } from "antd";
import Axios from "axios";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { endpoint } from "settings";

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

	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	function handleDelete() {
		Axios({
			method: "DELETE",
			url: endpoint + "/tenant/hotel-manager/room/" + visibleDelete.detail,
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
				"hotel-id": hotel_ID,
			},
		}).then((res) => {
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
