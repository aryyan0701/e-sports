import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/events/create', eventData);
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
