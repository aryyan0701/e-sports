import { createSlice } from "@reduxjs/toolkit";
import { fetchLeaguesNews, fetchMatchesNews, fetchHeadtoHeadMatches } from "./newsApi";

const initialState = {
  leaguesNews: [],
  matchesNews: [],
  H2HMatches: [],
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
        state.leaguesNews = action.payload;
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
        state.matchesNews = action.payload;
      })
      .addCase(fetchMatchesNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(fetchHeadtoHeadMatches.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchHeadtoHeadMatches.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.H2HMatches = action.payload;
      })
      .addCase(fetchHeadtoHeadMatches.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
