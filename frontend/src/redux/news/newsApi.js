import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("https://esports.sportdevs.com/agg-news-leagues", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer lC94rsNKA0GJbXSXV4hObA`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching event news:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
