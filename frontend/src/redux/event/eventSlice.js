import { createSlice } from '@reduxjs/toolkit';
import { createEvent } from './eventApi';

const initialState = {
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
        state.message = 'Event created successfully!';
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to create event';
      });
  }
});

export const { clearMessage } = eventSlice.actions;

export default eventSlice.reducer;
