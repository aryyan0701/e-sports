import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const develoment = "http://localhost:5000";
const production = "https://e-sports-ynb7.onrender.com";

export const fetchUserEvents = createAsyncThunk(
  'user/fetchUserEvents',
  async ({ userId, role, email }, { rejectWithValue }) => {
    try {
      if (role === 'organizer') {
        const createdEventsRes = await axios.get(`${production}/api/events`);
        const filteredEvents = createdEventsRes.data.filter(event => event.userEmail === email);
        return { createdEvents: filteredEvents };
      } else if (role === 'player') {
        const token = sessionStorage.getItem('token');
        const registeredEventsRes = await axios.get(`${production}/api/events/player/${userId}/registered`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return { registeredEvents: registeredEventsRes.data };
      }
    } catch (err) { 
      return rejectWithValue(err.response.data);
    }
  }
);
