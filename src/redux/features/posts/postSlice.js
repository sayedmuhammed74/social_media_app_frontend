import { createSlice } from '@reduxjs/toolkit';
import { createPost, fetchPosts, fetchUserPosts } from './postThunks';
const initialState = {
  posts: [],
  userPosts: [],
  status: 'idle',
  error: null,
  totalPosts: 0,
  totalPages: 0,
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    // Post
    editPost: () => {},
    deletePost: (state, action) => {
      const filteredPosts = state.posts.filter(
        (post) => post?.id !== action.payload
      );
      state.posts = filteredPosts;
    },
    resetPosts: (state) => {
      state.posts = initialState.posts;
      state.userPosts = initialState.userPosts;
      state.status = initialState.status;
      state.error = initialState.error;
      state.totalPosts = initialState.totalPosts;
      state.totalPages = initialState.totalPages;
    },
    // Like
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
    // Comment
    addComment: (state, action) => {
      const postId = action.payload.postId; // Assuming the payload contains the post ID
      const comment = action.payload.comment; // Assuming the payload contains the comment data
      const post = state.posts.find((post) => post?.id === postId);
      if (post) {
        post.comments.push(comment); // Add the comment to the post's comments
      }
    },
    deleteComment: (state, action) => {
      const postId = action.payload.postId; // Assuming the payload contains the post ID
      const commentId = action.payload.commentId; // Assuming the payload contains the comment data
      const post = state.posts.find((post) => post?.id === postId);
      if (post) {
        post.comments = post.comments.filter(
          (comment) => comment._id !== commentId
        ); // Add the comment to the post's comments
      }
    },
    editCommment: (state, action) => {
      const postId = action.payload.postId; // Assuming the payload contains the post ID
      const commentId = action.payload.commentId; // Assuming the payload contains the comment data
      const content = action.payload.content; // Assuming the payload contains the comment data
      const post = state.posts.find((post) => post?.id === postId);
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
        state.error = action.error.message;
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
        state.error = action.error.message;
      })

      // Create Post
      .addCase(createPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.status = 'success';
        state.posts = [action.payload.data.post, ...state.posts];
      })
      .addCase(createPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const {
  editPost,
  deletePost,
  resetPosts,
  likePost,
  dislikePost,
  addComment,
  editCommment,
  deleteComment,
} = postsSlice.actions;
export default postsSlice.reducer;
