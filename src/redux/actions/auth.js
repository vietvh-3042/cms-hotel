import {
  APP_LOGIN,
  APP_LOGOUT,
  APP_VERIFY_TOKEN,
  APP_SET_AUTH_STATE,
  APP_SAVE_REFRESH_TOKEN,
  APP_REMOVE_LOGGED_USER,
  APP_SAVE_LOGGED_USER
} from "./constants";
// định nghĩa các giá trị đc truyền vào action login
export const login = (...args) => ({ type: APP_LOGIN, args });
export const logout = (...args) => ({ type: APP_LOGOUT, args });
export const verifyToken = (...args) => ({ type: APP_VERIFY_TOKEN, args });


export const setAuthState = newAuthState => ({
  type: APP_SET_AUTH_STATE,
  payload: newAuthState
});
export const saveLoggedUser = data => ({
  type: APP_SAVE_LOGGED_USER,
  payload: data
});
// data: access token
export const saveRefreshToken = data => ({
  type: APP_SAVE_REFRESH_TOKEN,
  payload: data
});

export const removeLoggedUser = () => ({
  type: APP_REMOVE_LOGGED_USER
});
