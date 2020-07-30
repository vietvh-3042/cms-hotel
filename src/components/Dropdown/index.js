import React from "react";
import { Dropdown } from "antd";

DropdownCustom.propTypes = {};

function DropdownCustom(props) {
	const { menu, name, className } = props;
	return (
		<Dropdown {...props} overlay={menu}>
			<div className={className}>{name}</div>
		</Dropdown>
	);
}

export default DropdownCustom;
