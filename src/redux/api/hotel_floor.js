import { API } from "./common";

export default {
	getListHotelFloor: (filter) => API.get(`/hotel-manager/floor?${filter}`),

	hideHotelFloor: (formData) =>
		API.post("/hotel-manager/hiden-floor", formData),

	updateHotelFloor: (id, formData) =>
		API.put(`/hotel-manager/floor/${id}`, formData),

	createHotelFloor: (formData) => API.post("/hotel-manager/floor", formData),

	// deleteHotel: (id) => API.delete(`hotel-manager/hotel/${id}`),
};
