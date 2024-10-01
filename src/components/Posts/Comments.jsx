// Hooks
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Utils
import axios from 'axios';
import Cookies from 'js-cookie';
import { url } from '../../url';
// Actions
import { addComment } from '../../redux/features/postsSlice';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Comments = ({
  showComments,
  showAddComment,
  post,
  setShowAddComment,
  setShowComments,
}) => {
  const { user } = useSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputComment, setInputComment] = useState('');
  const dipatch = useDispatch();

  // Add Comment
  const handleAddComment = (e) => {
    if (e.key === 'Enter' && inputComment && !isSubmitting) {
      setIsSubmitting(true);
      axios
        .post(
          `${url}/api/v1/posts/${post?._id}/comments`,
          {
            content: inputComment,
          },
          {
            headers: {
              authorization: `Bearer ${Cookies.get('jwt')}`,
            },
          }
        )
        .then((res) => {
          let comment = res.data.data.comment;
          comment.user = user;
          dipatch(addComment({ comment, postId: post?.id }));
          setInputComment('');
        })
        .catch((err) => console.log(err))
        .finally(() => setIsSubmitting(false));
    }
  };

  return (
    <div className="p-3 rounded-md bg-gray-100">
      <input
        type="text"
        placeholder="comment..."
        className={`${
          showAddComment ? 'block' : 'hidden'
        } w-full px-3 py-2 rounded-md bg-white border border-white focus:border-slate-400 transition-all duration-75`}
        onKeyDown={handleAddComment}
        value={inputComment}
        onChange={(e) => setInputComment(e.target.value)}
      />
      <ul className="flex flex-col gap-1 w-full p-3">
        {showComments &&
          post?.comments?.map((comment) => (
            <li
              className="flex items-center gap-3 rounded-md w-fit py-1 px-3 bg-gray-200"
              key={comment?._id}
            >
              <img
                alt=""
                src={comment?.user?.picture}
                className="w-6 h-6 rounded-full"
              />
              <span>{comment?.content}</span>
              <FontAwesomeIcon
                icon={faHeart}
                className="text-gray-400"
                // style={{ color: '#74C0FC' }}
              />
              <span>
                {comment?.likes?.length ? comment?.likes?.length : ''}
              </span>
            </li>
          ))}
      </ul>
      {post?.comments?.length > 0 ? (
        <div
          onClick={() => {
            setShowComments((prev) => !prev);
            setShowAddComment((prev) => !prev);
          }}
          className="text-center my-1 text-gray-500 hover:opacity-70 cursor-pointer"
        >
          {showComments ? 'hide' : 'show'} comments
        </div>
      ) : (
        <div className="text-center my-1 text-gray-500 hover:opacity-70 cursor-pointer">
          no comments
        </div>
      )}
    </div>
  );
};

export default Comments;
