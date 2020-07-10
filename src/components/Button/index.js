import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

BaseButton.propTypes = {};

BaseButton.defaultProps = {
  handleAddHotel: null,
};

function BaseButton(props) {
  const { name, handleAddHotel } = props;
  return (
    <div className="add-button">
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddHotel}>
        {name}
      </Button>
    </div>
  );
}

export default BaseButton;
