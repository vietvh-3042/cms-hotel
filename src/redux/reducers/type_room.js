import { SAVE_LIST_TYPE_ROOM } from "../actions/constants";

const init = {
	listTypeRoom: [],
	pagination: {},
};

export default (state = init, { type, payload }) => {
	switch (type) {
		case SAVE_LIST_TYPE_ROOM:
			return {
				...state,
				listTypeRoom: payload.data,
				pagination: payload.meta.pagination,
			};
		default:
			return state;
	}
};
