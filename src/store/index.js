// store.js
import { configureStore } from "@reduxjs/toolkit";
import bookingReducer from "./reducers/index";

const store = configureStore({
  reducer: {
    booking: bookingReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
