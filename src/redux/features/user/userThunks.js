import { createAsyncThunk } from '@reduxjs/toolkit';
import { url } from '../../../url';
import Cookies from 'js-cookie';

// Login
export const login = createAsyncThunk(
  'user/login',
  async ({ email, password }) => {
    try {
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

      // set token to cookies
      Cookies.set('jwt', json.token);

      // set user to local storage
      localStorage.setItem('user', JSON.stringify(json.data.user));

      return json;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);

// Signup
export const signup = createAsyncThunk('user/signup', async (formData) => {
  try {
    const res = await fetch(`${url}/api/v1/users/signup`, {
      method: 'POST',
      body: formData,
    });
    const json = await res.json();

    // set token to cookies
    Cookies.set('jwt', json.token);

    // set user to local storage
    localStorage.setItem('user', JSON.stringify(json.data.user));

    return json;
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
});
