import { createAsyncThunk } from '@reduxjs/toolkit';
import { postAPIData, getAPIData } from './../../../utils/APIFunctions';

const FETCH_STORIES = 'stories/fetchStories';
const CREATE_STORY = 'stories/createStory';

export const fetchStories = createAsyncThunk(
  FETCH_STORIES,
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAPIData('/api/v1/users/stories');
      if (res.status === 'success') {
        return res.data.stories;
      } else {
        return rejectWithValue(res.message || 'Failed to fetch stories');
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch stories');
    }
  }
);

export const createStory = createAsyncThunk(
  CREATE_STORY,
  async ({ image, text }, { rejectWithValue }) => {
    try {
      const res = await postAPIData('/api/v1/users/stories', { image, text });
      if (res.status === 'success') {
        return res.data.story;
      } else {
        return rejectWithValue(res.message || 'Failed to create story');
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to create story');
    }
  }
);
