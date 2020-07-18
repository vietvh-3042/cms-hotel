import { SAVE_LIST_HOTEL } from "../actions/constants";

const init = {
	listHotel: [],
	pagination: {},
};

export default (state = init, { type, payload }) => {
	switch (type) {
		case SAVE_LIST_HOTEL:
			return {
				...state,
				listHotel: payload.data,
				pagination: payload.meta.pagination,
			};
		default:
			return state;
	}
};
