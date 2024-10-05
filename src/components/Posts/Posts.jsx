// components
import PostCard from './PostCard';
import AddPost from './AddPost';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// reducres
import { fetchPosts } from '../../redux/features/postsSlice';
import Loading from '../Loading';

const Posts = ({ userId }) => {
  const { user } = useSelector((state) => state.user);
  const { posts, totalPages, status } = useSelector((state) => state.posts);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    if (page === 1 || page <= totalPages) {
      dispatch(fetchPosts({ userId, page }));
    }
    return () => {};
  }, [dispatch, userId, page]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <section>
        {/* Add New Post */}
        {userId === user._id && <AddPost />}
        {/* Posts */}
        <div>
          {posts?.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </div>
        <Loading status={status} />
        {posts.length === 0 && status !== 'loading' && (
          <div className="text-center text-gray-400 text-sm">no posts</div>
        )}
      </section>
    </>
  );
};

export default Posts;
