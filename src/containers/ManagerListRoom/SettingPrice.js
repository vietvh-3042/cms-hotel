import React from "react";

SettingPrice.propTypes = {};

function SettingPrice(props) {
	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
	return (
		<React.Fragment>
			<div>
				<span>♦ Một Ngày: </span>
				<b className="ml-2">{format_current(220000)}</b>
			</div>
			<div>
				<span>♦ Qua đêm : </span>
				<b className="ml-2">{format_current(160000)}</b>
			</div>
			<div>
				<span>♦</span>
				<span className="bold">Tính theo giờ:</span>
				<div className="ml-3">
					<span>• Giờ thứ 1:</span>
					<b className="ml-2">{format_current(50000)}</b>
				</div>
				<div className="ml-3">
					<span>• Giờ thứ 1:</span>
					<b className="ml-2">{format_current(70000)}</b>
				</div>
				<div className="ml-3">
					<span>• Giờ thứ 1:</span>
					<b className="ml-2">{format_current(90000)}</b>
				</div>
			</div>
		</React.Fragment>
	);
}

export default SettingPrice;
