import { Button, Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

NotFound.propTypes = {};

function NotFound(props) {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link to="/">Quay Lại</Link>
        </Button>
      }
    />
  );
}

export default NotFound;
