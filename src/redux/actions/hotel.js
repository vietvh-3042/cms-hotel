import {
	GETLISTHOTEL,
	UPDATE_LIST_HOTEL,
	CREATE_LIST_HOTEL,
	DELETE_HOTEL,
} from "./constants";

export const getListHotel = (...args) => ({
	type: GETLISTHOTEL,
	args,
});

export const updateHotel = (...args) => ({
	type: UPDATE_LIST_HOTEL,
	args,
});

export const createHotel = (...args) => ({
	type: CREATE_LIST_HOTEL,
	args,
});

export const deleteHotel = (...args) => ({
	type: DELETE_HOTEL,
	args,
});
