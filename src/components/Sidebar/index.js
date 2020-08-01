import { Drawer, Layout, Menu } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { actCloseSideBar } from "../../redux/actions/app";
import Logo from "../utility/logo";
import options from "./options";

const { Sider } = Layout;
const { SubMenu } = Menu;

const stripTrailingSlash = (str) => {
	if (str.substr(-1) === "/") {
		return str.substr(0, str.length - 1);
	}
	return str;
};

Sidebar.propTypes = {};

function Sidebar(props) {
	const dispatch = useDispatch();
	const view = useSelector((state) => state.App.view);
	const collapsed = useSelector((state) => state.App.collapsed);
	const visibleSideBar = useSelector((state) => state.App.visibleSideBar);
	const mode = collapsed === true ? "vertical" : "inline";

	function getMenuItem(Option) {
		const { key, label, icon, children } = Option;
		const url = stripTrailingSlash(props.url);
		if (children) {
			return (
				<SubMenu
					key={key}
					title={
						<span className="isMenuHoder inline-flex items-center w-full">
							<img src={icon} alt={icon} />
							<span className="textMenu ml-8">{label}</span>
						</span>
					}
					className="menuItem"
				>
					{children.map((child) => {
						return (
							<Menu.Item key={child.key}>
								<Link to={`${url}/${child.key}`}>
									<span className="isMenuHoder inline-flex items-center w-full">
										<img src={child.icon} alt={child.icon} />
										<span className="textMenu ml-3">{child.label}</span>
									</span>
								</Link>
							</Menu.Item>
						);
					})}
				</SubMenu>
			);
		} else {
			return (
				<Menu.Item key={key}>
					<Link to={`${key === "" ? url : `${url}/${key}`}`}>
						<span className="inline-flex items-center">
							<img src={icon} alt={icon} className="pr-8" />
							<span className="textMenu">{label}</span>
						</span>
					</Link>
				</Menu.Item>
			);
		}
	}

	function handleActCloseSideBar() {
		dispatch(actCloseSideBar());
	}

	return (
		<React.Fragment>
			{view !== "MobileView" ? (
				<Sider
					trigger={null}
					collapsible={true}
					collapsed={collapsed}
					className="isomorphicSidebar"
					width={260}
				>
					<Logo collapsed={collapsed} />
					<Menu theme="dark" mode={mode} className="dashboardMenu">
						{options.map((Option) => getMenuItem(Option))}
					</Menu>
				</Sider>
			) : (
				<Drawer
					visible={visibleSideBar}
					onClose={handleActCloseSideBar}
					placement="left"
					closable={false}
					bodyStyle={{ padding: 0, background: "#001529" }}
					drawerStyle={{ background: "#001529" }}
				>
					<Logo collapsed={false} />
					<Menu theme="dark" mode={mode} className="dashboardMenu">
						{options.map((Option) => getMenuItem(Option))}
					</Menu>
				</Drawer>
			)}
		</React.Fragment>
	);
}

export default Sidebar;
