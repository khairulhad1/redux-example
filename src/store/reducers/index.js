// bookingSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    checkoutBooking: (state, action) => {
      return { ...action.payload };
    },
  },
});

export const { checkoutBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
