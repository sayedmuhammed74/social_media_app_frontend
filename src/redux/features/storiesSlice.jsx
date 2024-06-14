import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const fetchStories = createAsyncThunk(
  'stories/fetchStories',
  async () => {
    const token = `Bearer ${Cookies.get('jwt')}`;
    const res = await fetch('http://localhost:8000/api/v1/users/stories', {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        authorization: token,
      },
    });

    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.message);
    }
    const json = await res.json();
    return json;
  }
);

export const createStory = createAsyncThunk(
  'stories/createStory',
  async ({ image, text }) => {
    const token = `Bearer ${Cookies.get('jwt')}`;
    const res = await fetch('http://localhost:8000/api/v1/users/stories', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        authorization: token,
      },
      body: JSON.stringify({
        image,
        text,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message);
    }
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
      // Fetch All Stories
      .addCase(fetchStories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.status = 'success';
        state.stories = action.payload.data.stories;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Create Story
      .addCase(createStory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.status = 'success';
        state.stories.unshift(action.payload.data.story);
      })
      .addCase(createStory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default storiesSlice.reducer;
