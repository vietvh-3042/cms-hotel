import { SAVE_PAYMENT_METHOD } from "./constants";

export const checkFlagHotel = (payment) => ({
	type: SAVE_PAYMENT_METHOD,
	payload: payment,
});
