import { createSlice } from '@reduxjs/toolkit';
import { fetchChats } from './chatThunks';

// Initial State
const initialState = {
  chats: [],
  status: 'idle',
  error: null,
};

// Chat Slice
const chatsSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setLastMesage: (state, action) => {
      const chatId = action.payload.chatId;
      const lastMessage = action.payload.message;
      const updatedChats = state.chats.map((chat) => {
        if (chat._id === chatId) {
          chat.lastMessage = lastMessage;
          return chat;
        }
        return chat;
      });
      state.chats = updatedChats;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get All Fiends
      .addCase(fetchChats.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchChats.fulfilled, (state, action) => {
        state.status = 'success';
        state.chats = action.payload;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setLastMesage } = chatsSlice.actions;
export default chatsSlice.reducer;
