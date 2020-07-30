import Axios from "axios";
import { endpoint } from "settings";

APICommon.propTypes = {};

APICommon.defaultProps = {
	option: null,
};

export default function APICommon(props) {
	const { method, path, option, name, hotel_ID, access_token } = props;
	Axios({
		method: method,
		url: option ? endpoint + path + option : endpoint + path,
		data: {},
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer" + access_token,
			"tenant-name": name,
			"hotel-id": hotel_ID,
		},
	})
		.then((res) => {})
		.catch((err) => {
			console.log(err.response);
		});
}
