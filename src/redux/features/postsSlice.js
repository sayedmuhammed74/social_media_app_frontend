import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { url } from '../../url';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async ({ userId, page }) => {
    const token = `Bearer ${Cookies.get('jwt')}`;
    const res = await fetch(
      `${url}/api/v1/posts?userId=${userId}&page=${page}`,
      {
        method: 'GET',
        // credentials: 'include',
        headers: {
          'Content-Type': 'Application/json',
          authorization: token,
        },
      }
    );
    // Catch Error
    if (!res.ok) {
      const json = await res.json();
      throw new Error(json.message);
    }
    const json = await res.json();
    return json;
  }
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async ({ description, media }) => {
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

    // Catch Error
    if (!res.ok) {
      throw new Error(json.message);
    }
    return json;
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    status: 'idle',
    error: null,
    totalPosts: 0,
    totalPages: 0,
  },
  reducers: {
    likePost: (state, action) => {
      const postId = action.payload.postId; // Assuming the payload contains the post ID
      const like = action.payload.like; // Assuming the payload contains the like data

      const post = state.posts.find((post) => post?.id === postId);

      if (post) {
        post.likes.push(like); // Add the like to the post's likes
      }
    },
    dislikePost: (state, action) => {
      const postId = action.payload.postId; // Assuming the payload contains the post ID
      const likeId = action.payload.likeId; // Assuming the payload contains the like data

      const post = state.posts.find((post) => post?.id === postId);

      if (post) {
        post.likes = post.likes.filter((like) => like._id !== likeId); // Add the like to the post's likes
      }
    },
    addComment: (state, action) => {
      const postId = action.payload.postId; // Assuming the payload contains the post ID
      const comment = action.payload.comment; // Assuming the payload contains the comment data

      const post = state.posts.find((post) => post?.id === postId);

      if (post) {
        post.comments.push(comment); // Add the comment to the post's comments
      }
    },
    deleteCommment: () => {},
    editCommment: () => {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'success';
        if (state.totalPosts === action.payload.totalPosts) {
          state.posts.push(...action.payload.data.posts);
        } else {
          state.posts = action.payload.data.posts;
        }
        state.totalPosts = action.payload.totalPosts;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      // Create Post
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state) => {
        state.status = 'success';
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  likePost,
  dislikePost,
  addComment,
  deleteCommment,
  editCommment,
} = postsSlice.actions;
export default postsSlice.reducer;
