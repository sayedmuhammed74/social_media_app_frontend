import Cookies from 'js-cookie';
import { url } from './../../../url';
import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_POSTS = 'posts/fetchPosts';
const FETCH_USER_POSTS = 'posts/fetchUserPosts';
const CREATE_POST = 'posts/createPost';

export const fetchPosts = createAsyncThunk(FETCH_POSTS, async ({ page }) => {
  try {
    const token = `Bearer ${Cookies.get('jwt')}`;
    const res = await fetch(`${url}/api/v1/posts?userId=&page=${page}`, {
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
});

export const fetchUserPosts = createAsyncThunk(
  FETCH_USER_POSTS,
  async ({ userId, page }) => {
    try {
      const token = `Bearer ${Cookies.get('jwt')}`;
      const res = await fetch(
        `${url}/api/v1/posts?userId=${userId}&page=${page}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/json',
            authorization: token,
          },
        }
      );
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);

export const createPost = createAsyncThunk(
  CREATE_POST,
  async ({ description, media }) => {
    try {
      const token = `Bearer ${Cookies.get('jwt')}`;
      const res = await fetch(`${url}/api/v1/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          authorization: token,
        },
        body: JSON.stringify({
          description,
          media,
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
