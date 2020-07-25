import React from "react";

StatusHotel.propTypes = {};

function StatusHotel(props) {
	const { quantity, title, background } = props;
	return (
		<div className="flex items-center w-6/12 md:w-1/5 lg:w-1/6 mb-2">
			<span className={`qty_room text-center ${background}`}>{quantity}</span>
			<span>
				<strong>{title}</strong>
			</span>
		</div>
	);
}

export default StatusHotel;
