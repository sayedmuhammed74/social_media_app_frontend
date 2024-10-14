import { createSlice } from '@reduxjs/toolkit';

import Cookies from 'js-cookie';
import { login, signup } from './userThunks';

// check if user exist in local host
const user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : null;

// User Slice
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout: (state) => {
      Cookies.remove('jwt');
      localStorage.removeItem('user');
      state.user = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login builders
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = 'success';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Signup builders
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.status = 'success';
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
