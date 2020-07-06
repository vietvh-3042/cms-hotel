import { call, put, race, delay, take } from "redux-saga/effects";
import {
  markRequestPending,
  markRequestSuccess,
  markRequestFailure,
  markRequestCancelled,
  invokeCallback
} from "../actions/common";
import { API_TIMEOUT } from "../constants/api";
import { setAuthState, removeLoggedUser } from "../actions/auth";
export const rejectErrors = res => {
  const { data } = res.data;
  if (!data) {
    return Promise.reject({
      message: res.data.message
    });
  }
};

export const createRequestSaga = ({
  request,
  key,
  success,
  failure,
  functionSuccess,
  functionFailure,
  timeout = API_TIMEOUT,
  cancel,
  cancelled
}) =>
  function*(action) {
    let args = action.args || [];
    console.log(args)
    // Kiểm tra xem có callback function ở action hay không
    const callback =
      typeof args[args.length - 1] === "function"
        ? args[args.length - 1]
        : null;
    if (callback) {
      args = args.slice(0, -1);
    }
    let ret = null;
    let err = null;
    // Kiểm tra xem request có phải là function hay không
    const requestKey = typeof key === "function" ? key(...args) : key;
    // put vào action pending để chờ dữ liệu
    yield put(markRequestPending(requestKey));
    // bắt đầu gọi dữ liệu tử server về
    try {
      if (!request) {
        throw new Error("Không tìm thấy API");
      }
      // yield call nhận vào 2 tham số, tham số thứ 2 là 1 mảng dữ liệu
      const invokeRequest = async () => {
        const chainRequest = request.apply(request, args);
        const response = await chainRequest;
        console.log(response);
        if (response.data.code >= 200 && response.data.code < 300)
          return response.data;
        else return rejectErrors(response);
      };
      const raceOptions = {
        data: call(invokeRequest),
        isTimeout: delay(timeout)
      };
      if (cancel) {
        raceOptions.cancelRet = take(cancel);
      }
      const { data, isTimeout, cancelRet } = yield race(raceOptions);
      console.log(data);
      if (isTimeout) {
        throw new Error(`Api method is timeout after ${timeout} ms!!!`);
      } else if (cancelRet) {
        // callback on success
        if (cancelled) {
          for (const actionCreator of cancelled) {
            yield put(actionCreator(cancelRet, action));
          }
        }
        // mark cancelled request
        yield put(markRequestCancelled(cancelRet, requestKey));
      } else {
        if (success) {
          for (const actionCreator of success) {
            yield put(actionCreator(data.data, action));
          }
        }
        if (functionSuccess) {
          for (const actionCreator of functionSuccess) {
            actionCreator(data);
          }
        }
        yield put(markRequestSuccess(requestKey));
        ret = data;
      }
    } catch (reason) {
      if (reason.code === 401) {
        yield put(removeLoggedUser());
        yield put(setAuthState(false));
      }
      if (failure) {
        for (const actionCreator of failure) {
          yield put(actionCreator(reason, action));
        }
      }

      if (functionFailure) {
        for (const actionCreator of functionFailure) {
          actionCreator(reason);
        }
      }
      yield put(markRequestFailure(requestKey, reason));
      err = reason;
    } finally {
      if (callback) {
        // gọi lại callback và chuyển vào action invokeCallback trong action này hàm
        // callback được gọi và thực thi
        // ret chứa dữ liệu nếu gọi API thành công và truyền ngược lại cho
        // hàm gọi action đó
        yield put(invokeCallback(callback, err, ret));
      }
    }
  };
