import { MenuOutlined } from "@ant-design/icons";
import { Layout, Select } from "antd";
import RightContent from "components/GlobalHeader/RightContent";
import CommonApi from "helpers/APIS/CommonApi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	actOpenSideBar,
	saveHotelID,
	toggleCollapsed,
} from "redux/actions/app";

const { Header } = Layout;

const { Option } = Select;

Topbar.propTypes = {};

function Topbar(props) {
	const dispatch = useDispatch();
	const [listHotel, setListHotel] = useState([]);
	const view = useSelector((state) => state.App.view);
	const hotel_ID = useSelector((state) => state.App.hotel_ID);
	const flag = useSelector((state) => state.App.flag);

	useEffect(() => {
		CommonApi("GET", "/tenant/hotel-manager/hotel", null).then((res) => {
			setListHotel(res.data.data);
			if (hotel_ID === "") {
				if (res.data.data.length > 0) dispatch(saveHotelID(res.data.data[0].id));
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
