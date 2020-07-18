import { all, takeLatest } from "redux-saga/effects";
import {
	GET_LIST_HOTEL_FLOOR,
	HIDE_HOTEL_FLOOR,
	SAVE_LIST_HOTEL_FLOOR,
	UPDATE_HOTEL_FLOOR,
	CREATE_HOTEL_FLOOR,
} from "../actions/constants";
import hotel_floor from "../api/hotel_floor";
import { createRequestSaga } from "./common";

const getListHotelFloor = createRequestSaga({
	request: hotel_floor.getListHotelFloor,
	key: "getListHotelFloor",
	failure: [],
	success: [
		(res) => ({
			type: SAVE_LIST_HOTEL_FLOOR,
			payload: res,
		}),
	],
});

const hideHotelFloor = createRequestSaga({
	request: hotel_floor.hideHotelFloor,
	key: "hideHotelFloor",
	failure: [],
});

const updateHotelFloor = createRequestSaga({
	request: hotel_floor.updateHotelFloor,
	key: "updateHotelFloor",
	failure: [],
});

const createHotelFloor = createRequestSaga({
	request: hotel_floor.createHotelFloor,
	key: "createHotelFloor",
	failure: [],
});

export default [
	function* fetchWatcher() {
		yield all([
			takeLatest(GET_LIST_HOTEL_FLOOR, getListHotelFloor),
			takeLatest(HIDE_HOTEL_FLOOR, hideHotelFloor),
			takeLatest(UPDATE_HOTEL_FLOOR, updateHotelFloor),
			takeLatest(CREATE_HOTEL_FLOOR, createHotelFloor),
		]);
	},
];
