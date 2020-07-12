import React from "react";
import PropTypes from "prop-types";
import Modal from "antd/lib/modal/Modal";
import { Table } from "reactstrap";

ModalDetails.propTypes = {
	handleViewDetail: PropTypes.func,
};

ModalDetails.defaultProps = {
	handleViewDetail: null,
};

function ModalDetails(props) {
	const { visibleDetail, handleViewDetail } = props;
	return (
		<Modal
			visible={visibleDetail}
			onCancel={handleViewDetail}
			footer={false}
			closable={false}
			bodyStyle={{ padding: 0 }}
			width={800}
		>
			<div className="modal_content">
				<div>
					<button className="dashboardButton mr-2">
						<span className="excel" />
						<span>Xuất File</span>
					</button>
				</div>
				<div className="mt-2">
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
							<tr className="bg-white">
								<td colSpan="9" className="centertext align-middle">
									Chưa có dữ liệu
								</td>
							</tr>
						</tbody>
					</Table>
				</div>
			</div>
		</Modal>
	);
}

export default ModalDetails;
