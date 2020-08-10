import { Menu, Spin } from "antd";
import DropdownCustom from "components/Dropdown";
import CommonApi from "helpers/APIS/CommonApi";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ModalAddRoom from "./components/Modal/ModalAddRoom";
import ModalDeleteRoom from "./components/Modal/ModalDeleteRoom";
import ModalUpdateRoom from "./components/Modal/ModalUpdateRoom";
import ModalUpdateStatus from "./components/Modal/ModalUpdateStatus";
import ModalCheckinRoom from "./components/Modal/ModalCheckinRoom";
import ModalCheckoutRoom from "./components/Modal/ModalCheckoutRoom";
import _ from "lodash";

MapHotel.propTypes = {};

function MapHotel(props) {
	const [loading, setLoading] = useState(false);

	const [detailHotel, setDetailHotel] = useState();

	const [status, setStatus] = useState(false);

	const [visible, setVisible] = useState(false);

	const hotel_ID = useSelector((state) => state.App.hotel_ID);

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

	const [visibleCheckinRoom, setVisibleCheckinRoom] = useState({
		visible: false,
		detail: {},
	});

	const [visibleCheckoutRoom, setVisibleCheckoutRoom] = useState({
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
				<Menu.Item className="text-xs" onClick={() => handleCheckinRoom(record)}>
					Nhận Phòng
				</Menu.Item>
				<Menu.Item className="text-xs" onClick={() => handleStatusRoom(record)}>
					Cập nhật trạng thái
				</Menu.Item>
				<Menu.Item className="text-xs" onClick={() => handleUpdateRoom(record)}>
					Chỉnh sửa
				</Menu.Item>
				<Menu.Item className="text-xs" onClick={() => handleDeleteRoom(record.id)}>
					Xóa phòng
				</Menu.Item>
			</Menu>
		);
	}

	function menuRoomPePeople(record) {
		return (
			<Menu>
				<Menu.Item className="text-xs" onClick={() => handleCheckoutRoom(record)}>
					Trả Phòng
				</Menu.Item>
			</Menu>
		);
	}

	function menuRoomcleaned(record) {
		return (
			<Menu>
				<Menu.Item className="text-xs" onClick={() => handleCheckinRoom(record)}>
					Nhận Phòng
				</Menu.Item>
				<Menu.Item className="text-xs" onClick={() => handleClear(record.id)}>
					Dọn phòng
				</Menu.Item>
				<Menu.Item className="text-xs" onClick={() => handleUpdateRoom(record)}>
					Chỉnh sửa
				</Menu.Item>
				<Menu.Item className="text-xs" onClick={() => handleDeleteRoom(record.id)}>
					Xóa phòng
				</Menu.Item>
			</Menu>
		);
	}

	useEffect(() => {
		setLoading(true);
		CommonApi(
			"GET",
			`/tenant/hotel-manager/hotel/${hotel_ID}?include=floors.rooms.checkin`,
			null
		).then((res) => {
			setDetailHotel(res.data.data);
			setLoading(false);
		});
	}, [hotel_ID, status]);

	function renderRoom() {
		if (!detailHotel) return;
		else
			return detailHotel.floors.data.map((val) => (
				<div className="grid grid-cols-7 mb-2 gap-2" key={val.id}>
					<div className="col-span-7 md:col-span-1">
						<DropdownCustom
							className="h-full flex items-center justify-center bg-blue-800 font-bold text-white hover:bg-blue-900 cursor-pointer"
							menu={menu}
							name={val.name}
						/>
					</div>
					<div className="col-span-7 md:col-span-6 grid grid-cols-3 md:grid-cols-6 gap-2">
						{val.rooms.data.map((value, key) => {
							if (value.status === 2 || value.status === 1)
								return (
									<DropdownCustom
										key={key}
										className="h-20 bg-red-600 flex items-center font-bold 
									text-white justify-center hover:bg-red-700 cursor-pointer"
										menu={() => menuRoomPePeople(value)}
										name={value.name}
									/>
								);
							else if (value.status === 4)
								return (
									<DropdownCustom
										key={key}
										className="h-20 bg-green-600 flex items-center font-bold 
									text-white justify-center hover:bg-green-700 cursor-pointer"
										menu={() => menuRoomEmpty(value)}
										name={value.name}
									/>
								);
							else if (value.status === 8)
								return (
									<DropdownCustom
										key={key}
										className="h-20 bg-gray-500 flex items-center font-bold 
									text-white justify-center hover:bg-gray-600 cursor-pointer"
										menu={() => menuRoomcleaned(value)}
										name={value.name}
									/>
								);
							else return null;
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

	function handleCheckinRoom(record) {
		setVisibleCheckinRoom({
			visible: !visibleCheckinRoom.visible,
			detail: record,
		});
	}

	function handleClear(id) {
		CommonApi("POST", `/tenant/hotel-manager/update-status-room/${id}`, {
			status: 4,
		}).then((res) => {
			toast.success("Dọn thành công");
			handleStatus();
		});
	}

	function handleCheckoutRoom(record) {
		const checkin_id = !_.isEmpty(record) ? record.checkin.data[0].id : "";
		setVisibleCheckoutRoom({
			visible: !visibleCheckoutRoom.visible,
			detail: checkin_id,
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
			<ModalCheckinRoom
				visibleCheckinRoom={visibleCheckinRoom}
				handleCheckinRoom={handleCheckinRoom}
				handleStatus={handleStatus}
			/>
			<ModalCheckoutRoom
				visibleCheckoutRoom={visibleCheckoutRoom}
				handleCheckoutRoom={handleCheckoutRoom}
				handleStatus={handleStatus}
			/>
		</div>
	);
}

export default MapHotel;
