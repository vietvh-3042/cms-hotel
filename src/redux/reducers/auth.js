import {
	APP_SET_AUTH_STATE,
	APP_SAVE_LOGGED_USER,
	APP_REMOVE_LOGGED_USER,
	APP_SAVE_REFRESH_TOKEN,
} from "../actions/constants";

const init = {
	loggedIn: true, /// finish false
	refreshToken: null,
	user: {
		data: { name: "vuhongviet" }, // init state
		meta: { access_token: "" }, /// init state
	},
};

export default (state = init, { type, payload }) => {
	switch (type) {
		case APP_SET_AUTH_STATE:
			return {
				...state,
				loggedIn: payload || false,
			};
		case APP_SAVE_LOGGED_USER:
			return {
				...state,
				user: payload,
			};
		case APP_SAVE_REFRESH_TOKEN:
			return {
				...state,
			};
		case APP_REMOVE_LOGGED_USER:
			return {
				...state,
				...init,
			};
		default:
			return state;
	}
};
