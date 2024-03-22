import { configureStore } from "@reduxjs/toolkit";
import ChangeColorSlice from "../Action/ColorChange";
import lqapprovestatus from "../Action/lqapprovestatus";
export const store = configureStore({
  reducer: {
    // ChangeColorSlice: ChangeColorSlice,
    lqapprovestatus: lqapprovestatus,
  },
});
