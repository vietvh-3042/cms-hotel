import { Collapse, DatePicker, Modal, Table, TimePicker } from "antd";
import FooterForm from "components/utility/footerForm";
import { FastField, Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import { renderQuantity } from "helpers/Common/CommonRoom";
import InputField from "helpers/CustomFields/InputField";
import moment from "moment";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const { Panel } = Collapse;

const date = new Date();
const time = date.getTime();
const format = "HH:mm";

ModalCheckinRoom.propTypes = {
	handleCheckinRoom: PropTypes.func,
	handleStatus: PropTypes.func,
};

ModalCheckinRoom.defaultProps = {
	handleCheckinRoom: null,
	handleStatus: null,
};

function ModalCheckinRoom(props) {
	const allData = [];
	const { visibleCheckinRoom, handleCheckinRoom, handleStatus } = props;
	const [listClassify, setListClassify] = useState([]);
	const value = visibleCheckinRoom.detail;
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	useEffect(() => {
		async function getListClassify() {
			CommonApi("GET", "/tenant/hotel-manager/classify", null).then((res) => {
				setListClassify(res.data.data);
			});
		}
		getListClassify();
	}, [hotel_ID]);

	const initialValues = {
		price_check_in: 220000,
		date_in: date,
		time_in: time,
		date_out_temp: date,
		time_out_temp: time,
		prepayment: 100000,
		number_people_in_room: "",
		note_diagram: "",
		note: "",
		name: "",
		identity_code: "",
		address: "",
		nation_id: "",
	};

	function handleSubmit(data) {
		console.log(value);
	}

	function handleAddCheckinService() {
		allData.push({});
	}

	const columns = [
		{ title: "STT", dataIndex: "STT", key: "STT" },
		{ title: "Tên dịch vụ", dataIndex: "name", key: "name" },
		{ title: "Số lượng", dataIndex: "quantity", key: "quantity" },
		{ title: "Đơn giá", dataIndex: "amount", key: "amount" },
		{ title: "Thành tiền", dataIndex: "price", key: "price" },
		{ title: "Thao tác" },
	];

	return (
		<Modal
			visible={visibleCheckinRoom.visible}
			onCancel={handleCheckinRoom}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={760}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>{`Nhận Phòng ${value.name}`}</span>
				</div>
				<div className="modal_content">
					<Formik initialValues={initialValues} onSubmit={handleSubmit}>
						{({ setFieldValue, values }) => (
							<Form>
								<fieldset
									className="mb-3"
									style={{ border: "1px solid #d0d0d0" }}
								>
									<legend className="groupHour w-280 ml-3">
										<span>Thông tin đăng ký - Phòng Đơn</span>
									</legend>
									<div className="flex">
										<div className="w-6/12">
											<FastField
												name="price_check_in"
												component={InputField}
												label="Giá:"
												width={243}
											/>
											<div className="flex mb-1">
												<div className="flex items-center">
													<div className="LabelCo">Ngày vào:</div>
													<DatePicker
														name="date_receipt"
														defaultValue={moment(date)}
														format="DD/MM/YYYY"
														style={{ width: 125 }}
														onChange={(date, dateString) =>
															setFieldValue("date_receipt", dateString)
														}
													/>
												</div>
												<div className="flex items-center">
													<div className="LabelCo" style={{ width: 35 }}>
														Lúc:
													</div>
													<TimePicker
														style={{ width: 85 }}
														defaultValue={moment(time)}
														format={format}
													/>
												</div>
											</div>
											<div className="flex mb-1">
												<div className="flex items-center">
													<div className="LabelCo">Ngày ra dự kiến:</div>
													<DatePicker
														name="date_receipt"
														defaultValue={moment(date)}
														format="DD/MM/YYYY"
														style={{ width: 125 }}
														onChange={(date, dateString) =>
															setFieldValue("date_receipt", dateString)
														}
													/>
												</div>
												<div className="flex items-center">
													<div className="LabelCo" style={{ width: 35 }}>
														Lúc:
													</div>
													<TimePicker
														style={{ width: 85 }}
														defaultValue={moment(time)}
														format={format}
													/>
												</div>
											</div>
											<div className="flex mb-1 items-center">
												<div className="LabelCo">Phân loại:</div>
												<Field
													as="select"
													name="classify_id"
													style={{ width: 249, height: 30 }}
												>
													{listClassify.map((value) => (
														<option value={value.id} key={value.id}>
															{value.name}
														</option>
													))}
												</Field>
											</div>
											<FastField
												name="number_people_in_room"
												component={InputField}
												label="Số lượng người:"
												width={243}
											/>
										</div>
										<div className="w-6/12">
											<FastField
												name="price_check_in"
												component={InputField}
												label="Trả trước:"
												width={230}
											/>
											<FastField
												name="price_check_in"
												component={InputField}
												label="Ghi sơ đồ:"
												width={230}
											/>
											<div className="flex mb-2 items-center">
												<div className="LabelCo">Ghi chú:</div>
												<Field
													as="textarea"
													name="note"
													rows="3"
													style={{ width: 236 }}
												/>
											</div>
										</div>
									</div>
								</fieldset>
								<Collapse className="mt-3 collapseRoom">
									<Panel
										header="Thêm dịch vụ"
										key="1"
										className="text-xs black"
									>
										<div className="grid grid-cols-7 mb-2">
											<div className="col-span-4">
												<div className="flex mb-1 items-center">
													<div className="LabelCo">Dịch vụ:</div>
													<Field
														as="select"
														name="floor_id"
														style={{ width: 226, height: 30 }}
													>
														<option>1</option>
													</Field>
												</div>
											</div>
											<div className="col-span-2">
												<div className="flex mb-1 items-center">
													<div className="LabelCo">Số lượng:</div>
													<Field
														as="select"
														name="floor_id"
														style={{ width: 226, height: 30 }}
													>
														{renderQuantity()}
													</Field>
												</div>
											</div>
											<div className="col-span-1 flex items-center justify-center">
												<button
													className="dashboardButton focus:outline-none"
													onClick={handleAddCheckinService}
												>
													Thêm
												</button>
											</div>
										</div>
										<Table
											dataSource={allData}
											columns={columns}
											bordered
											scroll={{ x: true }}
										/>
									</Panel>
									<Panel
										header="Thông tin khách hàng"
										key="2"
										className="text-xs black"
									>
										<div className="grid grid-cols-2">
											<FastField
												name="price_check_in"
												component={InputField}
												label="CMND/Passport:"
											/>
											<FastField
												name="price_check_in"
												component={InputField}
												label="Tên khách hàng:"
											/>
											<FastField
												name="price_check_in"
												component={InputField}
												label="Địa chỉ:"
											/>
											<div className="flex mb-1 items-center">
												<div className="LabelCo">Quốc tịch:</div>
												<Field
													as="select"
													name="floor_id"
													style={{ width: 226, height: 30 }}
												>
													{renderQuantity()}
												</Field>
											</div>
										</div>
									</Panel>
								</Collapse>
								<div className="mt-3">
									<FooterForm
										handleClick={handleCheckinRoom}
										title="Nhận Phòng"
									/>
								</div>
							</Form>
						)}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={handleCheckinRoom}
				/>
			</div>
		</Modal>
	);
}

export default ModalCheckinRoom;
