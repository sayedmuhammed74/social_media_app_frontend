import { createAsyncThunk } from '@reduxjs/toolkit';
import { getAPIData } from './../../../utils/APIFunctions';

const FETCH_CHATS = 'chats/fetchChats';

export const fetchChats = createAsyncThunk(
  FETCH_CHATS,
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAPIData('/api/v1/conversations');
      if (res.status === 'success') {
        return res.data.conversations;
      } else {
        return rejectWithValue(res.message || 'Failed to fetch chats');
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch chats');
    }
  }
);
