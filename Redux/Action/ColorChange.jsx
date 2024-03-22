import { createSlice } from "@reduxjs/toolkit";
//อธิบาย สร้าง slice ของ redux โดยใช้ createSlice จาก redux toolkit

const ChangeColorSlice = createSlice({
  name: "ChangeColorSlice", // ชื่อของ slice
  initialState: { color: "red" }, // ค่าเริ่มต้น
  reducers: {
    // สร้าง action ของ slice
    setColor: (state, action) => {
      state.color = action.payload;
    },
    //other
  },
});

export const { setColor } = ChangeColorSlice.actions;

export default ChangeColorSlice.reducer;
