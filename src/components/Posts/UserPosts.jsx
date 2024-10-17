// components
import PostCard from './PostCard';
import AddPost from './AddPost';
import Loading from '../Loading';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// Actions
import { fetchUserPosts } from '../../redux/features/posts/postThunks';

const UserPosts = ({ userId }) => {
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { userPosts, totalPages, status } = useSelector((state) => state.posts);
  // States
  const [page, setPage] = useState(1);

  // Fetch Posts
  useEffect(() => {
    if (userId) {
      if (page === 1 || page <= totalPages) {
        dispatch(fetchUserPosts({ userId, page }));
      }
    }
    return () => {};
  }, [dispatch, userId, page, totalPages]);

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
    <section>
      {/* Add New Post */}
      {userId === user?._id && <AddPost />}
      {/* Posts */}
      <div>
        {userPosts?.map((post, index) => (
          <PostCard post={post} key={`${post?._id}-${index}`} />
        ))}
      </div>
      <Loading status={status} />
      {userPosts?.length === 0 && status !== 'loading' && (
        <div className="text-center text-gray-400 text-sm">no posts</div>
      )}
    </section>
  );
};

export default UserPosts;
