import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/posts/postSlice';
import requestsReducer from './features/requests/requestSlice';
import friendsReducer from './features/friends/friendSlice';
import storiesReducer from './features/stories/storySlice';
import userReducer from './features/user/userSlice';
import socketReducer from './features/socket/socketSlice';
import chatsReducer from './features/chats/chatSlice';
const store = configureStore({
  reducer: {
    posts: postsReducer,
    requests: requestsReducer,
    friends: friendsReducer,
    stories: storiesReducer,
    user: userReducer,
    socket: socketReducer,
    chats: chatsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable the check
    }),
});

export default store;
