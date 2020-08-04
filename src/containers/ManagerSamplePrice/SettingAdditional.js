import React from "react";

SettingAdditional.propTypes = {};

function SettingAdditional(props) {
	const { value } = props;

	function format_current(price) {
		return price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
	}
	return (
		<React.Fragment>
			<div>
				<span>♦ </span>
				<b className="text-red-600">Phụ trội quá giờ Checkout ở ngày </b>
				{value.priceTimes.data.map((val, key) => {
					if (val.group_price_time_id === 2)
						return (
							<div className="ml-3 text-sm" key={key}>
								<span>{`• Giờ thứ ${val.time}:`}</span>
								<b className="ml-2 bold" style={{ fontSize: 12 }}>
									{format_current(val.amount)}
								</b>
							</div>
						);
				})}
				<div className="ml-3">
					<span>• Quá qui định trên sẽ tính thành 1 ngày.</span>
				</div>
			</div>

			<div>
				<span>♦ </span>
				<b className="text-red-600">Phụ trội quá giờ Checkout ở qua đêm</b>
				{value.priceTimes.data.map((val, key) => {
					if (val.group_price_time_id === 4)
						return (
							<div className="ml-3 text-sm" key={key}>
								<span>{`• Giờ thứ ${val.time}:`}</span>
								<b className="ml-2 bold" style={{ fontSize: 12 }}>
									{format_current(val.amount)}
								</b>
							</div>
						);
				})}
				<div className="ml-3">
					<span>• Quá qui định trên sẽ tính thành 1 ngày.</span>
				</div>
			</div>

			<div>
				<span>♦ </span>
				<b className="text-red-600">Phụ trội vào sớm giờ Checkin ở ngày</b>
				{value.priceTimes.data.map((val, key) => {
					if (val.group_price_time_id === 8)
						return (
							<div className="ml-3 text-sm" key={key}>
								<span>{`• Giờ thứ ${val.time}:`}</span>
								<b className="ml-2 bold" style={{ fontSize: 12 }}>
									{format_current(val.amount)}
								</b>
							</div>
						);
				})}
				<div className="ml-3">
					<span>• Quá qui định trên sẽ tính thành 1 ngày.</span>
				</div>
			</div>

			<div>
				<span>♦ </span>
				<b className="text-red-600">Phụ trội vào sớm giờ Checkin ở qua đêm</b>
				{value.priceTimes.data.map((val, key) => {
					if (val.group_price_time_id === 16)
						return (
							<div className="ml-3 text-sm" key={key}>
								<span>{`• Giờ thứ ${val.time}:`}</span>
								<b className="ml-2 bold" style={{ fontSize: 12 }}>
									{format_current(val.amount)}
								</b>
							</div>
						);
				})}
				<div className="ml-3">
					<span>• Quá qui định trên sẽ tính thành 1 ngày.</span>
				</div>
			</div>

			<div>
				<span>♦ </span>
				<b className="text-red-600">Phụ trội quá số lượng người ở - Extra Bed</b>
				{value.priceTimes.data.map((val, key) => {
					if (val.group_price_time_id === 32)
						return (
							<div className="ml-3 text-sm" key={key}>
								<span>{`• Người thứ ${val.time}:`}</span>
								<b className="ml-2 bold" style={{ fontSize: 12 }}>
									{format_current(val.amount)}
								</b>
							</div>
						);
				})}
			</div>
		</React.Fragment>
	);
}

export default SettingAdditional;
