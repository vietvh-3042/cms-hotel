import {
  MARK_REQUEST_PENDING,
  MARK_REQUEST_SUCCESS,
  MARK_REQUEST_FAILURE,
  MARK_REQUEST_CANCELLED,
  MODAL_OPEN,
  MODAL_CLOSE,
  DRAWER_OPEN,
  DRAWER_CLOSE
  // SAVE_IMG_WITH_ID
} from "../actions/constants";

export const request = (state = {}, { type, payload, meta }) => {
  switch (type) {
    case MARK_REQUEST_PENDING:
      return { ...state, [meta.key]: { status: "pending", error: null } };
    case MARK_REQUEST_SUCCESS:
      return { ...state, [meta.key]: { status: "success", error: null } };
    case MARK_REQUEST_FAILURE:
      return { ...state, [meta.key]: { status: "failure", error: payload } };
    case MARK_REQUEST_CANCELLED:
      return {
        ...state
      };
    case MODAL_OPEN:
      return {
        ...state,
        modalState: true
      };
    case MODAL_CLOSE:
      return {
        ...state,
        modalState: false
      };
    case DRAWER_OPEN:
      return {
        ...state,
        visible: true
      };
    case DRAWER_CLOSE:
      return {
        ...state,
        visible: false
      };
    default:
      return state;
  }
};
