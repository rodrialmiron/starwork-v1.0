import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    auth: {
      access: false,
    },
    isVerified: false,
    isRegistered: false,
    userProfile: {},
    successAlerts:"",
    errorAlerts:""
  },
  reducers: {
    setRegistration: (state, action) => {
      state.isRegistered = action.payload;
    },
    setVerification: (state, action) => {
      state.isVerified = action.payload;
    },
    getRole: (state, action) => {
      state.role = action.payload;
    },
    saveToken: (state, action) => {
      state.auth.token = action.payload;
    },
    setAccess: (state, action) => {
      state.auth.access = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload
    },
    setSucessAlerts: (state, action) =>{
      state.successAlerts = action.payload
    },
    setErrorAlerts: (state, action) =>{
      state.errorAlerts = action.payload
    }
  },
});

export const {
  setRegistration,
  setVerification,
  saveToken,
  getRole,
  setAccess,
  setUserProfile,
  setSucessAlerts,
  setErrorAlerts
} = userSlice.actions;
export default userSlice.reducer;