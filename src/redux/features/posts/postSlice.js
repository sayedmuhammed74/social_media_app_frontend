import { createSlice } from '@reduxjs/toolkit';
import {
  createPost,
  fetchPosts,
  fetchUserPosts,
  updatePost,
} from './postThunks';

// Initial State
const initialState = {
  posts: [],
  userPosts: [],
  status: 'idle',
  error: null,
  totalPosts: 0,
  totalPages: 0,
};

// Pst Slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Delete Post
    deletePost: (state, action) => {
      const filteredPosts = state.posts.filter(
        (post) => post?.id !== action.payload
      );
      const filteredUsersPosts = state.userPosts.filter(
        (post) => post?.id !== action.payload
      );
      state.posts = filteredPosts;
      state.userPosts = filteredUsersPosts;
    },
    // Like
    likePost: (state, action) => {
      const { postId, like } = action.payload;
      const post = state.posts.find((post) => post?._id === postId);
      if (post) {
        post.likes.push(like); // Add the like to the post's likes
      }
      const userPost = state.userPosts.find((post) => post?._id === postId);
      if (userPost) {
        userPost.likes.push(like); // Add the like to the post's likes
      }
    },
    dislikePost: (state, action) => {
      const { postId, likeId } = action.payload; // Assuming the payload contains the post ID
      const postIndex = state.posts.findIndex((post) => post?.id === postId);
      if (postIndex !== -1) {
        const post = state.posts[postIndex];
        post.likes = post.likes.filter((like) => like._id !== likeId);
      }
      const userPostIndex = state.userPosts.findIndex(
        (post) => post?.id === postId
      );
      if (userPostIndex !== -1) {
        const post = state.userPosts[userPostIndex];
        post.likes = post.likes.filter((like) => like._id !== likeId);
      }
    },
    // Comment
    addComment: (state, action) => {
      const comment = action.payload; // Assuming the payload contains the comment data
      const post = state.posts.find((post) => post?.id === comment.post);
      if (post) {
        post.comments.push(comment); // Add the comment to the post's comments
      }
      const userPost = state.userPosts.find(
        (post) => post?.id === comment.post
      );
      if (userPost) {
        userPost.comments.push(comment); // Add the comment to the post's comments
      }
    },
    deleteComment: (state, action) => {
      const postId = action.payload.postId; // Assuming the payload contains the post ID
      const commentId = action.payload.commentId; // Assuming the payload contains the comment data
      const post = state.posts.find((post) => post._id === postId);
      if (post) {
        post.comments = post.comments.filter(
          (comment) => comment._id !== commentId
        ); // Add the comment to the post's comments
      }
      const userPost = state.userPosts.find((post) => post._id === postId);
      if (userPost) {
        userPost.comments = userPost.comments.filter(
          (comment) => comment._id !== commentId
        ); // Add the comment to the post's comments
      }
    },
    editCommment: (state, action) => {
      const { postId, commentId, content } = action.payload;
      const post = state.posts.find((post) => post._id === postId);
      if (post) {
        post.comments = post.comments.map((comment) => {
          if (comment._id === commentId) {
            return {
              ...comment, // Spread existing comment properties
              content: content, // Update the content
            };
          }
          return comment; // Return original comment if no match
        }); // Add the comment to the post's comments
      }
      const userPost = state.userPosts.find((post) => post._id === postId);
      if (userPost) {
        userPost.comments = userPost.comments.map((comment) => {
          if (comment._id === commentId) {
            return {
              ...comment, // Spread existing comment properties
              content: content, // Update the content
            };
          }
          return comment; // Return original comment if no match
        }); // Add the comment to the post's comments
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Posts
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        if (action.payload.currentPage === 1) {
          state.posts = action.payload.data.posts;
        } else if (action.payload.currentPage <= action.payload.totalPages) {
          state.posts.push(...action.payload.data.posts);
        }
        state.totalPosts = action.payload.totalPosts;
        state.totalPages = action.payload.totalPages;
        state.status = 'success';
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Fetch User Posts
      .addCase(fetchUserPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        if (action.payload.currentPage === 1) {
          state.userPosts = action.payload.data.posts;
        } else {
          state.userPosts.push(...action.payload.data.posts);
        }
        state.totalPosts = action.payload.totalPosts;
        state.totalPages = action.payload.totalPages;
        state.status = 'success';
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create Post
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'success';
        state.posts = [action.payload, ...state.posts];
        state.userPosts = [action.payload, ...state.userPosts];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })

      // Create Post
      .addCase(updatePost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.status = 'success';
        const userPostIndex = state.userPosts.findIndex(
          (post) => post._id === action.payload._id
        );
        state.userPosts[userPostIndex] = action.payload;
        const postIndex = state.posts.findIndex(
          (post) => post._id === action.payload._id
        );
        if (postIndex !== -1) {
          state.posts[postIndex] = action.payload;
        }
        // state.posts[index] = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {
  editPost,
  deletePost,
  likePost,
  dislikePost,
  addComment,
  editCommment,
  deleteComment,
} = postsSlice.actions;

export default postsSlice.reducer;
