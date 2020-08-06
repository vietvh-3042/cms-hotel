import { Tooltip } from "antd";
import React from "react";
import { Table } from "reactstrap";

ManagerCheckMoney.propTypes = {};

function ManagerCheckMoney(props) {
	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex flex-col md:flex-row md:justify-between md:items-center">
				<div className="h-full flex items-center group2">
					<img
						src="/images/Sidebar/ThongKe/checkout.png"
						alt="list-service"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Thống kê tài khoản</span>
				</div>
			</div>
			<div className="mt-2 mx-2">
				<Table bordered hover responsive size="sm">
					<thead>
						<tr>
							<th className="w-3 sorting_disabled align-middle">STT</th>
							<th className="w-3 sorting_disabled align-middle">Nhân viên</th>
							<th className="w-3 sorting_disabled align-middle">
								Tiền nhận từ hóa đơn
							</th>
							<th className="w-3 sorting_disabled align-middle">
								Tiền ký gửi và phiếu thu
							</th>
							<th className="w-3 sorting_disabled align-middle">Tiền chi</th>
							<th className="w-3 sorting_disabled align-middle">Thực thu</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colSpan="6">
								<img
									src="/images/Common/status.png"
									alt="status"
									className="ml-3 mr-1 inline"
								/>
								<b style={{ color: "#d53b0a" }} className="centertext">
									Tiền mặt
								</b>
							</td>
						</tr>
						<tr>
							<td>1</td>
							<td className="centertext bold align-middle">Admin</td>
							<td className="centertext bold align-middle">
								{format_current(220000)}
							</td>
							<td className="centertext bold align-middle">
								{format_current(220000)}
							</td>
							<td className="centertext bold align-middle">
								{format_current(220000)}
							</td>
							<td className="centertext bold align-middle">
								{format_current(220000)}
							</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default ManagerCheckMoney;
