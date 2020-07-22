import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAuthState } from "redux/actions/auth";
import HeaderDropdown from "../HeaderDropdown";

AvatarDropdown.propTypes = {};

function AvatarDropdown(props) {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.Auth.user);

	const menuHeaderDropdown = (
		<Menu className="menu">
			<Menu.Item
				key="logout"
				className="flex items-center"
				onClick={() => dispatch(setAuthState(false))}
			>
				<LogoutOutlined />
				<span className="menuText font-bold text-xs">Đăng Xuất</span>
			</Menu.Item>
		</Menu>
	);
	return (
		<HeaderDropdown overlay={menuHeaderDropdown}>
			<span className="account action">
				<Avatar
					size="48"
					src="/images/User/user.jpg"
					alt="avatar"
					className="avatar"
				/>
				<span className="name-admin capitalize">{user.data.name}</span>
			</span>
		</HeaderDropdown>
	);
}

export default AvatarDropdown;
