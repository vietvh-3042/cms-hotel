import React from "react";
import Header from "./Home/Header";

HomePageLayout.propTypes = {};

function HomePageLayout(props) {
	return (
		<React.Fragment>
			<Header />
			{props.children}
		</React.Fragment>
	);
}

export default HomePageLayout;
