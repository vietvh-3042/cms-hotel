import { Tooltip } from "antd";
import React, { useState } from "react";
import { Table } from "react-bootstrap";
import ModalAddHotel from "./components/ModalAddHotel";
import ModalAddLocation from "./components/ModalAddLocation";
import ModalUpdate from "./components/ModalUpdate";

ManagerHotel.propTypes = {};

function ManagerHotel(props) {
	const data = [1, 2, 3, 4, 5];
	const [visible, setVisible] = useState(false);
	const [visibleUpdate, setVisibleUpdate] = useState(false);
	const [visibleLocation, setVisibleLocation] = useState(false);

	function handleAddHotel() {
		setVisible(!visible);
	}
	function handleUpdateHotel() {
		setVisibleUpdate(!visibleUpdate);
	}

	function handleAddLocation() {
		setVisibleLocation(!visibleLocation);
	}
	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="/images/Sidebar/Hotel/sub-hotel.png"
						alt="list-hotel"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Danh sách khách sạn</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddHotel}
				>
					<span className="add"></span>
					<span>Thêm</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table bordered hover size="sm" responsive>
					<thead>
						<tr>
							<th className="w-3 sorting_disabled">STT</th>
							<th className="w-3 sorting_disabled">Tên KS</th>
							<th className="w-3 sorting_disabled">SL.Tầng</th>
							<th className="w-3 sorting_disabled">SL.Phòng</th>
							<th className="w-3 sorting_disabled">Địa chỉ</th>
							<th className="w-3 sorting_disabled">Phone</th>
							<th className="w-3 sorting_disabled">Email</th>
							<th className="w-3 sorting_disabled">Website</th>
							<th className="w-3 sorting_disabled">Ghi chú</th>
							<th className="w-3 sorting_disabled">Created</th>
							<th className="w-3 sorting_disabled">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						{data.map((value, key) => (
							<tr key={key}>
								<td className="centertext text-center align-middle">
									{key + 1}
								</td>
								<td>Mark</td>
								<td>Otto</td>
								<td>@mdo</td>
								<td>Hà Nội</td>
								<td>435646</td>
								<td>a@gmail.com</td>
								<td>gfhf</td>
								<td>1 l</td>
								<td>09/07/2020 17:07</td>
								<td className="align-middle">
									<div className=" h-full flex items-center flex-wrap">
										<Tooltip placement="top" title="Chỉnh sửa">
											<img
												src="/images/Actions/Edit.png"
												alt="Edit"
												className="ml-2 mr-1  cursor-pointer"
												onClick={handleUpdateHotel}
											/>
										</Tooltip>
										<Tooltip
											placement="top"
											title="Thêm khu vực khác. VD: Nhà hàng, Massage...)"
										>
											<img
												src="/images/Actions/Add.png"
												alt="Add"
												className="mr-1  cursor-pointer"
												onClick={handleAddLocation}
											/>
										</Tooltip>
										<Tooltip placement="top" title="Xóa">
											<img
												src="/images/Actions/Delete.png"
												alt="Delete"
												className="cursor-pointer"
											/>
										</Tooltip>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			</div>
			<ModalAddHotel visible={visible} handleAddHotel={handleAddHotel} />
			<ModalUpdate
				visible={visibleUpdate}
				handleUpdateHotel={handleUpdateHotel}
			/>
			<ModalAddLocation
				visible={visibleLocation}
				handleAddLocation={handleAddLocation}
			/>
		</div>
	);
}

export default ManagerHotel;
