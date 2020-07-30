import Axios from "axios";
import { endpoint } from "settings";
import { toast } from "react-toastify";

export default function CommonApi(path, method, body, token, name) {
	return Axios({
		method: method,
		url: `${endpoint}/${path}`,
		data: body,
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: "Bearer" + token,
			"tenant-name": name,
		},
	}).catch((err) => {
		console.log(err.response);
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
