import {
  APP_SET_AUTH_STATE,
  APP_SAVE_LOGGED_USER,
  APP_REMOVE_LOGGED_USER,
  APP_SAVE_REFRESH_TOKEN,
} from "../actions/constants";

const init = {
  loggedIn: true,
  token: null,
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
