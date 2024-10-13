import { createSlice } from '@reduxjs/toolkit';
import { fetchChats } from './chatThunks';

const chatsSlice = createSlice({
  name: 'chat',
  initialState: {
    chats: [],
    status: 'idle',
    error: null,
  },
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
        state.chats = action.payload.data.conversations;
      })
      .addCase(fetchChats.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });

    // Send Message
    // .addCase(sendMessage.pending, (state) => {
    //   state.status = 'loading';
    // })
    // .addCase(sendMessage.fulfilled, (state, action) => {
    //   state.status = 'success';
    //   state.chat.messages.push(action.payload.data.message);
    //   state.chat.lastMessage = action.payload.data.message;
    // })
    // .addCase(sendMessage.rejected, (state, action) => {
    //   state.status = 'failed';
    //   state.error = action.error.message;
    // });
  },
});

export const { setLastMesage } = chatsSlice.actions;
export default chatsSlice.reducer;
