import { Tooltip } from "antd";
import React, { useState } from "react";
import { Table } from "reactstrap";
import ModalAddPayment from "./components/ModalAddPayment";
import ModalUpdatePayment from "./components/ModalUpdatePayment";

ManagerPayment.propTypes = {};

function ManagerPayment(props) {
	const [visible, setVisible] = useState(false);

	const [status, setStatus] = useState(false);

	const [visibleUpdate, setVisibleUpdate] = useState(false);

	function handleAddPayment() {
		setVisible(!visible);
	}

	function handleUpdatePayment() {
		setVisibleUpdate(!visibleUpdate);
	}

	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}

	function handleStatus() {}

	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="http://server6.skyhotel.vn/images/icons/costcart24.png"
						alt="list-service"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Quản lý phiếu chi</span>
				</div>
				<div>
					<Tooltip placement="top" title="Tải về Excel dữ liệu">
						<button className="grey mr-2">
							<span className="excel" />
							<span>Xuất File</span>
						</button>
					</Tooltip>
					<button
						className="dashboardButton mr-3 focus:outline-none"
						onClick={handleAddPayment}
					>
						<span className="add"></span>
						<span>Thêm</span>
					</button>
				</div>
			</div>
			<div className="mt-2 mx-2">
				<Table bordered hover responsive size="sm">
					<thead>
						<tr>
							<th className="w-3 sorting_disabled align-middle">STT</th>
							<th className="w-3 sorting_disabled align-middle">Mã phiếu</th>
							<th className="w-3 sorting_disabled align-middle">Ngày chứng từ</th>
							<th className="w-3 sorting_disabled align-middle">Này tạo</th>
							<th className="w-3 sorting_disabled align-middle">Diễn giải chi phí</th>
							<th className="w-3 sorting_disabled align-middle">Số tiền</th>
							<th className="w-3 sorting_disabled align-middle">Loại chi phí</th>
							<th className="w-3 sorting_disabled align-middle">Người nhận</th>
							<th className="w-3 sorting_disabled align-middle">Tạo bởi</th>
							<th className="w-3 sorting_disabled align-middle">Ghi chú</th>
							<th className="w-3 sorting_disabled align-middle">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						<tr className="row_info">
							<td className="centertext text-center align-middle">1</td>
							<td className="centertext text-center align-middle">PC000001</td>
							<td className="centertext text-center align-middle">12/07/2020 12:33</td>
							<td className="centertext text-center align-middle">12/07/2020 12:33</td>
							<td className="centertext text-center align-middle">
								Nhập kho [10 Nước Suối ][10 x 10,000]
								<span style={{ color: "red" }}> [Không tính khi Giao Ca]</span>
							</td>
							<td className="centertext text-center align-middle">
								{format_current(100000)}
							</td>
							<td className="centertext text-center align-middle"></td>
							<td className="centertext text-center align-middle"></td>
							<td className="centertext text-center align-middle">hotel123456</td>
							<td className="centertext text-center align-middle"></td>
							<td className="pt-2 align-middle">
								<div className=" h-full flex items-center justify-center flex-wrap">
									<Tooltip placement="top" title="Print">
										<img
											src="http://server6.skyhotel.vn/images/icons/fugue/printer16.png"
											alt="print"
											className="ml-2 mr-2 cursor-pointer"
										/>
									</Tooltip>
									<Tooltip placement="top" title="Xem chi tiết">
										<img
											src="/images/Actions/Edit.png"
											alt="Edit"
											className="mr-2 cursor-pointer"
											onClick={handleUpdatePayment}
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

						<tr className="row_nopay">
							<td className="centertext text-center align-middle">2</td>
							<td className="centertext text-center align-middle">PC000002</td>
							<td className="centertext text-center align-middle">12/07/2020 12:33</td>
							<td className="centertext text-center align-middle">12/07/2020 12:33</td>
							<td className="centertext text-center align-middle">
								Nhập kho [10 Nước Suối ][10 x 10,000]
								<span style={{ color: "red" }}> [Không tính khi Giao Ca]</span>
							</td>
							<td className="centertext text-center align-middle">
								{format_current(100000)}
							</td>
							<td className="centertext text-center align-middle"></td>
							<td className="centertext text-center align-middle"></td>
							<td className="centertext text-center align-middle">hotel123456</td>
							<td className="centertext text-center align-middle"></td>
							<td className="pt-2 align-middle">
								<div className=" h-full flex items-center justify-center flex-wrap">
									<Tooltip placement="top" title="Print">
										<img
											src="http://server6.skyhotel.vn/images/icons/fugue/printer16.png"
											alt="print"
											className="ml-2 mr-2 cursor-pointer"
										/>
									</Tooltip>
									<Tooltip placement="top" title="Xem chi tiết">
										<img
											src="/images/Actions/Edit.png"
											alt="Edit"
											className="mr-2 cursor-pointer"
											onClick={handleUpdatePayment}
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
			<ModalAddPayment visible={visible} handleAddPayment={handleAddPayment} />
			<ModalUpdatePayment
				visible={visibleUpdate}
				handleUpdatePayment={handleUpdatePayment}
			/>
		</div>
	);
}

export default ManagerPayment;
