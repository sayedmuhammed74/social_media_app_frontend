import Cookies from 'js-cookie';
import { url } from './../../../url';
import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_FRIENDS = 'friends/fetchFriends';

export const fetchFriends = createAsyncThunk(FETCH_FRIENDS, async () => {
  try {
    const token = `Bearer ${Cookies.get('jwt')}`;
    const res = await fetch(`${url}/api/v1/users/friends`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        authorization: token,
      },
    });
    const json = await res.json();
    // console.log(json);
    return json;
  } catch (err) {
    console.log(err);

    // return rejectWithValue(err.response?.data.message || err.message);
  }
});
