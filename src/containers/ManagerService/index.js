import { Tooltip } from "antd";
import React, { useState } from "react";
import { Table } from "reactstrap";
import ModalAddService from "./components/ModalAddService";
import { useHistory } from "react-router-dom";

ManagerService.propTypes = {};

function ManagerService(props) {
	const history = useHistory();
	const [visible, setVisible] = useState(false);
	function handleAddListService() {
		setVisible(!visible);
	}
	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	function handleGetWarehousing(id) {
		history.push("/dashboard/list-service/warehousing/" + id);
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
					<span className="titleMainContain">Dịch vụ và kho</span>
				</div>
				<button
					className="dashboardButton mr-3 focus:outline-none"
					onClick={handleAddListService}
				>
					<span className="add"></span>
					<span>Thêm</span>
				</button>
			</div>
			<div className="mt-2 mx-2">
				<Table bordered hover responsive size="sm">
					<thead>
						<tr>
							<th className="w-3 sorting_disabled align-middle">STT</th>
							<th className="w-3 sorting_disabled align-middle">Tên dịch vụ</th>
							<th className="w-3 sorting_disabled align-middle">Giá bán</th>
							<th className="w-3 sorting_disabled align-middle text-right">
								SL.tồn <br />
								Đầu kỳ(1)
							</th>
							<th className="w-3 sorting_disabled align-middle text-right">
								Đã nhập <br />
								Trong kỳ(2)
							</th>
							<th className="w-3 sorting_disabled align-middle text-right">
								Đã bán <br />
								Trong kỳ(3)
							</th>
							<th className="w-3 sorting_disabled align-middle text-right">
								Doanh thu <br />
								Trong kỳ
							</th>
							<th className="w-3 sorting_disabled align-middle text-right">
								SL. Tồn <br />
								Cuối kỳ(1+2+3)
							</th>
							<th className="w-3 sorting_disabled align-middle">Ghi chú</th>
							<th className="w-3 sorting_disabled align-middle">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colSpan="10">
								<img
									src="/images/Common/status.png"
									alt="status"
									className="ml-3 mr-1 inline"
								/>
								<b style={{ color: "#d53b0a" }} className="centertext">
									Đồ Uống
								</b>
							</td>
						</tr>
						<tr>
							<td className="centertext text-center align-middle">1</td>
							<td className="centertext bold align-middle">Nước Suối</td>
							<td className="centertext text-right align-middle">
								{format_current(10000)}
							</td>
							<td className="centertext text-right align-middle">0</td>
							<td className="centertext align-middle">
								<div className="flex items-center">
									<span className="w-6/12 text-right inline-block">0</span>
									<Tooltip placement="top" title="Nhập-Xuất kho mặt hàng này">
										<span
											className="w-6/12 inline-block pl-2"
											onClick={() => handleGetWarehousing(1)}
										>
											<img src="/images/Common/add.png" alt="add" />
										</span>
									</Tooltip>
								</div>
							</td>
							<td className="centertext align-middle">
								<div className="flex items-center">
									<span className="w-6/12 text-right inline-block">0</span>
									<span className="w-6/12 inline-block pl-2">
										<img
											src="/images/Sidebar/Staff/shift-history.png"
											alt="shift-history"
										/>
									</span>
								</div>
							</td>
							<td className="centertext text-right align-middle">0</td>
							<td className="centertext text-right align-middle">
								<span className="text-red-600 bold">0</span>
							</td>
							<td className="centertext align-middle">10</td>
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

						<tr>
							<td colSpan="10">
								<img
									src="/images/Common/status.png"
									alt="status"
									className="ml-3 mr-1 inline"
								/>
								<b style={{ color: "#d53b0a" }} className="centertext">
									Đồ Ăn
								</b>
							</td>
						</tr>
						<tr>
							<td className="centertext text-center align-middle">2</td>
							<td className="centertext bold align-middle">Bánh Cook</td>
							<td className="centertext text-right align-middle">
								{format_current(10000)}
							</td>
							<td className="centertext text-right align-middle">0</td>
							<td className="centertext align-middle">
								<div className="flex items-center">
									<span className="w-6/12 text-right inline-block">0</span>
									<span className="w-6/12 inline-block pl-2">
										<img src="/images/Common/add.png" alt="add" />
									</span>
								</div>
							</td>
							<td className="centertext align-middle">
								<div className="flex items-center">
									<span className="w-6/12 text-right inline-block">0</span>
									<span className="w-6/12 inline-block pl-2">
										<img
											src="/images/Sidebar/Staff/shift-history.png"
											alt="shift-history"
										/>
									</span>
								</div>
							</td>
							<td className="centertext text-right align-middle">0</td>
							<td className="centertext text-right align-middle">
								<span className="text-red-600 bold">0</span>
							</td>
							<td className="centertext align-middle">10</td>
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
			<ModalAddService
				visible={visible}
				handleAddListService={handleAddListService}
			/>
		</div>
	);
}

export default ManagerService;
