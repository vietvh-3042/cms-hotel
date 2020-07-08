import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

BaseButton.propTypes = {};

function BaseButton(props) {
  const { name } = props;
  return (
    <div className="add-button">
      <Button type="primary" icon={<PlusOutlined />}>
        {name}
      </Button>
    </div>
  );
}

export default BaseButton;
