import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  postAPIData,
  getAPIData,
  updateAPIData,
} from './../../../utils/APIFunctions';

const FETCH_POSTS = 'posts/fetchPosts';
const FETCH_USER_POSTS = 'posts/fetchUserPosts';
const CREATE_POST = 'posts/createPost';
const UPDATE_POST = 'posts/updatePost';

export const fetchPosts = createAsyncThunk(
  FETCH_POSTS,
  async ({ page }, { rejectWithValue }) => {
    try {
      const res = await getAPIData(`/api/v1/posts?userId=&page=${page}`);
      if (res.status === 'success') {
        return res;
      } else {
        return rejectWithValue(res.message || 'Failed to fetch posts');
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch posts');
    }
  }
);

export const fetchUserPosts = createAsyncThunk(
  FETCH_USER_POSTS,
  async ({ userId, page }, { rejectWithValue }) => {
    try {
      const res = await getAPIData(
        `/api/v1/posts?userId=${userId}&page=${page}`
      );
      if (res.status === 'success') {
        return res;
      } else {
        return rejectWithValue(res.message || 'Failed to fetch posts');
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch posts');
    }
  }
);

export const createPost = createAsyncThunk(
  CREATE_POST,
  async ({ description, media }, { rejectWithValue }) => {
    try {
      const res = await postAPIData('/api/v1/posts', {
        description,
        media,
      });
      if (res.status === 'success') {
        return res.data.post;
      } else {
        return rejectWithValue(res.message || 'Faild to add post');
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Faild to add post');
    }
  }
);

export const updatePost = createAsyncThunk(
  UPDATE_POST,
  async ({ description, id }, { rejectWithValue }) => {
    try {
      const res = await updateAPIData(`/api/v1/posts/${id}`, { description });
      if (res.status === 'success') {
        return res.data.post;
      } else {
        return rejectWithValue(res.message || 'Faild to update post');
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Faild to update post');
    }
  }
);
