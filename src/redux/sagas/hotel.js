import { takeLatest, all } from "redux-saga/effects";
import hotel from "../api/hotel";

import {
	GETLISTHOTEL,
	SAVE_LIST_HOTEL,
	UPDATE_LIST_HOTEL,
	CREATE_LIST_HOTEL,
	DELETE_HOTEL,
} from "../actions/constants";

import { createRequestSaga } from "./common";
import { message } from "antd";
import { toast } from "react-toastify";

const getListHotel = createRequestSaga({
	request: hotel.getListHotel,
	key: "getListHotel",
	failure: [],
	success: [
		(res) => ({
			type: SAVE_LIST_HOTEL,
			payload: res,
		}),
	],
	functionFailure: [(res) => message.error(res.message)],
});

const updateHotel = createRequestSaga({
	request: hotel.updateHotel,
	key: "updateHotel",
	failure: [],
});

const createHotel = createRequestSaga({
	request: hotel.createHotel,
	key: "createHotel",
	failure: [],
});

const deleteHotel = createRequestSaga({
	request: hotel.deleteHotel,
	key: "deleteHotel",
	failure: [],
});

export default [
	function* fetchWatcher() {
		yield all([
			takeLatest(GETLISTHOTEL, getListHotel),
			takeLatest(UPDATE_LIST_HOTEL, updateHotel),
			takeLatest(CREATE_LIST_HOTEL, createHotel),
			takeLatest(DELETE_HOTEL, deleteHotel),
		]);
	},
];
