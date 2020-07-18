import axios from "axios";
import { API_TIMEOUT } from "../constants/api";
import configs from "../constants/configs";
import _ from "lodash";

const endpoint = configs.endPoint;

let token =
	"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9uZy50ZWNobGFiLnZuL3RlbmFudC1hdXRoL2xvZ2luIiwiaWF0IjoxNTk0NzE4OTIxLCJleHAiOjE1OTUwNzg5MjEsIm5iZiI6MTU5NDcxODkyMSwianRpIjoibFA1NHF2M01tN0daUk9PdSIsInN1YiI6MSwicHJ2IjoiYTgyNmVlMjliY2M3YmZiYTY5MTk4MDBjMGYxM2MzZDgxMWQzMmRkMSJ9.MRnVf2VVDL3b2b-xb1YZIF2g-ZaFTtUr7Jn_kilqeIg";

let agent = {};
if (process.server) {
	let https = require("https");
	agent = new https.Agent({
		rejectUnauthorized: false,
	});
}
const API = axios.create({
	baseURL: endpoint,
	timeout: API_TIMEOUT,
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
		Authorization: "Bearer" + token,
		"tenant-name": "long98",
		"hotel-id": "69",
		responseType: "json",
		httpsAgent: agent,
	},
});

const convertObjectToQuery = (object) => {
	console.log(!_.isEmpty(object));
	if (!_.isEmpty(object)) {
		return Object.keys(object)
			.map((key) => {
				if (object[key][0]) {
					return key + "=" + object[key][0];
				}
			})
			.join("&");
	}
};

export { API, endpoint, convertObjectToQuery };
