import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import Cookies from 'js-cookie';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  let token = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTkzNTlkOGE1NGM4NmNmMWU0OTY2OCIsImlhdCI6MTcxNzkwNDI3MSwiZXhwIjoxNzI1NjgwMjcxfQ.5KOaTf-4vOLLdT7oQV895AC6juryW4DphnkTlxxoF4A`;
  const res = await fetch('http://localhost:8000/api/v1/posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'Application/json',
      authorization: token,
    },
  });
  const json = await res.json();
  return json;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'success';
        state.posts = action.payload.data.posts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload.message;
      });
  },
});

export default postsSlice.reducer;
