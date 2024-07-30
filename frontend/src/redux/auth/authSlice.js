import { createSlice } from "@reduxjs/toolkit";
import { signupUser, loginUser } from "./authApi";

const initialState = {
  user: null,
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        sessionStorage.setItem("token", action.payload.token);
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        sessionStorage.setItem("token", action.payload.token);
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
