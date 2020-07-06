import Breadcrumb from "@Components/BreadBreadcrumb";
import BaseButton from "@Components/Button";
import Search from "@Components/Search";
import { Table } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { columns } from "./columns";

ManagerHotel.propTypes = {};

function ManagerHotel(props) {
  const [allData] = useState([]);

  return (
    <React.Fragment>
      <Breadcrumb title={"Danh sách khách sạn"} />
      <div className=" hasTable">
        <Link to="/dashboard/users/form">
          <BaseButton name={"Thêm"} />
        </Link>
        <Search />
        <div className="page-header-wrap-children-content">
          <Table
            rowKey={(record) => record._id}
            columns={columns}
            dataSource={allData}
            scroll={{ x: true }}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default ManagerHotel;
