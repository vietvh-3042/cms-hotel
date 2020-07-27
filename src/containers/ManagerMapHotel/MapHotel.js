import { Spin, Empty } from "antd";
import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { API_Timeout, endpoint } from "settings";

MapHotel.propTypes = {};

function MapHotel(props) {
	const [loading, setLoading] = useState(false);
	const [detailHotel, setDetailHotel] = useState();
	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);

	useEffect(() => {
		setLoading(true);
		Axios({
			method: "GET",
			url:
				endpoint +
				"/tenant/hotel-manager/hotel/" +
				hotel_ID +
				"?include=floors.rooms",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
			},
			timeout: API_Timeout,
		}).then((res) => {
			setDetailHotel(res.data.data);
			setLoading(false);
		});
	}, [hotel_ID]);

	function renderRoom() {
		if (!detailHotel) return;
		else
			return detailHotel.floors.data.map((value) => (
				<div className="flex flex-col md:flex-row" key={value.id}>
					<div
						className="w-32 bg-gray-600 flex items-center font-bold text-white justify-center mb-2 mr-2 
					hover:bg-gray-700 cursor-pointer"
					>
						{value.name}
					</div>
					<div className="flex flex-wrap">
						{value.rooms.data.map((value, key) => (
							<div
								className="w-24 h-20 bg-green-600 flex items-center 
							font-bold text-white justify-center mb-2 mr-2 hover:bg-green-700 cursor-pointer"
								key={key}
							>
								{value.name}
							</div>
						))}
					</div>
				</div>
			));
	}

	return (
		<div className="mt-3 pl-1">
			{loading ? (
				<div className="text-center">
					<Spin />
				</div>
			) : (
				<div>{renderRoom()}</div>
			)}
		</div>
	);
}

export default MapHotel;
