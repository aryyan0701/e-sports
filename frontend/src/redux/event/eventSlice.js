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
        state.message = '';
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = action.payload.message; 
        state.events.push(action.payload.event);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message || 'Failed to create event';
      })
      .addCase(getEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.events = action.payload;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to load events';
      })
      .addCase(regiForEvent.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.message = '';
      })
      .addCase(regiForEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.message = 'Event registration successfully!';
      })
      .addCase(regiForEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to register in event';
      });
  }
});

export const { clearMessage } = eventSlice.actions;

export default eventSlice.reducer;
