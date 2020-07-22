import { updateHotelFloor } from "redux/actions/hotel_floor";
import { Modal } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

ModalUpdate.propTypes = {
	visible: PropTypes.object,
	handleUpdateFloor: PropTypes.func,
	handleSetStatus: PropTypes.func,
};

ModalUpdate.defaultProps = {
	visible: null,
	handleUpdateFloor: null,
	handleSetStatus: null,
};

function ModalUpdate(props) {
	const distPatch = useDispatch();
	const { visible, handleUpdateFloor, handleSetStatus } = props;
	const [name, setName] = useState("");
	const [note, setNote] = useState("");
	const { register, handleSubmit, errors } = useForm();

	function onSubmit(data) {
		const id = visible.detail.id;
		distPatch(
			updateHotelFloor(id, data, (er, res) => {
				if (res) {
					handleUpdateFloor({ visible: false, detail: {} });
					handleSetStatus();
				}
			})
		);
	}
	useEffect(() => {
		if (visible !== null) {
			setName(visible.detail.name || "");
			setNote(visible.detail.note || "");
		}
	}, [visible]);

	return (
		<Modal
			visible={visible.visible}
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
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Tầng:</div>
							<input
								type="text"
								style={{ width: 160 }}
								className="dashboard"
								name="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								ref={register({ required: true })}
							/>
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Ghi chú:</div>
							<textarea
								style={{ width: 166 }}
								className="focus:outline-none border-none"
								name="note"
								value={note}
								onChange={(e) => setNote(e.target.value)}
								ref={register({ required: true })}
							/>
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
					onClick={handleUpdateFloor}
				/>
			</div>
		</Modal>
	);
}

export default ModalUpdate;
