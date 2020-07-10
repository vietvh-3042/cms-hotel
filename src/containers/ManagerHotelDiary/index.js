import { Table } from "antd";
import React, { useState } from "react";
import { columns } from "./columns";
import Breadcrumb from "@Components/BreadBreadcrumb";

ManagerHotelDiary.propTypes = {};

function ManagerHotelDiary(props) {
  const [allData] = useState([]);
  return (
    <React.Fragment>
      <Breadcrumb title={"Nhật kí sử dụng"} />
      <div className="hasTable">
        <div className="m-6">
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

export default ManagerHotelDiary;
