import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken = () => sessionStorage.getItem('token');

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post('http://localhost:5000/api/events/create', eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getEvents = createAsyncThunk(
  'event/getEvents',
  async (thunkAPI) => {
    try {
      const response = await axios.get('http://localhost:5000/api/events');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const regiForEvent = createAsyncThunk(
  'event/register',
  async ({ eventId, formData }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(`http://localhost:5000/api/events/${eventId}/register`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
