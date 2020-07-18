import { SAVE_LIST_HOTEL_FLOOR } from "../actions/constants";

const init = {
	listHotelFloor: [],
	pagination: {},
};

export default (state = init, { type, payload }) => {
	switch (type) {
		case SAVE_LIST_HOTEL_FLOOR:
			return {
				...state,
				listHotelFloor: payload.data,
				pagination: payload.meta.pagination,
			};
		default:
			return state;
	}
};
