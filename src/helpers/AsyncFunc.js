import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import React, { Component } from "react";
import ReactPlaceholder from "react-placeholder";
import "react-placeholder/lib/reactPlaceholder.css";
import BasicLayout from "layouts/BasicLayout";

class AsyncFunc extends Component {
	constructor(props) {
		super(props);
		this.state = {
			component: null,
		};
	}

	// trước khi component được render thì sẽ chạy componentWillMount trước
	componentWillMount() {
		Nprogress.start();
	}
	// componentDidMount chạy khi component đã render xong
	componentDidMount() {
		Nprogress.done();
	}

	// lần tiếp theo chạy sẽ không chạy vào mount nữa mà nó sẽ chạy vào updateting
	shouldComponentUpdate() {
		Nprogress.start();
		return true;
	}
	componentDidUpdate() {
		Nprogress.done();
	}
	render() {
		const { children } = this.props;
		return (
			<ReactPlaceholder type="text" rows={7} ready={Component !== null}>
				<BasicLayout>{children}</BasicLayout>
			</ReactPlaceholder>
		);
	}
}

export default AsyncFunc;
