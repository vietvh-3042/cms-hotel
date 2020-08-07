import React from "react";
import { Link } from "react-router-dom";
import { siteConfig } from "../../settings";

Logo.propTypes = {};

function Logo(props) {
	const { collapsed } = props;
	return (
		<div className="isoLogoWrapper">
			<Link to="/dashboard">
				<div className="isIconHeader">
					<img className="logo" src={siteConfig.siteIcon} alt="logo" />
					{collapsed ? null : <h3>{siteConfig.siteName}</h3>}
				</div>
			</Link>
		</div>
	);
}

export default Logo;
