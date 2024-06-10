import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counterSlice';
import postsReducer from './features/postsSlice';
import storiesReducer from './features/storiesSlice';
import userReducer from './features/userSlice';
const store = configureStore({
  reducer: {
    counter: counterReducer,
    posts: postsReducer,
    stories: storiesReducer,
    user: userReducer,
  },
});

export default store;
