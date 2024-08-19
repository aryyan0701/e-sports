import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_API;
const RAPID_API_KEY = import.meta.env.VITE_NEWS_RAPID_API

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


export const fetchHeadtoHeadMatches = createAsyncThunk(
  'news/fetchLiveMatch',
  async(_, thunkAPI) =>{
    try {
      const response = await axios.get('https://allsportsapi2.p.rapidapi.com/api/esport/event/jTVcsXcZc/h2h', {
        headers: {
          'x-rapidapi-key': RAPID_API_KEY,
          'x-rapidapi-host': 'allsportsapi2.p.rapidapi.com'
        }
      })
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error in fetching live matches:", error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
)