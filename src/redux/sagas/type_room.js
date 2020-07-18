import { all, takeLatest } from "redux-saga/effects";
import { GET_LIST_TYPE_ROOM, SAVE_LIST_TYPE_ROOM } from "../actions/constants";
import type_room from "../api/type_room";
import { createRequestSaga } from "./common";

const getListTypeRoom = createRequestSaga({
	request: type_room.getListTypeRoom,
	key: "getListTypeRoom",
	failure: [],
	success: [
		(res) => ({
			type: SAVE_LIST_TYPE_ROOM,
			payload: res,
		}),
	],
});

export default [
	function* fetchWatcher() {
		yield all([
			takeLatest(GET_LIST_TYPE_ROOM, getListTypeRoom),
			// takeLatest(HIDE_HOTEL_FLOOR, hideHotelFloor),
			// takeLatest(UPDATE_HOTEL_FLOOR, updateHotelFloor),
			// takeLatest(CREATE_HOTEL_FLOOR, createHotelFloor),
		]);
	},
];
