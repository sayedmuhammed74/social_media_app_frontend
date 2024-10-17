// Hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faEllipsis,
  faHeart,
  // faShare,
} from '@fortawesome/free-solid-svg-icons';
// Utils
import moment from 'moment';
import axios from 'axios';
import Cookies from 'js-cookie';
import { url } from '../../url';
// Components
import Comments from './Comments';
import Likes from './Likes';
// Actions
import {
  deletePost,
  dislikePost,
  likePost,
} from '../../redux/features/posts/postSlice';
import { Link } from 'react-router-dom';
import { deleteAPIData, postAPIData } from '../../utils/APIFunctions';
import UpdateCard from './updateCard';

const PostCard = ({ post }) => {
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // States
  const [showMoreText, setShowMoreText] = useState(false);
  const [postOptionsList, setPostOptionsList] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [isLiked, setIsLiked] = useState([]);
  const toggleText = () => setShowMoreText(!showMoreText);
  const [update, setUpdate] = useState(false);
  // see if post liked by loged user
  useEffect(() => {
    const filteredLikes = post?.likes?.filter(
      (like) => like?.user?._id === user?._id
    );
    setIsLiked(filteredLikes);
  }, [post, user]);

  // Likes
  const dislike = (likeId) => {
    deleteAPIData(`/api/v1/posts/${post?._id}/likes/${likeId}`)
      .then(() => {
        setIsLiked([]);
        dispatch(dislikePost({ likeId, postId: post?._id }));
      })
      .catch((err) => console.log(err));
  };

  const addLike = () => {
    postAPIData(`/api/v1/posts/${post?._id}/likes`, undefined)
      .then((res) => {
        setIsLiked([res.data.like]);
        dispatch(likePost({ like: res.data.like, postId: post?._id }));
      })
      .catch((err) => console.log(err));
  };

  const handleLikeBtn = () => {
    if (isLiked?.length === 1) {
      dislike(isLiked[0]?._id);
    } else {
      addLike();
    }
  };

  // Delete Post
  const handleDeletePost = () => {
    axios
      .delete(`${url}/api/v1/posts/${post._id}`, {
        headers: {
          authorization: `Bearer ${Cookies.get('jwt')}`,
        },
      })
      .then(() => dispatch(deletePost(post?._id)))
      .catch((err) => console.log(err))
      .finally(() => setPostOptionsList(false));
  };

  // update Post
  const showUpdatePost = () => {
    setPostOptionsList(false);
    setUpdate(true);
  };

  return (
    <div
      className={`p-5 shadow-md flex flex-col rounded-sm my-5 ${
        post?.media?.length > 0 ? 'h-[600px] max-h-[600px]' : ''
      } bg-white`}
    >
      <div className="flex p-3 justify-between relative">
        {/* user info & time ago */}
        <div className="flex gap-2">
          <img
            src={post?.user?.picture} // Assuming profilePicture is the property for user's profile picture
            alt={post?.user?.firstname}
            width={30}
            height={30}
            className="rounded-md"
            loading="lazy"
          />
          <div className="flex flex-col items-stretch">
            <Link to={`/users/${post?.user?.slug}`}>
              <span className="text-sm font-medium text-slate-800 cursor-pointer hover:opacity-75">
                {post?.user?.firstname} {post?.user?.lastname}
              </span>
            </Link>
            <span className="flex gap-1 font-extralight text-gray-400">
              {moment(post?.createdAt).fromNow()}
            </span>
          </div>
        </div>
        <FontAwesomeIcon
          icon={faEllipsis}
          className="cursor-pointer hover:opacity-50"
          onClick={() => setPostOptionsList((prev) => !prev)}
        />
        <ul
          className={`${
            postOptionsList ? 'flex' : 'hidden'
          } absolute right-3 top-7 flex-col gap-1 rounded-sm rounded-b-lg shadow-sm divide-x bg-gray-100 select-none`}
        >
          {user?._id === post?.user?._id && (
            <>
              <li
                onClick={handleDeletePost}
                className="py-1.5 px-5 text-sm text-gray-600 cursor-pointer hover:bg-gray-300 hover:text-white"
              >
                Delete Post
              </li>
              <li
                onClick={showUpdatePost}
                className="py-1.5 px-5 text-sm text-gray-600 cursor-pointer hover:bg-gray-300 hover:text-white"
              >
                Edit Post
              </li>
            </>
          )}
          {user?._id !== post?.user?._id && (
            <li
              onClick={() => setPostOptionsList(false)}
              className="py-1.5 px-5 text-sm text-gray-600 cursor-pointer hover:bg-gray-300 hover:text-white"
            >
              Save
            </li>
          )}
        </ul>
      </div>

      {!update && (
        <>
          {/* post text */}
          <div className="px-3 overflow-hidden my-5">
            <p className={showMoreText ? '' : 'line-clamp-3'}>
              {post?.description}
            </p>
            {post?.description?.length > 100 && (
              <span
                className="text-blue-500 cursor-pointer"
                onClick={toggleText}
              >
                {showMoreText ? ' Show less' : ' Read more'}
              </span>
            )}
          </div>

          {/* post media */}
          {post?.media?.length > 0 && (
            <div className="flex flex-1 justify-center my-2 h-[200px]">
              <img
                src={post?.media[0]}
                alt=""
                className="object-contain aspect-square rounded-sm"
              />
            </div>
          )}
        </>
      )}

      {update && <UpdateCard post={post} setUpdate={setUpdate} />}

      <div>
        {/* Likes */}
        <Likes likes={post?.likes} />
        {/* Icons */}
        <div className="flex justify-between p-3">
          <div className="flex gap-2 items-center p-2">
            {/* Like Icon */}
            <FontAwesomeIcon
              icon={faHeart}
              className={`${
                isLiked?.length === 1 ? 'text-[#74C0FC]' : 'text-gray-400'
              } cursor-pointer hover:opacity-80`}
              onClick={handleLikeBtn}
            />
            {/* Comment Icon */}
            <FontAwesomeIcon
              onClick={() => setShowComments((prev) => !prev)}
              icon={faComment}
              className="cursor-pointer hover:opacity-80 text-gray-400"
            />
          </div>
          {/* Comments number */}
          <span className="text-gray-500">
            {post?.comments?.length} comments
          </span>
          {/* Share Icon */}
          {/* <FontAwesomeIcon icon={faShare} style={{ color: '#74C0FC' }} /> */}
        </div>
        {/* Comments */}
        <Comments
          showComments={showComments}
          post={post}
          setShowComments={setShowComments}
        />
      </div>
    </div>
  );
};

export default PostCard;
