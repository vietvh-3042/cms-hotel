import Axios from "axios";
import React from "react";
import { toast } from "react-toastify";
import { endpoint } from "settings";
import { store } from "redux/store";

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
		url: `${endpoint}/${path}`,
		data: body,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer" + data.token,
			"tenant-name": data.name,
			"hotel-id": data.hotel_ID,
		},
	}).catch((err) => {
		if (err.response.data.message) toast.error(err.response.data.message);
		else {
			let error = [];
			for (let value of Object.values(err.response.data.errors)) {
				error.push(value);
			}
			toast.error(
				<React.Fragment>
					{error.map((value, key) => (
						<div key={key}>{value}</div>
					))}
				</React.Fragment>
			);
		}
	});
}
