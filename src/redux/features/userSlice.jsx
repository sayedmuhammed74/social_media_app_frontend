import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const res = await fetch('http://localhost:8000/api/v1/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message);
    }

    // set token to cookies
    Cookies.set('jwt', json.token);

    // set user to local storage
    localStorage.setItem('user', JSON.stringify(json.data.user));
    return json;
  }
);

const user = JSON.parse(localStorage.getItem('user')) || {};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user,
    status: 'idle',
    error: null,
  },
  reducers: {
    logout(state) {
      Cookies.remove('jwt');
      state.user = {};
      localStorage.removeItem('user');
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.status = 'success';
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
