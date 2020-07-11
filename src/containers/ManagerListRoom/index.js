import { Tooltip } from "antd";
import React, { useState } from "react";
import { Table } from "reactstrap";
import SettingAdditional from "./SettingAdditional";
import SettingPrice from "./SettingPrice";

ManagerListRoom.propTypes = {};

function ManagerListRoom(props) {
	const data = [1, 2, 3, 4, 5];
	const [visible, setVisible] = useState(false);
	function handleAddListRoom() {}

	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="/images/Sidebar/Settings/price.png"
						alt="list-room"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Danh sách các loại phòng</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddListRoom}
				>
					<span className="add"></span>
					<span>Thêm loại phòng</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table bordered hover responsive size="sm">
					<thead>
						<tr>
							<th className="w-3 sorting_disabled">STT</th>
							<th className="w-3 sorting_disabled">Loại phòng</th>
							<th className="w-3 sorting_disabled">Giá phòng</th>
							<th className="w-3 sorting_disabled">Cài đặt giá</th>
							<th className="w-3 sorting_disabled">Qui định phụ trội</th>
							<th className="w-3 sorting_disabled">SL.G</th>
							<th className="w-3 sorting_disabled">SL.N</th>
							<th className="w-3 sorting_disabled">Ghi chú</th>
							<th className="w-3 sorting_disabled">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						{data.map((value, key) => (
							<tr key={key}>
								<td className="centertext text-center align-middle">
									{key + 1}
								</td>
								<td className="centertext bold text-center align-middle">
									Phòng Đơn
								</td>
								<td className="centertext bold text-center align-middle">
									{format_current(220000)}
								</td>
								<td className="centertext align-middle">
									<SettingPrice />
								</td>
								<td className="centertext">
									<SettingAdditional />
								</td>
								<td className="centertext text-center align-middle">1</td>
								<td className="centertext text-center align-middle">2</td>
								<td className="centertext text-center align-middle"></td>
								<td className="pt-2 align-middle">
									<div className=" h-full flex items-center justify-center">
										<Tooltip placement="top" title="Chỉnh sửa">
											<img
												src="/images/Actions/Edit.png"
												alt="Edit"
												className="ml-2 mr-2 cursor-pointer"
												// onClick={handleUpdateHotel}
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
		</div>
	);
}

export default ManagerListRoom;
