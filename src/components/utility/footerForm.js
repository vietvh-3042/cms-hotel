import React from "react";
import PropTypes from "prop-types";

FooterForm.propTypes = {
	handleClick: PropTypes.func,
	title: PropTypes.string,
	className: PropTypes.string,
};

FooterForm.defaultProps = {
	handleClick: null,
	title: "",
	className: null,
};

function FooterForm(props) {
	const { handleClick, title, className } = props;
	return (
		<div
			className={`flex items-center justify-end ${
				className ? className : "mr-12"
			}`}
		>
			<button
				type="button"
				className="submit_cancel_Building focus:outline-none"
				onClick={handleClick}
			>
				Cancel
			</button>
			<button type="submit" className="dashboardButton focus:outline-none">
				{title ? title : "Thêm"}
			</button>
		</div>
	);
}

export default FooterForm;
