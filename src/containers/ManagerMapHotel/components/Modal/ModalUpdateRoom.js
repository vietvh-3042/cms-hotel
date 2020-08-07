import { Modal } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as Yup from "yup";

ModalUpdateRoom.propTypes = {
	handleUpdateRoom: PropTypes.func,
	handleStatus: PropTypes.func,
};

ModalUpdateRoom.defaultProps = {
	handleUpdateRoom: null,
	handleStatus: null,
};

function ModalUpdateRoom(props) {
	const { visibleUpdate, handleUpdateRoom, handleStatus } = props;
	const [listFloor, setListFloor] = useState([]);
	const [listTypeRoom, setListTypeRoom] = useState([]);
	const [listClassify, setListClassify] = useState([]);

	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	const initialValues = visibleUpdate.detail || "";

	const validationSchema = Yup.object().shape({
		floor_id: Yup.string().required("Không được để trống."),
		name: Yup.string().required("Không được để trống."),
		type_room_id: Yup.string().required("Không được để trống."),
		classify_id: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		const id = data.id;
		CommonApi("PUT", `/tenant/hotel-manager/room/${id}`, data)
			.then((res) => {
				toast.success("Cập nhật thành công");
				handleUpdateRoom();
				handleStatus();
			})
			.catch((err) => {
				if (err.response.data.message) toast.error(err.response.data.message);
				else {
					let error = [];
					for (let value of Object.values(err.response.data.errors)) {
						error.push(value);

						toast.error(
							<React.Fragment>
								{error.map((value, key) => (
									<div key={key}>{value}</div>
								))}
							</React.Fragment>
						);
					}
				}
			});
	}

	useEffect(() => {
		async function getListFloor() {
			CommonApi("GET", "/tenant/hotel-manager/floor", null).then((res) => {
				setListFloor(res.data.data);
			});
		}
		async function getListTypeRoom() {
			CommonApi("GET", "/tenant/hotel-manager/type-room", null).then((res) => {
				setListTypeRoom(res.data.data);
			});
		}
		async function getListClassify() {
			CommonApi("GET", "/tenant/hotel-manager/classify", null).then((res) => {
				setListClassify(res.data.data);
			});
		}
		getListFloor();
		getListTypeRoom();
		getListClassify();
	}, [hotel_ID]);

	return (
		<Modal
			visible={visibleUpdate.visible}
			onCancel={handleUpdateRoom}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={390}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Sửa phòng</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						enableReinitialize
						onSubmit={handleSubmit}
					>
						{({ errors, touched }) => (
							<Form>
								<FastField
									name="name"
									component={InputField}
									label="Tên phòng:"
									width={190}
								/>
								<div className="flex mb-1 items-center">
									<div className="LabelCo">Tầng dãy:</div>
									<Field as="select" name="floor_id" style={{ width: 196, height: 30 }}>
										{listFloor.map((value) => (
											<option value={value.id} key={value.id}>
												{value.name}
											</option>
										))}
									</Field>
								</div>

								{errors.floor_id && touched.floor_id ? (
									<div className="flex items-center">
										<div className="LabelCo opacity-0">-----</div>
										<div className="custom-err-form">{errors.floor_id}</div>
									</div>
								) : null}

								<div className="flex mb-1 items-center">
									<div className="LabelCo">Loại phòng:</div>
									<Field
										as="select"
										name="type_room_id"
										style={{ width: 196, height: 30 }}
									>
										{listTypeRoom.map((value) => (
											<option value={value.id} key={value.id}>
												{value.name}
											</option>
										))}
									</Field>
								</div>

								{errors.type_room_id && touched.type_room_id ? (
									<div className="flex items-center">
										<div className="LabelCo opacity-0">-----</div>
										<div className="custom-err-form">{errors.type_room_id}</div>
									</div>
								) : null}

								<div className="flex mb-1 items-center">
									<div className="LabelCo">Phân loại:</div>
									<Field
										as="select"
										name="classify_id"
										style={{ width: 196, height: 30 }}
									>
										{listClassify.map((value) => (
											<option value={value.id} key={value.id}>
												{value.name}
											</option>
										))}
									</Field>
								</div>

								{errors.classify_id && touched.classify_id ? (
									<div className="flex items-center">
										<div className="LabelCo opacity-0">-----</div>
										<div className="custom-err-form">{errors.classify_id}</div>
									</div>
								) : null}

								<div className="flex mb-2 items-center">
									<div className="LabelCo">Ghi chú:</div>
									<Field as="textarea" name="note" rows="3" style={{ width: 196 }} />
								</div>
								<FooterForm handleClick={handleUpdateRoom} title="Cập nhật" />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleUpdateRoom}
				/>
			</div>
		</Modal>
	);
}

export default ModalUpdateRoom;
