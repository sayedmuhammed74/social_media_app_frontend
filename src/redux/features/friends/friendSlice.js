import { createSlice } from '@reduxjs/toolkit';
import { fetchFriends } from './friendThunks';

const friendsSlice = createSlice({
  name: 'friends',
  initialState: {
    friends: [],
    onlineFriends: [],
    status: 'idle',
    error: null,
  },
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
        state.friends = action.payload.data?.friends;
      })
      .addCase(fetchFriends.rejected, (state, action) => {
        console.log('failed');
        console.log(action.error);
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const { addFriend, setOnlineFriends } = friendsSlice.actions;
export default friendsSlice.reducer;
