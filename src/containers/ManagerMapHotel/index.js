import { Empty } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import MapHotel from "./MapHotel";
import GroupStatusHotel from "./GroupStatusHotel";

ManagerMapHotel.propTypes = {};

function ManagerMapHotel(props) {
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	return (
		<div className="onecolumn mt-2 mx-2">
			<div className="header flex items-center">
				<span className="titleMainContain ml-3">Sơ đồ khách sạn</span>
			</div>
			<div className="mt-2 mx-2 ml-3">
				{!hotel_ID ? (
					// <Empty />
					<GroupStatusHotel />
				) : (
					<React.Fragment>
						{/* <StatusHotel /> */}
						<MapHotel />
					</React.Fragment>
				)}
			</div>
		</div>
	);
}

export default ManagerMapHotel;
