import { Tooltip } from "antd";
import React from "react";
import { Table } from "reactstrap";

ManagerBusinessResult.propTypes = {};

function ManagerBusinessResult(props) {
	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex flex-col md:flex-row md:justify-between md:items-center">
				<div className="h-full flex items-center group2">
					<img
						src="http://server6.skyhotel.vn//images/icons/web-app/24/dochome24.png"
						alt="list-service"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Kết Quả Hoạt Động Kinh Doanh</span>
				</div>
				<div className="group3">
					<Tooltip placement="top" title="In thông tin Dịch vụ & Kho hiện tại">
						<button className="grey mr-2">
							<span className="print" />
							<span>Print</span>
						</button>
					</Tooltip>
					<Tooltip placement="top" title="Tải về Excel dữ liệu">
						<button className="grey mr-2">
							<span className="excel" />
							<span>Xuất File</span>
						</button>
					</Tooltip>
				</div>
			</div>
			<div className="mt-2 mx-2">
				<Table bordered hover responsive size="sm">
					<thead>
						<tr>
							<th className="w-3 sorting_disabled align-middle">STT</th>
							<th className="w-3 sorting_disabled align-middle">Chỉ tiêu</th>
							<th className="w-3 sorting_disabled align-middle">VNĐ</th>
							<th className="w-3 sorting_disabled align-middle">Ghi chú</th>
						</tr>
					</thead>
				</Table>
			</div>
		</div>
	);
}

export default ManagerBusinessResult;
