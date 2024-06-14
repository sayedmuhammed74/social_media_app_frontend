import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const fetchFriends = createAsyncThunk(
  'friends/fetchFriends',
  async () => {
    const token = `Bearer ${Cookies.get('jwt')}`;
    const res = await fetch('http://localhost:8000/api/v1/users/friends', {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        authorization: token,
      },
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message);
    }

    return json;
  }
);

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    friends: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Fiends
      .addCase(fetchFriends.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.status = 'success';
        state.friends = action.payload.data.friends;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default friendsSlice.reducer;
