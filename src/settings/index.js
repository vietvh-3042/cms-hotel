import logo from "../image/logo.svg";
const siteConfig = {
	siteName: "Manager Hotel",
	siteIcon: logo,
	footerText: "SKYHOTEL ©2020 Created",
};
// thêm mới icon
const siteIcon = "//at.alicdn.com/t/font_1573023_20zr6xcg554.js";

const endpoint = "http://192.168.1.31:8200";

const API_Timeout = 15000;

export { siteConfig, siteIcon, endpoint, API_Timeout };
