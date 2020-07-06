import { toggleAll } from "@Actions/app";
import Sidebar from "@Components/Sidebar";
import Topbar from "@Components/Topbar";
import { Layout } from "antd";
import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import WindowResize from "react-window-size-listener";

const { Content } = Layout;

BasicLayout.propTypes = {};

function BasicLayout(props) {
  const url = "/dashboard";
  const { children, height } = props;
  const dispatch = useDispatch();
  const collapsed = useSelector((state) => state.App.collapsed);
  const view = useSelector((state) => state.App.view);
  return (
    <Layout style={{ height: height }}>
      <WindowResize
        onResize={(windowSize) =>
          dispatch(toggleAll(windowSize.windowWidth, windowSize.windowHeight))
        }
      />
      <Sidebar url={url} />
      <Layout
        className={classNames({
          isomorphicLayout:
            view !== "MobileView" ? true : false || collapsed ? false : true,
          // isomorphicLayout: collapsed ? false : true,
          isomorphicLayoutCol: collapsed ? true : false,
        })}
      >
        <Topbar url={url} />
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}

export default BasicLayout;
