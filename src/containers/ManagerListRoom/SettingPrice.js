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
				{value.typePrices.data.map((value, key) => (
					<b className="ml-2 bold" style={{ fontSize: 12 }} key={key}>
						{format_current(value.price_day)}
					</b>
				))}
			</div>
			<div>
				<span>♦ Qua đêm : </span>
				{value.typePrices.data.map((value, key) => (
					<b className="ml-2 bold" style={{ fontSize: 12 }} key={key}>
						{format_current(value.price_night)}
					</b>
				))}
			</div>
			{value.typePrices.data.map((value, key) => (
				<div key={key}>
					<span>♦</span>
					<span className="bold" style={{ fontSize: 12 }}>
						Tính theo giờ:
						{value.priceTimes.data.map((val, key) => {
							if (val.group_price_time_id === 1)
								return (
									<div className="ml-3">
										<span>{`• Giờ thứ ${val.time}:`}</span>
										<b className="ml-2 bold" style={{ fontSize: 12 }}>
											{format_current(val.amount)}
										</b>
									</div>
								);
						})}
					</span>
				</div>
			))}
		</React.Fragment>
	);
}

export default SettingPrice;
