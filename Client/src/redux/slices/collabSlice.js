import { createSlice } from "@reduxjs/toolkit";

export const collabSlice = createSlice({
  name: "collabs",
  initialState: {
    courses: [],
  },
  reducers: {
    getAllCourses: (state, action) => {
      state.courses = action.payload;
    },
    searchcourse: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { getAllCourses, searchcourse } = collabSlice.actions;
export default collabSlice.reducer;
