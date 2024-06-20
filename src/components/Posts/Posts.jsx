// components
import PostCard from './PostCard';
import AddPost from './AddPost';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// reducres
import { fetchPosts } from '../../redux/features/postsSlice';

const Posts = ({ userId }) => {
  const { posts, status, error } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts({ userId }));
  }, [dispatch, userId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'faild') {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <section>
        {/* Add New Post */}
        <AddPost />
        {/* Posts */}
        <div>
          {posts?.map((post) => (
            // <div key={post._id}>{post.discription}</div>
            <PostCard post={post} key={post._id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Posts;
