import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const getToken = () => sessionStorage.getItem('token');
const develoment = "http://localhost:5000";
const production = "https://e-sports-ynb7.onrender.com";

export const createEvent = createAsyncThunk(
  'event/createEvent',
  async (eventData, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(`${production}/api/events/create`, eventData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message || 'Error to create Event');
    }
  }
);

export const getEvents = createAsyncThunk(
  'event/getEvents',
  async (thunkAPI) => {
    try {
      const response = await axios.get(`${production}/api/events`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Error to fetch Events');
    }
  }
);

export const regiForEvent = createAsyncThunk(
  'event/register',
  async ({ eventId, formData }, { rejectWithValue }) => {
    try {
      const token = getToken();
      const response = await axios.post(`${production}/api/events/${eventId}/register`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data.message || 'Event Registration failed');
    }
  }
);
