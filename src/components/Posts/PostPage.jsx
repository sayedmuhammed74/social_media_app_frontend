import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAPIData } from '../../utils/APIFunctions';
import PostCard from './PostCard';
import SkeletonPost from './SkeletonPost';

const PostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAPIData(`/api/v1/posts/${postId}`)
      .then((res) => setPost(res.data.post))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [postId]);

  return (
    <section className="container mx-auto py-2 px-5">
      {!loading ? <PostCard post={post} /> : <SkeletonPost />}
    </section>
  );
};

export default PostPage;
