import { Modal } from "antd";
import FooterForm from "components/utility/footerForm";
import { Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import PropTypes from "prop-types";
import React from "react";
import { toast } from "react-toastify";

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

	const initialValues = {
		status: false,
		note: value ? value.note : "",
	};

	function handleSubmit(data, { resetForm }) {
		CommonApi("POST", `/tenant/hotel-manager/update-status-room/${value.id}`, {
			status: data.status ? 8 : value.status,
			note: data.note,
		}).then((res) => {
			toast.success("Cập nhật thành công");
			handleStatusRoom();
			handleStatus();
			resetForm({ status: false, note: "" });
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
