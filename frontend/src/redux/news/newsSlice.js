import { createSlice } from "@reduxjs/toolkit";
import { fetchLeaguesNews, fetchMatchesNews } from "./newsApi";

const initialState = {
  news: [],
  status: 'idle',
  error: null,
};

const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaguesNews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLeaguesNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload;
      })
      .addCase(fetchLeaguesNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchMatchesNews.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMatchesNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.news = action.payload;
      })
      .addCase(fetchMatchesNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
