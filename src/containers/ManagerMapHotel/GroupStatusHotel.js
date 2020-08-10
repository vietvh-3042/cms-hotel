import { Dropdown, Menu } from "antd";
import React, { useState, useEffect } from "react";
import ModalCheckin from "./components/Modal/ModalCheckin";
import ModalCheckout from "./components/Modal/ModalCheckout";
import StatusHotel from "./components/StatusHotel";
import ModalAddPayment from "./components/Modal/ModalAddPayment";
import ModalAddBill from "./components/Modal/ModalAddBill";

GroupStatusHotel.propTypes = {};

function GroupStatusHotel(props) {
	const menu = (
		<Menu>
			<Menu.Item className="text-xs">Checkin Khách đoàn / CTY</Menu.Item>
			<Menu.Item className="text-xs">Checkout Khách đoàn / CTY</Menu.Item>
		</Menu>
	);

	const menuReceipts = (
		<Menu>
			<Menu.Item className="text-xs" onClick={handleAddService}>
				Tạo hóa đơn
			</Menu.Item>
			<Menu.Item className="text-xs" onClick={handleAddBill}>
				Tạo phiếu chi
			</Menu.Item>
		</Menu>
	);
	const [visibleCheckin, setVisibleCheckin] = useState(false);
	const [visibleCheckout, setVisibleCheckout] = useState(false);
	const [visibleBill, setVisibleBill] = useState(false);
	const [visibleService, setVisibleService] = useState(false);

	function handleCheckin() {
		setVisibleCheckin(!visibleCheckin);
	}

	function handleCheckout() {
		setVisibleCheckout(!visibleCheckout);
	}

	function handleAddBill() {
		setVisibleBill(!visibleBill);
	}

	function handleAddService() {
		setVisibleService(!visibleService);
	}

	return (
		<React.Fragment>
			<div className="form-inline flex">
				{/* <StatusHotel quantity={0} title="Trống" background="bg-green-600" />
				<StatusHotel quantity={0} title="Đang ở" background="bg-pink-500" /> */}
				{/* <StatusHotel
					quantity={0}
					title="Chờ khách"
					background="bg-orange-500"
				/>
				<StatusHotel quantity={0} title="Chưa dọn" background="bg-gray-500" />
				<StatusHotel quantity={0} title="Đang sửa" background="bg-black" /> */}
			</div>
			<div className="pl-1 mt-2">
				{/* <Dropdown overlay={menu}>
					<button className="dashboardButton mr-2 mb-2">
						Khách đoàn / CTY
					</button>
				</Dropdown> */}

				<button className="grey mr-2 mb-2" onClick={handleCheckin}>
					DS Checkin
				</button>
				{/* <button className="grey mr-2 mb-2" onClick={handleCheckout}>
					DS Checkout
				</button> */}
				{/* <Dropdown overlay={menuReceipts}>
					<button className="dashboardButton mb-2">Tạo HD / Phiếu</button>
				</Dropdown> */}
			</div>
			<ModalCheckin visible={visibleCheckin} handleCheckin={handleCheckin} />
			<ModalCheckout visible={visibleCheckout} handleCheckout={handleCheckout} />
			<ModalAddPayment visible={visibleBill} handleAddBill={handleAddBill} />
			<ModalAddBill visible={visibleService} handleAddService={handleAddService} />
		</React.Fragment>
	);
}

export default GroupStatusHotel;
