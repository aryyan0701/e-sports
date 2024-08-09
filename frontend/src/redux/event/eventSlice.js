import { createSlice } from '@reduxjs/toolkit';
import { createEvent, getEvents, regiForEvent } from './eventApi';

const initialState = {
  events: [],
  status: 'idle',
  error: null,
  message: ''
};

const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    clearMessage: (state) => {
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = 'Event created successfully!';
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(getEvents.pending, (state) => {
        state.status = 'getEvent loading';
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      })
      .addCase(regiForEvent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(regiForEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = 'Registration successful!';
      })
      .addCase(regiForEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  }
});

export const { clearMessage } = eventSlice.actions;

export default eventSlice.reducer;
