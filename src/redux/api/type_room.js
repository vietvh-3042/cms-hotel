import { API } from "./common";

export default {
	getListTypeRoom: (filter) => API.get(`/hotel-manager/type-room?${filter}`),
};
