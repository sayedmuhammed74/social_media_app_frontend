import { createSlice } from '@reduxjs/toolkit';
import {
  acceptRequest,
  cancelRequest,
  createRequest,
  fetchRequests,
} from './requestThunks';

// Initial State
const initialState = {
  requests: [],
  status: 'idle',
  error: null,
};

// Request Slice
const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Get All Friends Requests
      .addCase(fetchRequests.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.status = 'success';
        state.requests = action.payload;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create Request
      .addCase(createRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createRequest.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Accept Request
      .addCase(acceptRequest.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(acceptRequest.fulfilled, (state, action) => {
        state.status = 'success';
        let filteredRequests = state.requests.filter(
          (request) => request._id !== action.payload._id
        );
        state.requests = filteredRequests;
      })
      .addCase(acceptRequest.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
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
        state.error = action.payload;
      });
  },
});

export default requestsSlice.reducer;
