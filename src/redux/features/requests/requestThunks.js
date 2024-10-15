import { createAsyncThunk } from '@reduxjs/toolkit';

import {
  getAPIData,
  updateAPIData,
  deleteAPIData,
  postAPIData,
} from './../../../utils/APIFunctions';

const FETCH_REQUESTS = 'requests/fetchRequests';
const CREATE_REQUEST = 'requests/createRequest';
const ACCEPT_REQUEST = 'requests/acceptRequest';
const CANCEL_REQUEST = 'requests/cancelRequest';

export const fetchRequests = createAsyncThunk(
  FETCH_REQUESTS,
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAPIData('/api/v1/users/requests');
      if (res.status === 'success') {
        return res.data.requests;
      } else {
        return rejectWithValue(res.message || 'Failed to fetch requests');
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to fetch requests');
    }
  }
);

export const createRequest = createAsyncThunk(
  CREATE_REQUEST,
  async ({ reciever }, { rejectWithValue }) => {
    try {
      const res = await postAPIData('/api/v1/users/requests', { to: reciever });
      if (res.status === 'success') {
        return res.data.request;
      } else {
        return rejectWithValue(res.message || 'Failed to create request');
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to create request');
    }
  }
);

export const acceptRequest = createAsyncThunk(
  ACCEPT_REQUEST,
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await updateAPIData(`/api/v1/users/requests/${id}`);
      if (res.status === 'success') {
        return res.data.request;
      } else {
        return rejectWithValue(res.message || 'Failed to accept request');
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to accept request');
    }
  }
);

export const cancelRequest = createAsyncThunk(
  CANCEL_REQUEST,
  async ({ id }, { rejectWithValue }) => {
    try {
      const res = await deleteAPIData(`/api/v1/users/requests/${id}`);
      if (res.status === 'success') {
        return id;
      } else {
        return rejectWithValue(res.message || 'Failed to cancel request');
      }
    } catch (err) {
      return rejectWithValue(err.message || 'Failed to cancel request');
    }
  }
);
