import Axios from "axios";
import { store } from "redux/store";
import { endpoint } from "settings";

function select(state) {
	return {
		token: state.Auth.user.meta.access_token,
		name: state.Auth.user.data.name,
		hotel_ID: state.App.hotel_ID,
	};
}

export default function CommonApi(method, path, body) {
	let data = select(store.getState());
	return Axios({
		method: method,
		url: `${endpoint}${path}`,
		data: body,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer" + data.token,
			"tenant-name": data.name,
			"hotel-id": data.hotel_ID,
		},
	});
}
