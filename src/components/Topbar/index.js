import { actOpenSideBar, toggleCollapsed } from "@Actions/app";
import { MenuOutlined } from "@ant-design/icons";
import RightContent from "@Components/GlobalHeader/RightContent";
import { Layout } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const { Header } = Layout;

Topbar.propTypes = {};

function Topbar(props) {
  const dispatch = useDispatch();
  const view = useSelector((state) => state.App.view);

  return (
    <Header className="isomorphicTopbar">
      <div className="ant-pro-global-header">
        <MenuOutlined
          className="trigger"
          onClick={
            view !== "MobileView"
              ? () => dispatch(toggleCollapsed())
              : () => dispatch(actOpenSideBar())
          }
        />
        <RightContent />
      </div>
    </Header>
  );
}

export default Topbar;
