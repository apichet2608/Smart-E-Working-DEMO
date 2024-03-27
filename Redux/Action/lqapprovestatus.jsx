import { createSlice } from "@reduxjs/toolkit";
//อธิบาย สร้าง slice ของ redux โดยใช้ createSlice จาก redux toolkit

const lqapprovestatus = createSlice({
  name: "lqapprovestatus", // ชื่อของ slice
  initialState: { ewk_item_seq: 6, statusseq: "P" }, // ค่าเริ่มต้น
  reducers: {
    // สร้าง action ของ slice
    setstatuslq: (state, action) => {
      state = action.payload;
      return state;
    },
    //other
  },
});

export const { setstatuslq } = lqapprovestatus.actions;

export default lqapprovestatus.reducer;
