import React from "react";

SettingPrice.propTypes = {};

function SettingPrice(props) {
	const { value } = props;
	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
	return (
		<React.Fragment>
			<div>
				<span>♦ Một Ngày: </span>
				<b className="ml-2 bold" style={{ fontSize: 12 }}>
					{format_current(value.price_day)}
				</b>
			</div>
			<div>
				<span>♦ Qua đêm : </span>
				<b className="ml-2 bold" style={{ fontSize: 12 }}>
					{format_current(value.price_night)}
				</b>
			</div>
			<div>
				<span>♦</span>
				<span className="bold" style={{ fontSize: 12 }}>
					Tính theo giờ:
				</span>
				<div className="ml-3">
					<span>• Giờ thứ 1:</span>
					<b className="ml-2 bold" style={{ fontSize: 12 }}>
						{format_current(50000)}
					</b>
				</div>
				<div className="ml-3">
					<span>• Giờ thứ 1:</span>
					<b className="ml-2 bold" style={{ fontSize: 12 }}>
						{format_current(70000)}
					</b>
				</div>
				<div className="ml-3">
					<span>• Giờ thứ 1:</span>
					<b className="ml-2 bold" style={{ fontSize: 12 }}>
						{format_current(90000)}
					</b>
				</div>
			</div>
		</React.Fragment>
	);
}

export default SettingPrice;
