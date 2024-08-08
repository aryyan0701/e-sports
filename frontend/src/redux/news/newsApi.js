import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API;

export const fetchLeaguesNews = createAsyncThunk(
  'news/fetchLeaguesNews',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("https://esports.sportdevs.com/agg-news-leagues", {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching event news:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const fetchMatchesNews = createAsyncThunk(
  'news/fetchMatchesNews', 
  async(_, thunkAPI) =>{
    try {
      const response = await axios.get('https://esports.sportdevs.com/agg-news-matches', {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${API_KEY}`
        }
      })
      return response.data;
    } catch (error) {
      console.error("Error fetching event news:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)