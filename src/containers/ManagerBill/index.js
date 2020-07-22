import React from "react";
import { Table } from "reactstrap";

ManagerBill.propTypes = {};

function ManagerBill(props) {
	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="http://server6.skyhotel.vn/images/icons/hoadon.png"
						alt="revenue"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Danh sách hóa đơn</span>
				</div>
			</div>
			<div className="mt-2 mx-2">
				<Table bordered hover responsive size="sm">
					<thead>
						<tr>
							<th className="w-3 sorting_disabled align-middle">STT</th>
							<th className="w-3 sorting_disabled align-middle">Mã HĐ</th>
							<th className="w-3 sorting_disabled align-middle">
								Tên khách hàng
							</th>
							<th className="w-3 sorting_disabled align-middle">Vào lúc</th>
							<th className="w-3 sorting_disabled align-middle">Trả lúc</th>
							<th className="w-3 sorting_disabled align-middle">K.khác</th>
							<th className="w-3 sorting_disabled align-middle">Tổng cộng</th>
							<th className="w-3 sorting_disabled align-middle">T.toán</th>
							<th className="w-3 sorting_disabled align-middle">Trạng thái</th>
							<th className="w-3 sorting_disabled align-middle">
								Hình thức TT
							</th>
							<th className="w-3 sorting_disabled align-middle">NV Checkin</th>
							<th className="w-3 sorting_disabled align-middle">NV Checkout</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="centertext text-center align-middle">1</td>
							<td className="centertext text-center align-middle">201</td>
							<td className="centertext text-center align-middle bold">
								Khách lẻ
							</td>
							<td className="centertext text-center align-middle">
								12/07/2020 15:34
							</td>
							<td className="centertext text-center align-middle">
								12/07/2020 15:34
							</td>
							<td className="centertext text-center align-middle">0</td>
							<td className="centertext text-center align-middle bold">
								220000
							</td>
							<td className="centertext text-center align-middle">220000</td>
							<td className="centertext text-center align-middle">
								Đã thanh toán
							</td>
							<td className="centertext text-center align-middle">Tiền Mặt</td>
							<td className="centertext text-center align-middle">Admin</td>
							<td className="centertext text-center align-middle">Admin</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default ManagerBill;
