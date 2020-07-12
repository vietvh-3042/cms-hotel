import { Tooltip } from "antd";
import React, { useState } from "react";
import { Table } from "reactstrap";
import ModalAddReceipt from "./components/ModalAddReceipt";
import ModalUpdateReceipt from "./components/ModalUpdateReceipt";

ManagerReceipts.propTypes = {};

function ManagerReceipts(props) {
	const [visible, setVisible] = useState(false);
	const [visibleUpdate, setVisibleUpdate] = useState(false);

	function handleAddReceipt() {
		setVisible(!visible);
	}
	function handleUpdateReceipt() {
		setVisibleUpdate(!visibleUpdate);
	}
	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="/images/Sidebar/TienChi/receipts.png"
						alt="list-service"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Quản lý phiếu thu </span>
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
						onClick={handleAddReceipt}
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
							<th className="w-3 sorting_disabled align-middle">Mã Phiếu</th>
							<th className="w-3 sorting_disabled align-middle">Ngày tạo</th>
							<th className="w-3 sorting_disabled align-middle">
								Diễn giải phiếu thu
							</th>
							<th className="w-3 sorting_disabled align-middle">Số tiền</th>
							<th className="w-3 sorting_disabled align-middle">Hình thức</th>
							<th className="w-3 sorting_disabled align-middle">Người trả</th>
							<th className="w-3 sorting_disabled align-middle">Tạo bởi</th>
							<th className="w-3 sorting_disabled align-middle">Ghi chú</th>
							<th className="w-3 sorting_disabled align-middle">Thao tác</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="centertext text-center align-middle">1</td>
							<td className="centertext text-center align-middle">PT000001</td>
							<td className="centertext text-center align-middle">
								12/07/2020 13:35
							</td>
							<td className="centertext text-center align-middle">1213</td>
							<td className="centertext text-center align-middle bold">
								{format_current(1546464)}
							</td>
							<td className="centertext text-center align-middle">Tiền Mặt</td>
							<td className="centertext text-center align-middle">435345</td>
							<td className="centertext text-center align-middle">
								hotel123456
							</td>
							<td className="centertext text-center align-middle"></td>
							<td className="pt-2 align-middle">
								<div className=" h-full flex items-center justify-center">
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
											onClick={handleUpdateReceipt}
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
			<ModalAddReceipt visible={visible} handleAddReceipt={handleAddReceipt} />
			<ModalUpdateReceipt
				visible={visibleUpdate}
				handleUpdateReceipt={handleUpdateReceipt}
			/>
		</div>
	);
}

export default ManagerReceipts;
