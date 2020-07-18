import { Dropdown, Menu } from "antd";
import React, { useState } from "react";
import ModalCheckin from "./components/ModalCheckin";
import ModalCheckout from "./components/ModalCheckout";

ManagerMapHotel.propTypes = {};

function ManagerMapHotel(props) {
	const menu = (
		<Menu>
			<Menu.Item className="text-xs">Checkin Khách đoàn / CTY</Menu.Item>
			<Menu.Item className="text-xs">Checkout Khách đoàn / CTY</Menu.Item>
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
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex items-center">
				<span className="titleMainContain ml-3">Sơ đồ khách sạn</span>
			</div>
			<div className="mt-2 mx-2 ml-3">
				<div className="form-inline flex">
					<div className="flex items-center w-6/12 md:w-1/5 lg:w-1/6 mb-2">
						<span className="qty_room text-center bg-teal-500">0</span>
						<span>
							<strong>Trống</strong>
						</span>
					</div>

					<div className="flex items-center w-6/12 md:w-1/5 lg:w-1/6 mb-2">
						<span className="qty_room text-center bg-pink-500">0</span>
						<span>
							<strong>Đang ở</strong>
						</span>
					</div>

					<div className="flex items-center w-6/12 md:w-1/5 lg:w-1/6 mb-2">
						<span className="qty_room text-center bg-orange-500">0</span>
						<span>
							<strong>Chờ khách</strong>
						</span>
					</div>

					<div className="flex items-center w-6/12 md:w-1/5 lg:w-1/6 mb-2">
						<span className="qty_room text-center bg-gray-500">0</span>
						<span>
							<strong>Chưa dọn</strong>
						</span>
					</div>

					<div className="flex items-center w-6/12 md:w-1/5 lg:w-1/6 mb-2">
						<span className="qty_room text-center bg-black">0</span>
						<span>
							<strong>Đang sửa</strong>
						</span>
					</div>
				</div>
				<div className="pl-1">
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
					<button className="dashboardButton mb-2">Tạo HD / Phiếu</button>
				</div>
			</div>
			<ModalCheckin visible={visibleCheckin} handleCheckin={handleCheckin} />
			<ModalCheckout
				visible={visibleCheckout}
				handleCheckout={handleCheckout}
			/>
		</div>
	);
}

export default ManagerMapHotel;
