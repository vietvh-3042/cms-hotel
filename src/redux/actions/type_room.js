import { GET_LIST_TYPE_ROOM } from "./constants";

export const getListTypeRoom = (...args) => ({
	type: GET_LIST_TYPE_ROOM,
	args,
});
