import { createAsyncThunk } from '@reduxjs/toolkit';
import { postAPIData } from './../../../utils/APIFunctions';
import { url } from '../../../url';
import Cookies from 'js-cookie';

const LOGIN = 'user/login';
const SIGNUP = 'user/signup';

// Login
export const login = createAsyncThunk(
  LOGIN,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await postAPIData('/api/v1/users/login', { email, password });
      if (res.status === 'success') {
        //   // Set token and user info
        Cookies.set('jwt', res.token, {
          expires: 90,
          path: '/',
          secure: true,
          sameSite: 'lax',
        });
        localStorage.setItem('user', JSON.stringify(res.data.user));
        return res.data.user;
      } else {
        return rejectWithValue(res.message || 'Login failed');
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Login failed');
    }
  }
);

// Signup
export const signup = createAsyncThunk(
  SIGNUP,
  async (formData, { rejectWithValue }) => {
    try {
      const res = await fetch(`${url}/api/v1/users/signup`, {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const json = await res.json();
        // Pass the message from the response
        return rejectWithValue(json.message || 'Sign up failed');
      }
      const json = await res.json();

      // set user Info
      Cookies.set('jwt', json.token, {
        expires: 90,
        path: '/',
        secure: true,
        sameSite: 'lax',
      });
      localStorage.setItem('user', JSON.stringify(json.data.user));

      return json.data.user;
    } catch (err) {
      return rejectWithValue('An unexpected error occurred.');
    }
  }
);
