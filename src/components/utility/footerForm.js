import React from "react";
import PropTypes from "prop-types";

FooterForm.propTypes = {
	handleClick: PropTypes.func,
};

FooterForm.defaultProps = {
	handleClick: null,
};

function FooterForm(props) {
	const { handleClick, update } = props;
	return (
		<div className="flex items-center justify-end" style={{ marginRight: 45 }}>
			<button
				type="button"
				className="submit_cancel_Building focus:outline-none"
				onClick={handleClick}
			>
				Cancel
			</button>
			<button type="submit" className="dashboardButton focus:outline-none">
				{update ? "Cập nhật" : "Thêm"}
			</button>
		</div>
	);
}

export default FooterForm;
