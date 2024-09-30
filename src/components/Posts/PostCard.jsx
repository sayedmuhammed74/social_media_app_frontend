import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faEllipsis,
  faHeart,
  // faShare,
} from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import axios from 'axios';
import { url } from '../../url';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import Comments from './Comments';

const PostCard = ({ post }) => {
  const [showMoreText, setShowMoreText] = useState(false);
  const [postOptionsList, setPostOptionsList] = useState(false);

  const toggleText = () => setShowMoreText(!showMoreText);
  const { user } = useSelector((state) => state.user);

  const [likes, setLikes] = useState([]);

  const [showComments, setShowComments] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false);
  const [isLiked, setIsLiked] = useState([]);

  const fetchLikes = () => {
    axios
      .get(`${url}/api/v1/posts/${post?._id}/likes`, {
        headers: {
          authorization: `Bearer ${Cookies.get('jwt')}`,
        },
      })
      .then((res) => {
        setLikes(res.data.data.likes);
        const filteredLikes = res.data.data.likes.filter(
          (like) => like?.user._id === user?._id
        );
        setIsLiked(filteredLikes);
      })
      .catch((err) => console.log(err));
  };

  // Fetch Likes
  useEffect(() => {
    fetchLikes();
    return () => {};
  }, [post]);

  // Likes
  const dislike = (likeId) => {
    isLiked;
    axios
      .delete(`${url}/api/v1/posts/${post?._id}/likes/${likeId}`, {
        headers: {
          authorization: `Bearer ${Cookies.get('jwt')}`,
        },
      })
      .then(() => {
        setIsLiked([]);
        fetchLikes();
      })
      .catch((err) => console.log(err));
  };

  const addLike = () => {
    axios
      .post(`${url}/api/v1/posts/${post?._id}/likes`, undefined, {
        headers: {
          authorization: `Bearer ${Cookies.get('jwt')}`,
        },
      })
      .then((res) => {
        setIsLiked([res.data.data.like]);
        fetchLikes();
      })
      .catch((err) => console.log(err));
  };

  const handleLikeBtn = () => {
    if (isLiked.length === 1) {
      dislike(isLiked[0]._id);
    } else {
      addLike();
    }
  };

  return (
    <div
      className={`p-5 shadow-md flex flex-col rounded-sm my-5 ${
        post?.media.length > 0 ? 'h-[600px] max-h-[600px]' : ''
      } bg-white`}
    >
      {/* user info & time ago */}
      <div className="flex p-3 justify-between relative">
        <div className="flex gap-2">
          <img
            src={post?.user.picture} // Assuming profilePicture is the property for user's profile picture
            className="rounded-md"
            width={30}
            height={30}
            alt=""
          />
          <div className="flex flex-col items-stretch">
            <span className="text-sm font-medium text-slate-800">
              {post?.user.firstname} {post?.user.lastname}
            </span>
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
          <li
            onClick={() => setPostOptionsList(false)}
            className="py-1.5 px-5 text-sm text-gray-600 cursor-pointer hover:bg-gray-300 hover:text-white"
          >
            Delete Post
          </li>
          <li
            onClick={() => setPostOptionsList(false)}
            className="py-1.5 px-5 text-sm text-gray-600 cursor-pointer hover:bg-gray-300 hover:text-white"
          >
            Edit Post
          </li>
          <li
            onClick={() => setPostOptionsList(false)}
            className="py-1.5 px-5 text-sm text-gray-600 cursor-pointer hover:bg-gray-300 hover:text-white"
          >
            Save
          </li>
        </ul>
      </div>

      {/* post text */}
      <div className="px-3 overflow-hidden my-5">
        <p className={showMoreText ? '' : 'line-clamp-3'}>
          {post?.description}
        </p>
        {post?.description.length > 100 && (
          <span className="text-blue-500 cursor-pointer" onClick={toggleText}>
            {showMoreText ? ' Show less' : ' Read more'}
          </span>
        )}
      </div>

      {/* post media */}
      {post?.media.length > 0 && (
        <div className="flex flex-1 justify-center my-2 h-[200px]">
          <img
            src={post?.media[0]}
            alt=""
            className="object-contain aspect-square rounded-sm"
          />
        </div>
      )}

      <div>
        {/* Likes */}
        <div className="flex items-center gap-2 p-3">
          <span>{likes?.length ? likes?.length + ' likes' : ''}</span>
          <div className="relative flex">
            {likes?.map((like) => (
              <img
                key={like?._id}
                src={like?.user.picture} // Replace with actual user images or profile pictures
                className="rounded-full w-5 h-5"
                alt=""
              />
            ))}
          </div>
        </div>
        {/* Icons */}
        <div className="flex justify-between p-3">
          <div className="flex gap-2 items-center p-2">
            <FontAwesomeIcon
              icon={faHeart}
              className={`${
                isLiked.length === 1 ? 'text-[#74C0FC]' : 'text-gray-400'
              } cursor-pointer hover:opacity-80`}
              onClick={handleLikeBtn}
            />
            <FontAwesomeIcon
              onClick={() => {
                setShowAddComment((prev) => !prev);
                setShowComments((prev) => !prev);
              }}
              icon={faComment}
              className="cursor-pointer hover:opacity-80 text-gray-400"
            />
          </div>
          {/* <div className="flex gap-2 items-center p-2"> */}
          <span className="text-gray-500">{0} comments</span>
          {/* <FontAwesomeIcon icon={faShare} style={{ color: '#74C0FC' }} /> */}
          {/* </div> */}
        </div>
        {/* comments */}
        <Comments
          showComments={showComments}
          showAddComment={showAddComment}
          post={post}
          setShowAddComment={setShowAddComment}
          setShowComments={setShowComments}
        />
      </div>
    </div>
  );
};

export default PostCard;
