import { Tooltip } from "antd";
import React from "react";

ManagerRecentRevenue.propTypes = {};

function ManagerRecentRevenue(props) {
	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<span className="titleMainContain">Tổng Kết Doanh thu</span>
				<Tooltip placement="top" title="Tải về Excel dữ liệu">
					<button className="grey mr-2">
						<span className="excel" />
						<span>Xuất File</span>
					</button>
				</Tooltip>
			</div>
		</div>
	);
}

export default ManagerRecentRevenue;
