import React, { useState } from "react";
import { Tooltip } from "antd";
import { Table } from "reactstrap";
import PropTypes from "prop-types";

ManagerPriceTime.propTypes = {};

function ManagerPriceTime(props) {
	const data = [1, 2, 3, 4, 5];
	const [visible, setVisible] = useState(false);

	function handleAddPriceTime() {}

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
					<span className="titleMainContain">
						Danh sách các cài đặt theo thời điểm
					</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddPriceTime}
				>
					<span className="add"></span>
					<span>Thêm giá theo thời điểm</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table bordered hover responsive size="sm">
					<thead>
						<tr>
							<th className="w-3 sorting_disabled">STT</th>
							<th className="w-3 sorting_disabled">Thời điểm</th>
							<th className="w-3 sorting_disabled">Loại phòng</th>
							<th className="w-3 sorting_disabled">
								Giá mặc định của loại phòng
							</th>
							<th className="w-3 sorting_disabled">Giá sau khi điều chỉnh</th>
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
									Từ 0h-&gt;24h Vào T2-&gt;CN
								</td>
								<td className="centertext bold text-center align-middle">
									Phòng Đơn
								</td>
								<td className="centertext">
									<div>
										<span>♦ Qua đêm : </span>
										<b className="ml-2">{format_current(160000)}</b>
									</div>
								</td>
								<td className="centertext">
									<div>
										<span>♦ Qua đêm : </span>
										<b className="ml-2">{format_current(170000)}</b>
									</div>
								</td>
								<td className="centertext"></td>
								<td className="centertext">
									<div className=" h-full flex items-center justify-center">
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

export default ManagerPriceTime;
