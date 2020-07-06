import { takeLatest, all, put } from "redux-saga/effects";
import { APP_LOGIN, APP_LOGOUT, APP_VERIFY_TOKEN } from "../actions/constants";

import auth from "../api/auth";

import {
  setAuthState,
  saveLoggedUser,
  removeLoggedUser,
} from "../actions/auth";
import { createRequestSaga } from "./common";
import { message } from "antd";

const requestLogin = createRequestSaga({
  request: auth.login,
  key: "login",
  cancel: APP_LOGOUT,
  success: [(res) => saveLoggedUser(res), () => setAuthState(true)],
  failure: [],
  functionFailure: [(res) => message.error(res.message)],
});

const requestVerifyToken = function* () {};

const requestLogout = function* () {
  yield all([yield put(removeLoggedUser()), yield put(setAuthState(false))]);
};

export default [
  function* fetchWatcher() {
    // khi ấn vào đăng nhập saga bắt sự kiện vào đây
    yield all([
      takeLatest(APP_LOGIN, requestLogin),
      takeLatest(APP_VERIFY_TOKEN, requestVerifyToken),
      takeLatest(APP_LOGOUT, requestLogout),
    ]);
  },
];
