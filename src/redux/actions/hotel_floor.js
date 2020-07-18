import {
	GET_LIST_HOTEL_FLOOR,
	UPDATE_HOTEL_FLOOR,
	CREATE_HOTEL_FLOOR,
	HIDE_HOTEL_FLOOR,
} from "./constants";

export const getListHotelFloor = (...args) => ({
	type: GET_LIST_HOTEL_FLOOR,
	args,
});

export const updateHotelFloor = (...args) => ({
	type: UPDATE_HOTEL_FLOOR,
	args,
});

export const createHotelFloor = (...args) => ({
	type: CREATE_HOTEL_FLOOR,
	args,
});

export const hideHotelFloor = (...args) => ({
	type: HIDE_HOTEL_FLOOR,
	args,
});
