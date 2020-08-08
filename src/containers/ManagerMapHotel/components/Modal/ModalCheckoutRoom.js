import React from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal/Modal";
import { FastField, Field, Form, Formik } from "formik";
import CommonApi from "helpers/APIS/CommonApi";
import InputField from "helpers/CustomFields/InputField";
import TextAreaField from "helpers/CustomFields/TextAreaField";
import moment from "moment";
import * as Yup from "yup";
import FooterForm from "components/utility/footerForm";

ModalCheckoutRoom.propTypes = {
	handleCheckoutRoom: PropTypes.func,
	handleStatus: PropTypes.func,
};

ModalCheckoutRoom.defaultProps = {
	handleCheckoutRoom: null,
	handleStatus: null,
};

function ModalCheckoutRoom(props) {
	const { visibleCheckoutRoom, handleCheckoutRoom, handleStatus } = props;

	const initialValues = {};

	const validationSchema = Yup.object().shape({});

	function handleSubmit(data) {}

	const MyInput = ({ field, form, ...props }) => {
		return <input {...field} {...props} style={{ width: 85 }} />;
	};

	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	return (
		<Modal
			// visible={visibleCheckoutRoom.visible}
			visible={true}
			onCancel={() => handleCheckoutRoom({})}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={570}
		>
			<div className="relative">
				<div className="modal_header_action">
					<span className="hsp2_building-add"></span>
					<span>{`Hóa Đơn`}</span>
				</div>
				<div className="modal_content">
					<Formik
						initialValues={initialValues}
						validationSchema={validationSchema}
						onSubmit={handleSubmit}
						enableReinitialize
					>
						{() => {
							return (
								<Form>
									<div className="grid grid-cols-2 mb-2">
										<div className="text-center">
											<span>Khách hàng:</span>
											<span className="capitalize bold ml-2">Khách lẻ</span>
										</div>
										<div className="text-center">
											<span>Mã HD:</span>
											<span className="capitalize bold ml-2">Phòng đơn</span>
										</div>
										<div className="text-center">
											<span>Vào lúc:</span>
											<span className="capitalize bold ml-2">Phòng đơn</span>
										</div>
										<div className="text-center">
											<span>Trả lúc:</span>
											<span className="capitalize bold ml-2">Phòng đơn</span>
										</div>
										<div className="text-center">
											<span>Loại phòng:</span>
											<span className="capitalize bold ml-2">Phòng đơn</span>
										</div>
										<div className="text-center">
											<span>Giá:</span>
											<span className="capitalize bold ml-2">Phòng đơn</span>
										</div>
									</div>
									<div className="split"></div>

									<div className="grid grid-cols-2 mb-2">
										<div className="text-center">
											<span>Tiền phòng:</span>
											<span className="textBold ml-2 text-lg">
												{format_current(820000)}
											</span>
										</div>
									</div>
									<div className="split"></div>

									<div className="grid grid-cols-2 mb-2">
										<div className="text-center">
											<span>Tiền dịch vụ:</span>
											<span className="capitalize bold ml-2">0</span>
										</div>
									</div>
									<div className="split"></div>

									<div className="flex justify-between mt-2">
										<div className="flex">
											<span className="LabelCo mr-3" style={{ width: 70 }}>
												Phụ thu
											</span>
											<Field name="lastName" component={MyInput} />
										</div>
										<div className="flex">
											<span className="LabelCo mr-3" style={{ width: 70 }}>
												Giảm trừ
											</span>
											<Field name="lastName" component={MyInput} />
										</div>
										<div className="flex">
											<span className="LabelCo mr-3" style={{ width: 70 }}>
												Trả trước
											</span>
											<Field name="lastName" component={MyInput} />
										</div>
									</div>

									<div className="mt-2">
										<span className="LabelCo">Thanh toán:</span>
										<span className="textBold ml-2 text-lg">
											{format_current(820000)}
										</span>
									</div>

									<FastField
										name="note_payment"
										component={TextAreaField}
										label="Ghi chú hình thức:"
										width={"100%"}
									/>
									<FooterForm
										handleClick={() => handleCheckoutRoom({})}
										title="Trả Phòng"
										className="mr-0"
									/>
								</Form>
							);
						}}
					</Formik>
				</div>
				<img
					src="/images/Button/closeModal.png"
					alt="closeModal"
					className="closeModal cursor-pointer"
					onClick={() => handleCheckoutRoom({})}
				/>
			</div>
		</Modal>
	);
}

export default ModalCheckoutRoom;
