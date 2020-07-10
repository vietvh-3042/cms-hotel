import React from "react";
import PropTypes from "prop-types";

import { Modal } from "antd";

ModalUpdate.propTypes = {};

function ModalUpdate(props) {
  return (
    <Modal
      footer={false}
      closable={false}
      bodyStyle={{ padding: 0 }}
      width={425}
    >
      <div className="modal_header_action">
        <span>Chỉnh sửa thông tin</span>
      </div>
      <div className="modal_content">
        <form>
          <div className="flex items-center mb-2">
            <div className="LabelCo">Tên khách sạn:</div>
            <input type="text" style={{ width: 220 }} />
          </div>

          <div className="flex items-center mb-2">
            <div className="LabelCo">Địa chỉ:</div>
            <input type="text" style={{ width: 220 }} />
          </div>

          <div className="flex items-center mb-2">
            <div className="LabelCo">Tỉnh/Thành phố:</div>
            <input type="text" style={{ width: 220 }} />
          </div>

          <div className="flex items-center mb-2">
            <div className="LabelCo">Phone:</div>
            <input type="text" style={{ width: 220 }} />
          </div>

          <div className="flex items-center mb-2">
            <div className="LabelCo">Email:</div>
            <input type="text" style={{ width: 220 }} />
          </div>

          <div className="flex items-center mb-2">
            <div className="LabelCo">Website:</div>
            <input type="text" style={{ width: 220 }} />
          </div>

          <div className="flex items-center mb-2">
            <div className="LabelCo">CA khu vực:</div>
            <input type="text" style={{ width: 220 }} />
          </div>

          <div className="flex items-center mb-2">
            <div className="LabelCo">Ghi chú:</div>
            <TextArea style={{ width: 226 }} />
          </div>

          <div
            className="flex items-center justify-end"
            style={{ marginRight: 45 }}
          >
            <button
              className="submit_cancel_Building focus:outline-none"
              onClick={handleAddHotel}
            >
              Cancel
            </button>
            <button className="focus:outline-none">Thêm</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ModalUpdate;
