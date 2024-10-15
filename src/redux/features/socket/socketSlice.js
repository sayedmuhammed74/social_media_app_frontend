import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
  socket: null,
  connected: false,
};

// Socket Slice
const socketSlice = createSlice({
  name: 'socket',
  initialState,
  reducers: {
    setSocket: (state, action) => {
      state.socket = action.payload;
      state.connected = true;
    },
    disconnectSocket: (state) => {
      state.connected = false;
      state.socket = null;
    },
  },
});

export const { setSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;
