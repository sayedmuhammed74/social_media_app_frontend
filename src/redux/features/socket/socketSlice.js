import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'socket',
  initialState: {
    socket: null,
    connected: false,
  },
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

export const { setSocket, disconnectSocket } = userSlice.actions;
export default userSlice.reducer;
