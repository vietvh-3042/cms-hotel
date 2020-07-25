import { Dropdown, Menu } from "antd";
import React, { useState } from "react";
import ModalCheckin from "./components/ModalCheckin";
import ModalCheckout from "./components/ModalCheckout";
import StatusHotel from "./components/StatusHotel";

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
			<Menu.Item className="text-xs">Tạo hóa đơn</Menu.Item>
			<Menu.Item className="text-xs">Tạo phiếu chi</Menu.Item>
		</Menu>
	);
	const [visibleCheckin, setVisibleCheckin] = useState(false);
	const [visibleCheckout, setVisibleCheckout] = useState(false);

	function handleCheckin() {
		setVisibleCheckin(!visibleCheckin);
	}

	function handleCheckout() {
		setVisibleCheckout(!visibleCheckout);
	}
	return (
		<React.Fragment>
			<div className="form-inline flex">
				<StatusHotel quantity={0} title="Trống" background="bg-teal-500" />
				<StatusHotel quantity={0} title="Đang ở" background="bg-pink-500" />
				<StatusHotel
					quantity={0}
					title="Chờ khách"
					background="bg-orange-500"
				/>
				<StatusHotel
					quantity={0}
					title="Chờ khách"
					background="bg-orange-500"
				/>
				<StatusHotel quantity={0} title="Chưa dọn" background="bg-gray-500" />
				<StatusHotel quantity={0} title="Đang sửa" background="bg-black" />
			</div>
			<div className="pl-1 mt-2">
				<Dropdown overlay={menu}>
					<button className="dashboardButton mr-2 mb-2">
						Khách đoàn / CTY
					</button>
				</Dropdown>
				<button className="submit_cancel_Building mr-2 mb-2">
					Hiện trạng & Đặt Phòng
				</button>
				<button className="grey mr-2 mb-2" onClick={handleCheckin}>
					DS Checkin
				</button>
				<button className="grey mr-2 mb-2" onClick={handleCheckout}>
					DS Checkout
				</button>
				<button className="grey mr-2 mb-2">DS Khách hàng</button>
				<Dropdown overlay={menuReceipts}>
					<button className="dashboardButton mb-2">Tạo HD / Phiếu</button>
				</Dropdown>
			</div>
			<ModalCheckin visible={visibleCheckin} handleCheckin={handleCheckin} />
			<ModalCheckout
				visible={visibleCheckout}
				handleCheckout={handleCheckout}
			/>
		</React.Fragment>
	);
}

export default GroupStatusHotel;
