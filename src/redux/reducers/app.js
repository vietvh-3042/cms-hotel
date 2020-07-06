import {
  COLLPSE_CHANGE,
  TOGGLE_ALL,
  ACTION_SEARCH,
  DRAWER_OPEN_SIDEBAR,
  CLOSE_DRAWER_OPEN_SIDEBAR
} from "../actions/constants";
import { getView } from "../actions/app";

const initState = {
  collapsed: window.innerWidth > 1220 ? false : true,
  visibleSideBar: false,
  smooth: false,
  // height: window.innerHeight,
  view: getView(window.innerWidth)
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
          view: action.view
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
    default:
      return state;
  }
  return state;
}
