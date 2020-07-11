import { Tooltip } from "antd";
import React, { useState } from "react";
import { Table } from "reactstrap";
import ModalAddFloor from "./components/ModalAddFloor";
import ModalUpdate from "./components/ModalUpdate";

ManagerHotelFloor.propTypes = {};

function ManagerHotelFloor(props) {
	const data = [1, 2, 3, 4, 5];
	const [visible, setVisible] = useState(false);
	const [visibleUpdate, setVisibleUpdate] = useState(false);

	function handleAddFloor() {
		setVisible(!visible);
	}

	function handleUpdateFloor() {
		setVisibleUpdate(!visibleUpdate);
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
					<span className="titleMainContain">Danh sách tầng lầu</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddFloor}
				>
					<span className="add"></span>
					<span>Thêm</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table bordered hover responsive size="sm">
					<thead>
						<tr>
							<th className="w-3 sorting_disabled">Ẩn khỏi sơ đồ</th>
							<th className="w-3 sorting_disabled">STT</th>
							<th className="w-3 sorting_disabled">Tên Tầng</th>
							<th className="w-3 sorting_disabled">Số Phòng</th>
							<th className="w-3 sorting_disabled">Ghi chú</th>
							<th className="w-3 sorting_disabled">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						{data.map((value, key) => (
							<tr key={key}>
								<td>Mark</td>
								<td>{key + 1}</td>
								<td>Otto</td>
								<td>@mdo</td>
								<td>09/07/2020 17:07</td>
								<td className="pt-2">
									<div className=" h-full flex items-center">
										<Tooltip placement="top" title="Chỉnh sửa">
											<img
												src="/images/Actions/Edit.png"
												alt="Edit"
												className="ml-2 mr-1 cursor-pointer"
												onClick={handleUpdateFloor}
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
			<ModalAddFloor visible={visible} handleAddFloor={handleAddFloor} />
			<ModalUpdate
				visible={visibleUpdate}
				handleUpdateFloor={handleUpdateFloor}
			/>
		</div>
	);
}

export default ManagerHotelFloor;
