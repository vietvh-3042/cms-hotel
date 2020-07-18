import { updateHotel } from "@Actions/hotel";
import { Modal } from "antd";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

ModalUpdate.propTypes = {
	handleUpdateHotel: PropTypes.func,
	visibleUpdate: PropTypes.object,
	handleSetStatus: PropTypes.func,
};

ModalUpdate.defaultProps = {
	handleUpdateHotel: null,
	visibleUpdate: null,
	handleSetStatus: null,
};

function ModalUpdate(props) {
	const distPatch = useDispatch();
	const { handleUpdateHotel, visibleUpdate, handleSetStatus } = props;
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const [province, setProvince] = useState("");
	const [email, setEmail] = useState("");
	const [website, setWebsite] = useState("");
	const [note, setNote] = useState("");
	const { register, handleSubmit, errors } = useForm();

	function onSubmit(data) {
		const id = visibleUpdate.detail.id;
		distPatch(
			updateHotel(id, data, (er, res) => {
				if (res) {
					handleUpdateHotel({ visible: false, detail: {} });
					handleSetStatus();
				}
			})
		);
	}

	useEffect(() => {
		if (visibleUpdate !== null) {
			setName(visibleUpdate.detail.name || "");
			setPhone(visibleUpdate.detail.phone || "");
			setAddress(visibleUpdate.detail.address || "");
			setProvince(visibleUpdate.detail.province || "");
			setEmail(visibleUpdate.detail.email || "");
			setWebsite(visibleUpdate.detail.website || "");
			setNote(visibleUpdate.detail.note || "");
		}
	}, [visibleUpdate]);

	return (
		<Modal
			visible={visibleUpdate.visible}
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
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="flex items-center mb-2">
							<div className="LabelCo">Tên khách sạn:</div>
							<input
								type="text"
								style={{ width: 220 }}
								className="dashboard"
								name="name"
								value={name}
								onChange={(e) => setName(e.target.value)}
								ref={register({ required: true })}
							/>
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Địa chỉ:</div>
							<input
								type="text"
								style={{ width: 220 }}
								className="dashboard"
								name="address"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								ref={register({ required: true })}
							/>
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Tỉnh/Thành phố:</div>
							<input
								type="text"
								style={{ width: 220 }}
								className="dashboard"
								name="province"
								value={province}
								onChange={(e) => setProvince(e.target.value)}
								ref={register({ required: true })}
							/>
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Phone:</div>
							<input
								type="text"
								style={{ width: 220 }}
								className="dashboard"
								name="phone"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								ref={register({ required: true })}
							/>
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Email:</div>
							<input
								type="text"
								style={{ width: 220 }}
								className="dashboard"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								ref={register({ required: true })}
							/>
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Website:</div>
							<input
								type="text"
								style={{ width: 220 }}
								className="dashboard"
								name="website"
								value={website}
								onChange={(e) => setWebsite(e.target.value)}
								ref={register({ required: true })}
							/>
						</div>

						<div className="flex items-center mb-2">
							<div className="LabelCo">Ghi chú:</div>
							<textarea
								style={{ width: 226 }}
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
								type="submit"
								className="dashboardButton focus:outline-none"
							>
								Save
							</button>
							<button
								className="submit_cancel_Building focus:outline-none"
								onClick={handleUpdateHotel}
							>
								Cancel
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
