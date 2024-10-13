import Cookies from 'js-cookie';
import { url } from '../../../url';
import { createAsyncThunk } from '@reduxjs/toolkit';

const FETCH_REQUESTS = 'requests/fetchRequests';
const CREATE_REQUEST = 'requests/createRequest';
const ACCEPT_REQUEST = 'requests/acceptRequest';
const CANCEL_REQUEST = 'requests/cancelRequest';

export const fetchRequests = createAsyncThunk(FETCH_REQUESTS, async () => {
  try {
    const token = `Bearer ${Cookies.get('jwt')}`;
    const res = await fetch(`${url}/api/v1/users/requests`, {
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

export const createRequest = createAsyncThunk(
  CREATE_REQUEST,
  async ({ reciever }) => {
    try {
      const token = `Bearer ${Cookies.get('jwt')}`;
      const res = await fetch(`${url}/api/v1/users/requests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json',
          authorization: token,
        },
        body: JSON.stringify({ to: reciever }),
      });
      const json = await res.json();
      return json;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);

export const acceptRequest = createAsyncThunk(
  ACCEPT_REQUEST,
  async ({ id }) => {
    try {
      const token = `Bearer ${Cookies.get('jwt')}`;
      const res = await fetch(`${url}/api/v1/users/requests/${id}`, {
        method: 'PATCH',
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

export const cancelRequest = createAsyncThunk(
  CANCEL_REQUEST,
  async ({ id }) => {
    try {
      const token = `Bearer ${Cookies.get('jwt')}`;
      await fetch(`${url}/api/v1/users/requests/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'Application/json',
          authorization: token,
        },
      });

      return id;
    } catch (err) {
      console.log(err);
      throw new Error(err);
    }
  }
);
