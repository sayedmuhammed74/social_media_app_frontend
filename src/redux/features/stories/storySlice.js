import { createSlice } from '@reduxjs/toolkit';
import { createStory, fetchStories } from './storyThunks';

// Initial State
const initialState = {
  stories: [],
  status: 'idle',
  error: null,
};

const storiesSlice = createSlice({
  name: 'stories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch All Stories
      .addCase(fetchStories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.status = 'success';
        state.stories = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create Story
      .addCase(createStory.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.status = 'success';
        state.stories.unshift(action.payload);
      })
      .addCase(createStory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default storiesSlice.reducer;
