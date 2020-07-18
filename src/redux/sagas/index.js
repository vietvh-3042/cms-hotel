import { fork, all } from "redux-saga/effects";
import auth from "./auth";
import hotel from "./hotel";
import hotel_floor from "./hotel_floor";
import type_room from "./type_room";

const rootSaga = function* () {
	yield all([
		...auth.map((watcher) => fork(watcher)),
		...hotel.map((watcher) => fork(watcher)),
		...hotel_floor.map((watcher) => fork(watcher)),
		...type_room.map((watcher) => fork(watcher)),
	]);
};
export default rootSaga;
