import React from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { Tooltip } from "antd";

ManagerWarehousing.propTypes = {};

function ManagerWarehousing(props) {
	let { id } = useParams();
	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="/images/Sidebar/Services/list-service.png"
						alt="list-service"
						className="inline ml-3"
					/>
					<span className="titleMainContain">{`Kho dịch vụ [${id}]`}</span>
				</div>
				<button className="dashboardButton mr-3 focus:outline-none">
					<span className="add"></span>
					<span>Nhập kho</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table bordered hover responsive size="sm">
					<thead>
						<tr>
							<th className="w-3 sorting_disabled align-middle">STT</th>
							<th className="w-3 sorting_disabled align-middle">SL</th>
							<th className="w-3 sorting_disabled align-middle">Đơn giá</th>
							<th className="w-3 sorting_disabled align-middle">Thành tiền</th>
							<th className="w-3 sorting_disabled align-middle">
								Mã phiếu chi
							</th>
							<th className="w-3 sorting_disabled align-middle">Thời gian</th>
							<th className="w-3 sorting_disabled align-middle">Người nhập</th>
							<th className="w-3 sorting_disabled align-middle">Ghi chú</th>
							<th className="w-3 sorting_disabled align-middle">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="centertext text-center align-middle">1</td>
							<td className="centertext text-center bold align-middle">10</td>
							<td className="centertext text-center align-middle">
								{format_current(10000)}
							</td>
							<td className="centertext text-center bold align-middle">
								{format_current(100000)}
							</td>
							<td className="centertext text-center bold align-middle">
								PC000002
							</td>
							<td className="centertext text-center align-middle">
								12/07/2020 00:27
							</td>
							<td className="centertext text-center align-middle">Admin</td>
							<td></td>
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
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default ManagerWarehousing;
