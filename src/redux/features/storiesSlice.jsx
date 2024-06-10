import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';

export const fetchStories = createAsyncThunk(
  'stories/fetchStories',
  async () => {
    let token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTkzNTlkOGE1NGM4NmNmMWU0OTY2OCIsImlhdCI6MTcxNzk4OTQ5MiwiZXhwIjoxNzI1NzY1NDkyfQ.yag9-2d0917U74AW7ueCerRpVbphm5hZk48ewTXwWkQ`;
    const res = await fetch('http://localhost:8000/api/v1/users/stories', {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        authorization: token,
      },
    });
    const json = await res.json();
    return json;
  }
);

const storiesSlice = createSlice({
  name: 'stories',
  initialState: {
    stories: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.status = 'success';
        state.stories = action.payload.data.stories;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default storiesSlice.reducer;
