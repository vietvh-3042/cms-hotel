import { Modal } from "antd";
import Axios from "axios";
import FooterForm from "components/utility/footerForm";
import { Field, Form, Formik } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { endpoint } from "settings";
ModalUpdateStatus.propTypes = {
	handleStatusRoom: PropTypes.func,
	handleStatus: PropTypes.func,
};

ModalUpdateStatus.defaultProps = {
	handleStatusRoom: null,
	handleStatus: null,
};

function ModalUpdateStatus(props) {
	const { visibleStatus, handleStatusRoom, handleStatus } = props;
	const value = visibleStatus.detail;
	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	const initialValues = {
		status: false,
		note: value ? value.note : "",
	};

	function handleSubmit(data, { resetForm }) {
		Axios({
			method: "POST",
			url: endpoint + "/tenant/hotel-manager/update-status-room/" + value.id,
			data: {
				status: data.status ? 8 : value.status,
				note: data.note,
			},
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
				"hotel-id": hotel_ID,
			},
		})
			.then((res) => {
				toast.success("Cập nhật thành công");
				handleStatusRoom();
				handleStatus();
				resetForm({ status: false, note: "" });
			})
			.catch((err) => {
				console.log(err.response);
			});
	}

	return (
		<Modal
			visible={visibleStatus.visible}
			onCancel={handleStatusRoom}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={390}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Cập nhật trạng thái</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						onSubmit={handleSubmit}
						enableReinitialize
					>
						{() => (
							<Form>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Trạng thái:</div>
									<Field type="checkbox" name="status" />
									<span className="text-xs black">Chưa dọn</span>
								</div>
								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ghi chú:</div>
									<Field
										as="textarea"
										name="note"
										rows="3"
										style={{ width: 196 }}
									/>
								</div>
								<FooterForm handleClick={handleStatusRoom} update />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleStatusRoom}
				/>
			</div>
		</Modal>
	);
}

export default ModalUpdateStatus;
