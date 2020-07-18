import React from "react";
import { Link } from "react-router-dom";

Header.propTypes = {};

function Header(props) {
	return (
		<header id="header">
			<h1 className="logo flex items-center">
				<Link to="/" className="logo__link">
					<img src="images/Home/logo_landing.gif" alt="logo_landing.gif" />
				</Link>
			</h1>
			<ul className="menu">
				<li className="menu-list">
					<Link exact to="/" className="menu-list__link medium">
						Trang chủ
					</Link>
				</li>

				<li className="menu-list">
					<Link to="/" className="menu-list__link medium">
						Blogs
					</Link>
				</li>

				<li className="menu-list menu-login">
					<Link to="/" className="menu-list__link medium">
						Đăng nhập
					</Link>
				</li>
			</ul>
		</header>
	);
}

export default Header;
