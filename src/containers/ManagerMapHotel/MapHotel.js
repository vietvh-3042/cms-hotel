import { Dropdown, Menu, Spin } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { endpoint } from "settings";
import ModalAddRoom from "./components/Modal/ModalAddRoom";
import ModalDeleteRoom from "./components/Modal/ModalDeleteRoom";
import ModalUpdateRoom from "./components/Modal/ModalUpdateRoom";
import ModalUpdateStatus from "./components/Modal/ModalUpdateStatus";

MapHotel.propTypes = {};

function MapHotel(props) {
	const [loading, setLoading] = useState(false);
	const [detailHotel, setDetailHotel] = useState();
	const [status, setStatus] = useState(false);
	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);
	const [visible, setVisible] = useState(false);
	const [visibleUpdate, setVisibleUpdate] = useState({
		visible: false,
		detail: {},
	});
	const [visibleDelete, setVisibleDelete] = useState({
		visible: false,
		detail: {},
	});

	const [visibleStatus, setVisibleStatus] = useState({
		visible: false,
		detail: {},
	});

	const menu = (
		<Menu>
			<Menu.Item className="text-xs" onClick={handleAddRoom}>
				Thêm Phòng
			</Menu.Item>
		</Menu>
	);

	function menuRoomEmpty(record) {
		return (
			<Menu>
				<Menu.Item className="text-xs">Nhận Phòng</Menu.Item>
				<Menu.Item className="text-xs">Đặt phòng trước</Menu.Item>
				<Menu.Item className="text-xs">Cập nhật trạng thái</Menu.Item>
				<Menu.Item className="text-xs" onClick={() => handleUpdateRoom(record)}>
					Chỉnh sửa
				</Menu.Item>
				<Menu.Item
					className="text-xs"
					onClick={() => handleDeleteRoom(record.id)}
				>
					Xóa phòng
				</Menu.Item>
			</Menu>
		);
	}

	function menuRoomcleaned(record) {
		return (
			<Menu>
				<Menu.Item className="text-xs">Nhận Phòng</Menu.Item>
				<Menu.Item className="text-xs">Đã dọn phòng</Menu.Item>
				<Menu.Item className="text-xs">Đặt phòng trước</Menu.Item>
				<Menu.Item className="text-xs" onClick={() => handleUpdateRoom(record)}>
					Chỉnh sửa
				</Menu.Item>
				<Menu.Item
					className="text-xs"
					onClick={() => handleDeleteRoom(record.id)}
				>
					Xóa phòng
				</Menu.Item>
			</Menu>
		);
	}

	useEffect(() => {
		setLoading(true);
		Axios({
			method: "GET",
			url:
				endpoint +
				"/tenant/hotel-manager/hotel/" +
				hotel_ID +
				"?include=floors.rooms",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
			},
		}).then((res) => {
			setDetailHotel(res.data.data);
			setLoading(false);
		});
	}, [hotel_ID, status]);

	function renderRoom() {
		if (!detailHotel) return;
		else
			return detailHotel.floors.data.map((val) => (
				<div className="grid grid-cols-6 mb-2 gap-2" key={val.id}>
					<div className="col-span-6 md:col-span-1 bg-gray-600 font-bold text-white hover:bg-gray-700 cursor-pointer">
						<Dropdown overlay={menu} trigger={["click"]} placement="topRight">
							<div
								className="h-full flex items-center justify-center bg-gray-600 font-bold text-white 
							hover:bg-gray-700 cursor-pointer"
							>
								{val.name}
							</div>
						</Dropdown>
					</div>
					<div className="col-span-6 md:col-span-5 grid grid-cols-3 md:grid-cols-6 gap-2">
						{val.rooms.data.map((value, key) => {
							if (value.status === 4) {
								return (
									<Dropdown overlay={() => menuRoomEmpty(value)} key={key}>
										<div
											className="h-20 bg-green-600 flex items-center font-bold 
											text-white justify-center hover:bg-green-700 cursor-pointer"
										>
											{value.name}
										</div>
									</Dropdown>
								);
							}

							if (value.status === 8) {
								return (
									<Dropdown overlay={() => menuRoomcleaned(value)} key={key}>
										<div
											className="h-20 bg-gray-400 flex items-center font-bold 
											text-white justify-center hover:bg-green-700 cursor-pointer"
										>
											{value.name}
										</div>
									</Dropdown>
								);
							} else {
								return (
									<div
										className="h-20 bg-green-600 flex items-center font-bold text-white 
								justify-center hover:bg-green-700 cursor-pointer"
									>
										{value.name}
									</div>
								);
							}
						})}
					</div>
				</div>
			));
	}

	function handleStatus() {
		setStatus(!status);
	}

	function handleAddRoom() {
		setVisible(!visible);
	}

	function handleUpdateRoom(record) {
		setVisibleUpdate({
			visible: !visibleUpdate.visible,
			detail: record,
		});
	}

	function handleStatusRoom(record) {
		setVisibleStatus({
			visible: !visibleStatus.visible,
			detail: record,
		});
	}

	function handleDeleteRoom(id) {
		setVisibleDelete({
			visible: !visibleDelete.visible,
			detail: id,
		});
	}

	return (
		<div className="mt-3 pl-1">
			{loading ? (
				<div className="text-center">
					<Spin />
				</div>
			) : (
				<div>{renderRoom()}</div>
			)}
			<ModalAddRoom
				visible={visible}
				handleAddRoom={handleAddRoom}
				handleStatus={handleStatus}
			/>
			<ModalUpdateRoom
				visibleUpdate={visibleUpdate}
				handleUpdateRoom={handleUpdateRoom}
				handleStatus={handleStatus}
			/>
			<ModalDeleteRoom
				visibleDelete={visibleDelete}
				handleDeleteRoom={handleDeleteRoom}
				handleStatus={handleStatus}
			/>
			<ModalUpdateStatus
				visibleStatus={visibleStatus}
				handleStatusRoom={handleStatusRoom}
				handleStatus={handleStatus}
			/>
		</div>
	);
}

export default MapHotel;
