import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { url } from '../../url';

// Login
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    const res = await fetch(`${url}/api/v1/users/login`, {
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

// Signup
export const signup = createAsyncThunk('user/signup', async (formData) => {
  const res = await fetch(`${url}/api/v1/users/signup`, {
    method: 'POST',
    body: formData,
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
});

// check if user exist in local host
const user = localStorage.getItem('user')
  ? JSON.parse(localStorage.getItem('user'))
  : {};

// User Slice
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
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('user');
    },
  },
  extraReducers: (builder) => {
    builder
      // Login builders
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
        state.error = action.error.message;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
