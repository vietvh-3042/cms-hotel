import React from "react";
import SectionBanner from "./components/SectionBanner";
import SectionFeedback from "./components/SectionFeedback";
import SectionHighlights from "./components/SectionHighlights";
import SectionMaamul from "./components/SectionMaamul";
import SectionNew from "./components/SectionNew";
import SectionRefer from "./components/SectionRefer";
import HomePageLayout from "layouts/HomePageLayout";

Home.propTypes = {};

function Home(props) {
	return (
		<HomePageLayout>
			<main className="relative overflow-hidden">
				<SectionBanner></SectionBanner>
				<SectionMaamul></SectionMaamul>
				<SectionHighlights></SectionHighlights>
				<SectionRefer></SectionRefer>
				<SectionFeedback></SectionFeedback>
				<SectionNew></SectionNew>
			</main>
		</HomePageLayout>
	);
}

export default Home;
