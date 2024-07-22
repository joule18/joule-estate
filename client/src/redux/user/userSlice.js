import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInStart: (state) => {
      state.loading = true;
    },
    logInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    logInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { logInFailure, logInStart, logInSuccess } = userSlice.actions;
export default userSlice.reducer;
