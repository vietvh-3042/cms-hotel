import { SAVE_PAYMENT_METHOD } from "../actions/constants";

const init = {
	listMethod: [],
};

export default (state = init, { type, payload }) => {
	switch (type) {
		case SAVE_PAYMENT_METHOD: {
			return {
				...state,
				listMethod: payload,
			};
		}
		default:
			return state;
	}
};
