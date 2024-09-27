import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { url } from '../../url';

export const fetchRequests = createAsyncThunk(
  'requests/fetchRequests',
  async () => {
    const token = `Bearer ${Cookies.get('jwt')}`;
    const res = await fetch(`${url}/api/v1/users/requests`, {
      method: 'GET',
      headers: {
        'Content-Type': 'Application/json',
        authorization: token,
      },
    });
    const json = await res.json();

    if (!res.ok) {
      throw new Error(json.message);
    }

    return json;
  }
);

export const createRequest = createAsyncThunk(
  'requests/createRequest',
  async ({ reciever }) => {
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

    if (!res.ok) {
      throw new Error(json.message);
    }

    return json;
  }
);

export const acceptRequest = createAsyncThunk(
  'requests/acceptRequest',
  async ({ id }) => {
    const token = `Bearer ${Cookies.get('jwt')}`;
    const res = await fetch(`${url}/api/v1/users/requests/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/json',
        authorization: token,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.message);
    }

    return json;
  }
);

export const cancelRequest = createAsyncThunk(
  'requests/cancelRequest',
  async ({ id }) => {
    const token = `Bearer ${Cookies.get('jwt')}`;
    const res = await fetch(`${url}/api/v1/users/requests/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json',
        authorization: token,
      },
    });
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json?.message);
    }
    return id;
  }
);

const requestsSlice = createSlice({
  name: 'requests',
  initialState: {
    requests: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // Get All Friends Requests
      .addCase(fetchRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.status = 'success';
        state.requests = action.payload.data.requests;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Create Request
      .addCase(createRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createRequest.fulfilled, (state) => {
        state.status = 'success';
        fetchRequests();
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Accept Request
      .addCase(acceptRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.status = 'success';
        state.requests.forEach((request, index) => {
          if (request._id === action.payload.data.request._id) {
            state.requests.splice(index, 1);
          }
        });
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Cancel Friend Request
      .addCase(cancelRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(cancelRequest.fulfilled, (state, action) => {
        state.status = 'success';
        state.requests.forEach((request, index) => {
          if (request._id === action.payload) {
            state.requests.splice(index, 1);
          }
        });
      })
      .addCase(cancelRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default requestsSlice.reducer;
