import React from "react";
import PropTypes from "prop-types";
import { Table, Modal } from "antd";

ModalAddHotel.propTypes = {};

function ModalAddHotel(props) {
  const { visible, handleAddHotel } = props;
  return (
    <Modal
      visible={visible}
      okText="Thêm"
      cancelText="Cancel"
      onCancel={handleAddHotel}
    >
      13
    </Modal>
  );
}

export default ModalAddHotel;
