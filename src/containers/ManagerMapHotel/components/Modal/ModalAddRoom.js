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

ModalAddRoom.propTypes = {
	handleAddRoom: PropTypes.func,
	handleStatus: PropTypes.func,
};

ModalAddRoom.defaultProps = {
	handleAddRoom: null,
	handleStatus: null,
};

function ModalAddRoom(props) {
	const { visible, handleAddRoom, handleStatus } = props;
	const [listFloor, setListFloor] = useState([]);
	const [listTypeRoom, setListTypeRoom] = useState([]);
	const [listClassify, setListClassify] = useState([]);

	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	const initialValues = {
		type_room_id: listTypeRoom.length > 0 ? listTypeRoom[0].id : "",
		floor_id: listFloor.length > 0 ? listFloor[0].id : "",
		classify_id: listClassify.length > 0 ? listClassify[0].id : "",
		name: "",
		note: "",
		status: 4,
	};

	const validationSchema = Yup.object().shape({
		floor_id: Yup.string().required("Không được để trống."),
		name: Yup.string().required("Không được để trống."),
		type_room_id: Yup.string().required("Không được để trống."),
		classify_id: Yup.string().required("Không được để trống."),
	});

	function handleSubmit(data) {
		CommonApi("POST", "/tenant/hotel-manager/room", data).then((res) => {
			toast.success("Tạo thành công");
			handleAddRoom();
			handleStatus();
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
			visible={visible}
			onCancel={handleAddRoom}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={390}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>Thêm phòng</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
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
									<Field
										as="select"
										name="floor_id"
										style={{ width: 196, height: 30 }}
									>
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
									<Field
										as="textarea"
										name="note"
										rows="3"
										style={{ width: 196 }}
									/>
								</div>
								<FooterForm handleClick={handleAddRoom} />
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleAddRoom}
				/>
			</div>
		</Modal>
	);
}

export default ModalAddRoom;
