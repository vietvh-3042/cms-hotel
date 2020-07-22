import { getView } from "../actions/app";
import {
	ACTION_SEARCH,
	CLOSE_DRAWER_OPEN_SIDEBAR,
	COLLPSE_CHANGE,
	DRAWER_OPEN_SIDEBAR,
	SAVE_HOTEL_ID,
	TOGGLE_ALL,
	CHECK_FLAG_HOTEL,
} from "../actions/constants";

const initState = {
	collapsed: window.innerWidth > 1220 ? false : true,
	visibleSideBar: false,
	smooth: false,
	hotel_ID: "",
	flag: false,
	// height: window.innerHeight,
	view: getView(window.innerWidth),
};
export default function appReducer(state = initState, action) {
	switch (action.type) {
		case COLLPSE_CHANGE:
			return { ...state, collapsed: !state.collapsed };
		case TOGGLE_ALL:
			if (state.view !== action.view || action.height !== state.height) {
				// const height = action.height ? action.height : state.height;
				return {
					...state,
					collapsed: action.collapsed,
					view: action.view,
					// height
				};
			}
			break;

		case ACTION_SEARCH:
			return { ...state, smooth: !state.smooth };

		case DRAWER_OPEN_SIDEBAR:
			return { ...state, visibleSideBar: !state.visibleSideBar };

		case CLOSE_DRAWER_OPEN_SIDEBAR:
			return { ...state, visibleSideBar: !state.visibleSideBar };

		case SAVE_HOTEL_ID:
			return { ...state, hotel_ID: action.payload };

		case CHECK_FLAG_HOTEL:
			return { ...state, flag: !state.flag };

		default:
			return state;
	}
	return state;
}
