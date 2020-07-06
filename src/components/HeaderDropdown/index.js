import { Dropdown } from "antd";
import React from "react";
const HeaderDropdown = ({ ...restProps }) => (
  <Dropdown
    // overlayClassName={classNames(styles.container)}
    {...restProps}
  />
);
export default HeaderDropdown;
