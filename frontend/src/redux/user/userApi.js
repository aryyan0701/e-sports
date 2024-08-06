import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserEvents = createAsyncThunk(
  'user/fetchUserEvents',
  async ({ userId, role, email }, { rejectWithValue }) => {
    try {
      if (role === 'organizer') {
        const createdEventsRes = await axios.get("http://localhost:5000/api/events");
        const filteredEvents = createdEventsRes.data.filter(event => event.userEmail === email);
        return { createdEvents: filteredEvents };
      } else if (role === 'player') {
        const token = sessionStorage.getItem('token');
        const registeredEventsRes = await axios.get(`http://localhost:5000/api/events/player/${userId}/registered`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        return { registeredEvents: registeredEventsRes.data };
      }
    } catch (err) {
      console.error("Error fetching events:", err);  
      return rejectWithValue(err.response.data);
    }
  }
);
