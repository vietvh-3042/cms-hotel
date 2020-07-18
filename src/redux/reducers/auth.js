import {
	APP_SET_AUTH_STATE,
	APP_SAVE_LOGGED_USER,
	APP_REMOVE_LOGGED_USER,
	APP_SAVE_REFRESH_TOKEN,
} from "../actions/constants";

const init = {
	loggedIn: true,
	token:
		"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9uZy50ZWNobGFiLnZuL3RlbmFudC1hdXRoL2xvZ2luIiwiaWF0IjoxNTk0NzE4OTIxLCJleHAiOjE1OTUwNzg5MjEsIm5iZiI6MTU5NDcxODkyMSwianRpIjoibFA1NHF2M01tN0daUk9PdSIsInN1YiI6MSwicHJ2IjoiYTgyNmVlMjliY2M3YmZiYTY5MTk4MDBjMGYxM2MzZDgxMWQzMmRkMSJ9.MRnVf2VVDL3b2b-xb1YZIF2g-ZaFTtUr7Jn_kilqeIg",
	refreshToken: null,
	user: {},
	idUser: "",
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
				user: payload.name,
				token: payload.accessToken,
				idUser: payload._id,
			};
		case APP_SAVE_REFRESH_TOKEN:
			return {
				...state,
				token: { ...state.token, ...payload },
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
