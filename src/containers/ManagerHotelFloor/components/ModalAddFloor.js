import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { createHotelFloor } from "redux/actions/hotel_floor";

ModalAddHotel.propTypes = {
	handleSetStatus: PropTypes.func,
};

ModalAddHotel.defaultProps = {
	handleSetStatus: null,
};

function ModalAddHotel(props) {
	const distPatch = useDispatch();
	const { visible, handleAddFloor, handleSetStatus } = props;
	const [name, setName] = useState("");
	const [number_room, setNumber_room] = useState("");
	const [note, setNote] = useState("");
	const { register, handleSubmit, errors } = useForm();

	function onSubmit(data) {
		distPatch(
			createHotelFloor(
				{
					name: data.name,
					number_room: data.number_room,
					note: data.note,
					show_diagram: 1,
				},
				(er, res) => {
					if (res) handleSetStatus();
				}
			)
		);
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
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Tên tầng:</div>
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
							<div className="LabelCo">Số lượng phòng:</div>
							<input
								type="text"
								style={{ width: 160 }}
								className="dashboard"
								name="number_room"
								value={number_room}
								onChange={(e) => setNumber_room(e.target.value)}
								ref={register({ required: true })}
							/>
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Ghi chú:</div>
							<textarea
								style={{ width: 166 }}
								name="note"
								value={note}
								onChange={(e) => setNote(e.target.value)}
								ref={register()}
							/>
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
					onClick={handleAddFloor}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddHotel;
