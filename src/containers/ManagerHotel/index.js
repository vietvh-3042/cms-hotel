import Breadcrumb from "@Components/BreadBreadcrumb";
import BaseButton from "@Components/Button";
import Search from "@Components/Search";
import { Table, Button } from "antd";
import React, { useState } from "react";
import { columns } from "./columns";
import ModalAddHotel from "./components/ModalAddHotel";
import { PlusOutlined } from "@ant-design/icons";

ManagerHotel.propTypes = {};

function ManagerHotel(props) {
  const [allData] = useState([]);
  const [visible, setVisible] = useState(false);
  function handleAddHotel() {
    setVisible(!visible);
  }

  return (
    <React.Fragment>
      <Breadcrumb title={"Danh sách khách sạn"} />
      <div className="hasTable">
        {/* <div onClick={handleAddHotel}>
          <BaseButton name={"Thêm"} />
        </div> */}

        <div className="add-button mx-6 mt-3">
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddHotel}
          >
            Thêm
          </Button>
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
      <ModalAddHotel visible={visible} handleAddHotel={handleAddHotel} />
    </React.Fragment>
  );
}

export default ManagerHotel;
