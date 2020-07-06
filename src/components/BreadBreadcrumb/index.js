import React, { Component } from "react";

export default class index extends Component {
  render() {
    return (
      <div className="grid-content" style={{ background: "#fff" }}>
        {/* <Breadcrumb second={second} /> */}
        <div className="page-header-heading">
          <span className="page-header-heading-title">
            {this.props.title}
          </span>
        </div>
      </div>
    );
  }
}
