import { createSlice } from "@reduxjs/toolkit";
import { fetchUserEvents } from "./userApi";

const initialState = {
  user: null,
  role: null,
  status: "idle",
  error: null,
  createdEvents: [],
  registeredEvents: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    checkUser: (state, action) => {
      const userData = sessionStorage.getItem("user");
      if (userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          state.user = parsedUserData;
          state.role = parsedUserData.role;
          state.status = "succeeded";
          state.error = null;
        } catch (error) {
          console.error("Failed to parse user data:", error);
          state.status = "failed";
          state.error = "Failed to parse user data";
        }
      } else {
        state.user = null;
        state.role = null;
        state.status = "failed";
        state.error = action.payload || "User not found";
      }
    },
    clearUser: (state) => {
      state.user = null;
      state.role = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (action.payload.createdEvents) {
          state.createdEvents = action.payload.createdEvents;
        }
        if (action.payload.registeredEvents) {
          state.registeredEvents = action.payload.registeredEvents;
        }
      })
      .addCase(fetchUserEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { checkUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
