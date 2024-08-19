import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signupUser = createAsyncThunk(
  'auth/register',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://e-sports-ynb7.onrender.com/api/users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://e-sports-ynb7.onrender.com/api/users/login', formData);
      const { token, user } = response.data;

      // Store the token in session storage
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (error) {
      return rejectWithValue(error.response.data.message || "Login failed");
    }
  }
);
