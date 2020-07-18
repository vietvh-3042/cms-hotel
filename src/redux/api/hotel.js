import { API } from "./common";

export default {
	getListHotel: (filter) => API.get(`/hotel-manager/hotel?${filter}`),

	updateHotel: (id, formData) =>
		API.put(`/hotel-manager/hotel/${id}`, formData),

	createHotel: (formData) => API.post(`/hotel-manager/hotel`, formData),

	deleteHotel: (id) => API.delete(`/hotel-manager/hotel/${id}`),
};
