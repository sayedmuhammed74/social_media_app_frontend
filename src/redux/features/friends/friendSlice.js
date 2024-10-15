import { createSlice } from '@reduxjs/toolkit';
import { fetchFriends } from './friendThunks';

// Initial State
const initialState = {
  friends: [],
  onlineFriends: [],
  status: 'idle',
  error: null,
};

// Frieds Slice
const friendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {
    setOnlineFriends: (state, action) => {
      state.onlineFriends = action.payload;
    },
    addFriend: (state, action) => {
      state.friends.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Fiends
      .addCase(fetchFriends.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchFriends.fulfilled, (state, action) => {
        state.status = 'success';
        state.friends = action.payload;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { addFriend, setOnlineFriends } = friendsSlice.actions;
export default friendsSlice.reducer;
