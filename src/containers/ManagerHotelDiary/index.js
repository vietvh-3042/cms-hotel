import React from "react";
import { Table } from "reactstrap";

ManagerHotelDiary.propTypes = {};

function ManagerHotelDiary(props) {
	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex justify-between items-center">
				<div className="h-full flex items-center">
					<img
						src="/images/Header/diary.png"
						alt="list-hotel"
						className="inline ml-3"
					/>
					<span className="titleMainContain">Nhật ký sử dụng</span>
				</div>
			</div>
			<div className="mt-2 mx-2">
				<Table bordered hover responsive size="sm">
					<thead>
						<tr>
							<th className="w-3 sorting_disabled">Thời gian</th>
							<th className="w-3 sorting_disabled">Username</th>
							<th className="w-3 sorting_disabled">Thao tác</th>
							<th className="w-3 sorting_disabled">Chi tiết</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colSpan="4">Chưa có dữ liệu</td>
						</tr>
					</tbody>
				</Table>
			</div>
		</div>
	);
}

export default ManagerHotelDiary;
