import React from "react";

SettingAdditional.propTypes = {};

function SettingAdditional(props) {
	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
	return (
		<React.Fragment>
			<div className="text-sm">
				<span>♦ </span>
				<b className="text-red-600">Phụ trội quá giờ Checkout ở ngày </b>
				<div className="ml-3 text-sm">
					<span>• Giờ thứ 1:</span>
					<b className="ml-2">{format_current(50000)}</b>
				</div>
				<div className="ml-3">
					<span>• Quá qui định trên sẽ tính thành 1 ngày.</span>
				</div>
			</div>

			<div className="text-sm">
				<span>♦ </span>
				<b className="text-red-600">Phụ trội quá giờ Checkout ở qua đêm</b>
				<div className="ml-3 text-sm">
					<span>• Giờ thứ 1:</span>
					<b className="ml-2">Miễn Phí</b>
				</div>
				<div className="ml-3">
					<span>• Quá qui định trên sẽ tính thành 1 ngày.</span>
				</div>
			</div>

			<div className="text-sm">
				<span>♦ </span>
				<b className="text-red-600">Phụ trội vào sớm giờ Checkin ở ngày</b>
				<div className="ml-3 text-sm">
					<span>• Giờ thứ 1 -&gt; 3:</span>
					<b className="ml-2">Miễn Phí</b>
				</div>
				<div className="ml-3">
					<span>• Tiếp theo tính theo giá qua đêm.</span> <br />
					<span>• Quá qui định trên sẽ tính thành 1 ngày.</span>
				</div>
			</div>

			<div className="text-sm">
				<span>♦ </span>
				<b className="text-red-600">
					Phụ trội quá số lượng người ở - Extra Bed
				</b>
				<div className="ml-3 text-sm">
					<span>• Phụ trội mỗi người tiếp theo:</span>
					<b className="ml-2">{format_current(50000)}</b>
				</div>
			</div>
		</React.Fragment>
	);
}

export default SettingAdditional;
