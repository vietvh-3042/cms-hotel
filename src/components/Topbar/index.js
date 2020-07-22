import { MenuOutlined } from "@ant-design/icons";
import { Layout, Select } from "antd";
import Axios from "axios";
import RightContent from "components/GlobalHeader/RightContent";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	actOpenSideBar,
	saveHotelID,
	toggleCollapsed,
} from "redux/actions/app";
import { API_Timeout, endpoint } from "settings";

const { Header } = Layout;

const { Option } = Select;

Topbar.propTypes = {};

function Topbar(props) {
	const dispatch = useDispatch();
	const [listHotel, setListHotel] = useState([]);
	const view = useSelector((state) => state.App.view);
	const user = useSelector((state) => state.Auth.user);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);
	const flag = useSelector((state) => state.App.flag);

	useEffect(() => {
		Axios({
			method: "GET",
			url: endpoint + "/tenant/hotel-manager/hotel",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: "Bearer" + user.meta.access_token,
				"tenant-name": user.data.name,
			},
			timeout: API_Timeout,
		}).then((res) => {
			setListHotel(res.data.data);
			if (hotel_ID === "") {
				if (res.data.data.length > 0)
					dispatch(saveHotelID(res.data.data[0].id));
			}
		});
	}, [flag]);

	function handleOnChangeHotel(value) {
		dispatch(saveHotelID(value));
	}

	return (
		<Header className="isomorphicTopbar">
			<div className="ant-pro-global-header flex justify-between">
				<div className="flex items-center">
					<MenuOutlined
						className="trigger"
						onClick={
							view !== "MobileView"
								? () => dispatch(toggleCollapsed())
								: () => dispatch(actOpenSideBar())
						}
					/>

					<Select
						className="w-280"
						value={hotel_ID}
						onChange={handleOnChangeHotel}
						placeholder="Chọn khách sạn"
					>
						{listHotel.map((value) => (
							<Option key={value.id} value={value.id}>
								{value.name}
							</Option>
						))}
					</Select>
				</div>
				<RightContent />
			</div>
		</Header>
	);
}

export default Topbar;
