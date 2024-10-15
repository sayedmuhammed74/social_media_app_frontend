import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAPIData } from './../../../utils/APIFunctions';

const FETCH_FRIENDS = 'friends/fetchFriends';

export const fetchFriends = createAsyncThunk(
  FETCH_FRIENDS,
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAPIData('/api/v1/users/friends');
      if (res.status === 'success') {
        return res.data.friends;
      } else {
        return rejectWithValue(res.message || 'Failed to fetch friends');
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch friends');
    }
  }
);
