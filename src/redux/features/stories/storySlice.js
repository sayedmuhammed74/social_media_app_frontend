import { createSlice } from '@reduxjs/toolkit';
import { createStory, fetchStories } from './storyThunks';

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
