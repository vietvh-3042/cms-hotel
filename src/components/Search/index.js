import React from "react";
import { Select } from "antd";
import PropTypes from "prop-types";

const { Option } = Select;

Search.propTypes = {};

function Search(props) {
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <div className="ml-6 text-black">
      <span className="mr-2">Hiển thị</span>
      <Select defaultValue="10" style={{ width: 80 }} onChange={handleChange}>
        <Option value="5">5</Option>
        <Option value="10">10</Option>
        <Option value="15">15</Option>
        <Option value="25">25</Option>
        <Option value="59">50</Option>
        <Option value="100">100</Option>
        <Option value="200">200</Option>
      </Select>
      <span className="ml-2">khách sạn</span>
    </div>
  );
}

export default Search;
