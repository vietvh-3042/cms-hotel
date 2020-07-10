import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import TextArea from "antd/lib/input/TextArea";

ModalAddListRoom.propTypes = {};

function ModalAddListRoom(props) {
  const { visible, handleListRoom } = props;

  return (
    <Modal
      visible={visible}
      onCancel={handleListRoom}
      footer={false}
      closable={false}
      bodyStyle={{ padding: 0 }}
      width={1001}
    >
      <div className="modal_header_action">
        <span>Thêm loại phòng</span>
      </div>
      <div className="modal_content">
        <form>
          <div className="flex">
            <div className="w-4/12">
              <div className="flex items-center mb-2">
                <div className="LabelCo">Loại phòng:</div>
                <input type="text" style={{ width: 150 }} />
              </div>

              <div className="flex items-center mb-2">
                <div className="LabelCo">Số giường:</div>
                <input type="text" style={{ width: 150 }} />
              </div>

              <div className="flex items-center mb-2">
                <div className="LabelCo">Số người:</div>
                <input type="text" style={{ width: 150 }} />
              </div>

              <div className="flex items-center mb-2">
                <div className="LabelCo">Giá theo ngày:</div>
                <input type="text" style={{ width: 150 }} />
              </div>

              <div className="flex items-center mb-2">
                <div className="LabelCo">Giá qua đêm:</div>
                <input type="text" style={{ width: 150 }} />
              </div>

              <div className="flex items-center mb-2">
                <div className="LabelCo">Giá theo tháng:</div>
                <input type="text" style={{ width: 150 }} />
              </div>

              <div className="groupHour mb-2">
                Giá bán theo Giờ - Click để thêm
              </div>

              <div className="flex justify-center items-center mb-2">
                <span className="mr-2">Giá</span>
                <select defaultValue="1" style={{ width: 50 }}>
                  <option value="1">1h</option>
                  <option value="1">2h</option>
                  <option value="1">3h</option>
                  <option value="1">4h</option>
                </select>
                <span className="mx-1">:</span>
                <input
                  type="text"
                  className="focus:outline-none"
                  style={{ width: 135 }}
                />
              </div>

              <div className="flex justify-center items-center mb-2">
                <span className="mr-2">Quá</span>
                <select defaultValue="1" style={{ width: 50 }}>
                  <option value="1">1h</option>
                  <option value="1">2h</option>
                  <option value="1">3h</option>
                  <option value="1">4h</option>
                </select>
                <span className="mx-1">:</span>
                <input
                  type="text"
                  className="focus:outline-none"
                  style={{ width: 135 }}
                />
              </div>

              <div className="flex justify-center items-center mb-2">
                <span className="mr-2">Quá</span>
                <select defaultValue="1" style={{ width: 50 }}>
                  <option value="1">1h</option>
                  <option value="1">2h</option>
                  <option value="1">3h</option>
                  <option value="1">4h</option>
                </select>
                <span className="mx-1">:</span>
                <input
                  type="text"
                  className="focus:outline-none"
                  style={{ width: 135 }}
                />
              </div>

              <div className="flex items-center mb-2">
                <div className="LabelCo">Ghi chú:</div>
                <TextArea style={{ width: 182 }} />
              </div>
            </div>

            <div className="w-4/12 ml-3">
              <fieldset
                className="mb-3"
                style={{ border: "1px solid #d0d0d0" }}
              >
                <legend className="groupHour w-280 mx-auto">
                  <span>Phụ trội quá giờ Checkout (Theo ngày)</span>
                </legend>
                <div className="flex justify-center items-center mb-2">
                  <span className="mr-2">Quá</span>
                  <select defaultValue="1" style={{ width: 50 }}>
                    <option value="1">1h</option>
                    <option value="1">2h</option>
                    <option value="1">3h</option>
                    <option value="1">4h</option>
                  </select>
                  <span className="mx-1">:</span>
                  <input
                    type="text"
                    className="focus:outline-none"
                    style={{ width: 150 }}
                  />
                </div>
                <div className="flex justify-center items-center mb-2">
                  <span className="mr-2">Quá</span>
                  <select defaultValue="1" style={{ width: 50 }}>
                    <option value="1">1h</option>
                    <option value="1">2h</option>
                    <option value="1">3h</option>
                    <option value="1">4h</option>
                  </select>
                  <span className="mx-1">:</span>
                  <input
                    type="text"
                    className="focus:outline-none"
                    style={{ width: 150 }}
                  />
                </div>
              </fieldset>

              <fieldset style={{ border: "1px solid #d0d0d0" }}>
                <legend className="groupHour w-280 mx-auto">
                  <span>Phụ trội quá giờ Checkout (Qua đêm)</span>
                </legend>
                <div className="flex justify-center items-center mb-2">
                  <span className="mr-2">Quá</span>
                  <select defaultValue="1" style={{ width: 50 }}>
                    <option value="1">1h</option>
                    <option value="1">2h</option>
                    <option value="1">3h</option>
                    <option value="1">4h</option>
                  </select>
                  <span className="mx-1">:</span>
                  <input
                    type="text"
                    className="focus:outline-none"
                    style={{ width: 150 }}
                  />
                </div>
              </fieldset>
            </div>

            <div className="w-4/12 ml-3">
              <fieldset
                className="mb-3"
                style={{ border: "1px solid #d0d0d0" }}
              >
                <legend className="groupHour w-280 mx-auto">
                  <span>Phụ trội Checkin sớm (Theo ngày)</span>
                </legend>
                <div className="flex justify-center items-center mb-2">
                  <span className="mr-2">Trước</span>
                  <select defaultValue="1" style={{ width: 50 }}>
                    <option value="1">1h</option>
                    <option value="1">2h</option>
                    <option value="1">3h</option>
                    <option value="1">4h</option>
                  </select>
                  <span className="mx-1">:</span>
                  <input
                    type="text"
                    className="focus:outline-none"
                    style={{ width: 150 }}
                  />
                </div>
              </fieldset>

              <fieldset
                className="mb-3"
                style={{ border: "1px solid #d0d0d0" }}
              >
                <legend className="groupHour w-280 mx-auto">
                  <span>Phụ trội Checkin sớm (Qua đêm)</span>
                </legend>
                <div className="flex justify-center items-center mb-2">
                  <span className="mr-2">Trước</span>
                  <select defaultValue="1" style={{ width: 50 }}>
                    <option value="1">1h</option>
                    <option value="1">2h</option>
                    <option value="1">3h</option>
                    <option value="1">4h</option>
                  </select>
                  <span className="mx-1">:</span>
                  <input
                    type="text"
                    className="focus:outline-none"
                    style={{ width: 150 }}
                  />
                </div>
              </fieldset>

              <fieldset style={{ border: "1px solid #d0d0d0" }}>
                <legend className="groupHour w-280 mx-auto">
                  <span>Phụ trội thêm khách - Extra Bed</span>
                </legend>
                <div className="flex items-center mb-2">
                  <div className="LabelCo">Tiếp mỗi người:</div>
                  <input type="text" style={{ width: 150 }} />
                </div>
              </fieldset>
            </div>
          </div>
          <div
            className="flex items-center justify-end"
            style={{ marginRight: 45 }}
          >
            <button
              className="submit_cancel_Building focus:outline-none"
              onClick={handleListRoom}
            >
              Thoát
            </button>
            <button className="focus:outline-none">Thêm</button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ModalAddListRoom;
