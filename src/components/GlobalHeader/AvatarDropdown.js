import { LogoutOutlined } from "@ant-design/icons";
import { Avatar, Menu } from "antd";
import React from "react";
import HeaderDropdown from "../HeaderDropdown";
import { logout } from "@Actions/auth";
import { useDispatch } from "react-redux";

AvatarDropdown.propTypes = {};

function AvatarDropdown(props) {
	const { username } = props;
	const dispatch = useDispatch();

	const menuHeaderDropdown = (
		<Menu className="menu">
			<Menu.Item
				key="logout"
				className="flex items-center"
				onClick={() => dispatch(logout())}
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
					size="32"
					src="https://thietkelogo.vn/wp-content/uploads/2016/02/logo-dep.png"
					alt="avatar"
					className="avatar"
				/>
				{/* <span>{username}</span> */}
				<span className="name-admin">Admin</span>
			</span>
		</HeaderDropdown>
	);
}

export default AvatarDropdown;
