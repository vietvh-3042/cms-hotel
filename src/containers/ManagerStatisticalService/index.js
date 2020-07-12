import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { Table } from "reactstrap";

ManagerStatisticalService.propTypes = {};

function ManagerStatisticalService(props) {
	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="/images/Sidebar/Services/statistical.png"
						alt="list-service"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Thống kê dịch vụ đã bán</span>
				</div>
				<Tooltip placement="top" title="Tải về Excel dữ liệu">
					<button className="grey mr-3">
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
							<th className="w-3 sorting_disabled align-middle">Thời gian</th>
							<th className="w-3 sorting_disabled align-middle">Tên DV</th>
							<th className="w-3 sorting_disabled align-middle">Giá Bán</th>
							<th className="w-3 sorting_disabled align-middle">Số lượng</th>
							<th className="w-3 sorting_disabled align-middle">Số tiền</th>
							<th className="w-3 sorting_disabled align-middle">
								Thuộc HĐ hoặc Room
							</th>
							<th className="w-3 sorting_disabled align-middle">Tạo bởi</th>
							<th className="w-3 sorting_disabled align-middle">Loại DV</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colSpan="9" className="centertext align-middle">
								Chưa có dữ liệu
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default ManagerStatisticalService;
