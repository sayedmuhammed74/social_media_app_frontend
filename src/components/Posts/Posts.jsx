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
        {!userId && <AddPost />}
        {/* Posts */}
        <div>
          {posts?.map((post) => (
            <PostCard post={post} key={post._id} />
          ))}
        </div>
        <Loading status={status} />
      </section>
    </>
  );
};

export default Posts;
