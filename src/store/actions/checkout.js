import { CHECKOUT_BOOKING } from "../types";

export const checkoutBooking = (payload) => (dishpatch) => {
  dishpatch({
    type: CHECKOUT_BOOKING,
    payload: payload,
  });
};
