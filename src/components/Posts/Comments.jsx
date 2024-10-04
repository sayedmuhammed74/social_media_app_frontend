// Hooks
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Utils
import axios from 'axios';
import Cookies from 'js-cookie';
import { url } from '../../url';
// Actions
import { addComment, deleteCommment } from '../../redux/features/postsSlice';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faHeart } from '@fortawesome/free-solid-svg-icons';

const Comments = ({ showComments, post, setShowComments }) => {
  const { user } = useSelector((state) => state.user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputComment, setInputComment] = useState('');
  const [commentOptionsList, setCommentOptionsList] = useState(false);
  const dispatch = useDispatch();

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
          dispatch(addComment({ comment, postId: post?.id }));
          setInputComment('');
        })
        .catch((err) => console.log(err))
        .finally(() => setIsSubmitting(false));
    }
  };

  const handleDeleteComment = (commentId) => {
    axios
      .delete(`${url}/api/v1/posts/${post._id}/comments/${commentId}`, {
        headers: {
          authorization: `Bearer ${Cookies.get('jwt')}`,
        },
      })
      .then(() => dispatch(deleteCommment({ postId: post?._id, commentId })))
      .catch((err) => console.log(err))
      .finally(() => setCommentOptionsList(false));
  };

  // const handleEditComment = () => {
  //   axios
  //     .delete(`${url}/api/v1/posts/${post._id}`, {
  //       headers: {
  //         authorization: `Bearer ${Cookies.get('jwt')}`,
  //       },
  //     })
  //     .then(() => dispatch(deletePost(post?._id)))
  //     .catch((err) => console.log(err))
  //     .finally(() => setPostOptionsList(false));
  // };

  return (
    <div className={`${showComments ? 'p-3' : 'pb-3'} rounded-md bg-gray-100`}>
      {/* add comment */}
      <input
        type="text"
        placeholder="comment..."
        className={`${
          showComments ? 'block' : 'hidden'
        } w-full px-3 py-2 rounded-md bg-white border border-white focus:border-slate-400 transition-all duration-75`}
        onKeyDown={handleAddComment}
        value={inputComment}
        onChange={(e) => setInputComment(e.target.value)}
      />
      {/* comments list */}
      <ul className="flex flex-col gap-1 w-full px-3 pt-3">
        {showComments &&
          post?.comments?.map((comment) => (
            <li
              className="relative flex items-center gap-3 rounded-md w-fit py-1 px-3 bg-gray-200"
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
              <FontAwesomeIcon
                icon={faEllipsis}
                className="cursor-pointer hover:opacity-50"
                onClick={() => setCommentOptionsList((prev) => !prev)}
              />
              <ul
                className={`${
                  commentOptionsList ? 'flex' : 'hidden'
                } absolute w-fit right-3 top-7 flex-col gap-1 rounded-sm rounded-b-lg shadow-sm divide-x bg-gray-100 select-none`}
              >
                {user?._id === comment?.user?._id && (
                  <>
                    <li
                      onClick={() => handleDeleteComment(comment?._id)}
                      className="py-1.5 px-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-300 hover:text-white"
                    >
                      Delete Comment
                    </li>
                    <li
                      onClick={() => setCommentOptionsList(false)}
                      className="py-1.5 px-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-300 hover:text-white"
                    >
                      Edit Comment
                    </li>
                  </>
                )}
              </ul>
              <span>
                {comment?.likes?.length ? comment?.likes?.length : ''}
              </span>
            </li>
          ))}
      </ul>
      {/* show comments button */}
      {post?.comments?.length > 0 ? (
        <div
          onClick={() => {
            setShowComments((prev) => !prev);
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
