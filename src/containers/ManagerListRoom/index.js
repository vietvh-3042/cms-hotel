import { PlusOutlined } from "@ant-design/icons";
import Breadcrumb from "@Components/BreadBreadcrumb";
import { Button, Table } from "antd";
import React, { useState } from "react";
import { columns } from "./columns";
import ModalAddListRoom from "./components/ModalAddListRoom";

ManagerListRoom.propTypes = {};

function ManagerListRoom(props) {
  const [allData] = useState([]);
  const [visible, setVisible] = useState(false);
  function handleListRoom() {
    setVisible(!visible);
  }
  return (
    <React.Fragment>
      <Breadcrumb title={"Danh sách các loại phòng"} />
      <div className="hasTable">
        <div className="text-right mt-3 mx-6">
          <button className="focus:outline-none" onClick={handleListRoom}>
            <span>Thêm loại phòng</span>
          </button>
        </div>
        <div className="page-header-wrap-children-content">
          <Table
            rowKey={(record) => record._id}
            columns={columns}
            dataSource={allData}
            scroll={{ x: true }}
          />
        </div>
      </div>
      <ModalAddListRoom visible={visible} handleListRoom={handleListRoom} />
    </React.Fragment>
  );
}

export default ManagerListRoom;
