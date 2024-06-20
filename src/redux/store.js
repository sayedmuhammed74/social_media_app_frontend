import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/postsSlice';
import requestsReducer from './features/requestsSlice';
import friendsReducer from './features/friendsSlice';
import storiesReducer from './features/storiesSlice';
import userReducer from './features/userSlice';
const store = configureStore({
  reducer: {
    posts: postsReducer,
    requests: requestsReducer,
    friends: friendsReducer,
    stories: storiesReducer,
    user: userReducer,
  },
});

export default store;
