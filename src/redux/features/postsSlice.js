import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { url } from '../../url';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ userId }) => {
    const token = `Bearer ${Cookies.get('jwt')}`;
    const res = await fetch(`${url}/api/v1/posts?userId=${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        authorization: token,
      },
    });
    // Catch Error
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.message);
    }
    const json = await res.json();
    return json;
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ description, media }) => {
    const token = `Bearer ${Cookies.get('jwt')}`;
    const res = await fetch(`${url}/api/v1/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        authorization: token,
      },
      body: JSON.stringify({
        description,
        media,
      }),
    });

    const json = await res.json();

    // Catch Error
    if (!res.ok) {
      throw new Error(json.message);
    }
    return json;
  }
);

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
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'success';
        state.posts = action.payload.data.posts;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Create Post
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
