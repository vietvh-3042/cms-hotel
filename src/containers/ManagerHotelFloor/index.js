import { MenuOutlined } from "@ant-design/icons";
import Breadcrumb from "@Components/BreadBreadcrumb";
import BaseButton from "@Components/Button";
import Search from "@Components/Search";
import { Button, Table } from "antd";
import React, { useState } from "react";
import { columns } from "./columns";
import ModalAddFloor from "./components/ModalAddFloor";

ManagerHotel.propTypes = {};

function ManagerHotel(props) {
  const [allData] = useState([]);
  const [visible, setVisible] = useState(false);
  function handleAddHotel() {
    setVisible(!visible);
  }

  return (
    <React.Fragment>
      <Breadcrumb title={"Danh sách lầu/tầng"} />
      <div className=" hasTable">
        <div className="flex mt-3 mx-6 justify-end">
          <Button icon={<MenuOutlined />} className="mr-3 flex items-center">
            Sắp xếp
          </Button>
          <BaseButton name={"Thêm"} handleAddHotel={handleAddHotel} />
        </div>
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
      <ModalAddFloor visible={visible} handleAddHotel={handleAddHotel} />
    </React.Fragment>
  );
}

export default ManagerHotel;
