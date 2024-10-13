import Cookies from 'js-cookie';
import { url } from '../../../url';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStories = createAsyncThunk(
  'stories/fetchStories',
  async () => {
    try {
      const token = `Bearer ${Cookies.get('jwt')}`;
      const res = await fetch(`${url}/api/v1/users/stories`, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/json',
          authorization: token,
        },
      });
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);

export const createStory = createAsyncThunk(
  'stories/createStory',
  async ({ image, text }) => {
    try {
      const token = `Bearer ${Cookies.get('jwt')}`;
      const res = await fetch(`${url}/api/v1/users/stories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          authorization: token,
        },
        body: JSON.stringify({
          image,
          text,
        }),
      });
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);
