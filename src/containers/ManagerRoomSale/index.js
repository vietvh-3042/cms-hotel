import { Tooltip } from "antd";
import React from "react";
import { Table } from "reactstrap";

ManagerRoomSale.propTypes = {};

function ManagerRoomSale(props) {
	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="http://server6.skyhotel.vn/images/icons/calculatordetail24okno1.png"
						alt="revenue"
						className="inline ml-3"
					/>
					<span className="titleMainContain">
						Doanh thu bán phòng theo ngày
					</span>
				</div>
				<Tooltip placement="top" title="Tải về Excel dữ liệu">
					<button className="grey mr-2">
						<span className="excel" />
						<span>Xuất File</span>
					</button>
				</Tooltip>
			</div>
			<div className="mt-2 mx-2">
				<Table bordered hover responsive size="sm">
					<thead>
						<tr>
							<th className="w-3 sorting_disabled align-middle">STT</th>
							<th className="w-3 sorting_disabled align-middle">Ngày</th>
							<th className="w-3 sorting_disabled align-middle">
								Checkin + InHouse
							</th>
							<th className="w-3 sorting_disabled align-middle">Booking</th>
							<th className="w-3 sorting_disabled align-middle">Đã bán</th>
							<th className="w-3 sorting_disabled align-middle">Công suất</th>
							<th className="w-3 sorting_disabled align-middle">
								Giá đã bán TB
							</th>
							<th className="w-3 sorting_disabled align-middle">D.Thu Phòng</th>
							<th className="w-3 sorting_disabled align-middle">
								D.Thu Phụ trội
							</th>
							<th className="w-3 sorting_disabled align-middle">
								Tổng D.Thu Phòng(3+4)
							</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="centertext text-center align-middle">1</td>
							<td className="centertext text-center align-middle">
								<span>06 Tháng 07</span>
								<span>2020</span>
							</td>
							<td className="centertext text-center align-middle bold">0</td>
							<td className="centertext text-center align-middle">0</td>
							<td className="centertext text-center align-middle">0</td>
							<td className="centertext text-center align-middle">0%</td>
							<td className="centertext text-center align-middle bold">0</td>
							<td className="centertext text-center align-middle">220000</td>
							<td className="centertext text-center align-middle">0</td>
							<td className="centertext text-center align-middle">0</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default ManagerRoomSale;
