// components
import PostCard from './PostCard';
import AddPost from './AddPost';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// reducres
import { fetchPosts } from '../../redux/features/postsSlice';

const Posts = ({ userId }) => {
  const { posts, status } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts({ userId }));
    return () => {};
  }, [dispatch, userId]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <>
      <section>
        {/* Add New Post */}
        <AddPost />
        {/* Posts */}
        <div>
          {posts?.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Posts;
