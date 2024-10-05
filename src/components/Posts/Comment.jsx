// Hooks
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Icons
import { faEllipsis, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Utils
import axios from 'axios';
import { url } from '../../url';
import Cookies from 'js-cookie';
// Actions
import { deleteComment, editCommment } from '../../redux/features/postsSlice';

const Comment = ({ comment, postId }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [commentOptionsList, setCommentOptionsList] = useState(false);
  const [commentEditInput, setCommentEditInput] = useState(false);
  const [editInput, setEditInput] = useState(comment?.content);

  //   Delete Comment
  const handleDeleteComment = (commentId) => {
    axios
      .delete(`${url}/api/v1/posts/${postId}/comments/${commentId}`, {
        headers: {
          authorization: `Bearer ${Cookies.get('jwt')}`,
        },
      })
      .then(() => dispatch(deleteComment({ postId, commentId })))
      .catch((err) => console.log(err))
      .finally(() => setCommentOptionsList(false));
  };

  // Edit Comment
  const handleEditComment = () => {
    axios
      .patch(
        `${url}/api/v1/posts/${postId}/comments/${comment?._id}`,
        { content: editInput },
        {
          headers: {
            authorization: `Bearer ${Cookies.get('jwt')}`,
          },
        }
      )
      .then(() =>
        dispatch(
          editCommment({ postId, commentId: comment?._id, content: editInput })
        )
      )
      .catch((err) => console.log(err))
      .finally(() => setCommentEditInput(false));
  };

  //   Handle Edit Icon Click
  const handleEditIconClick = () => {
    setCommentOptionsList(false);
    setCommentEditInput(true);
  };

  return (
    <li
      className="relative flex items-center gap-3 rounded-md w-fit py-1 px-3 bg-gray-200"
      key={comment?._id}
    >
      <img
        alt=""
        src={comment?.user?.picture}
        className="w-6 h-6 rounded-full"
      />
      {!commentEditInput && (
        <>
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
            } absolute z-10 w-fit right-3 top-7 flex-col gap-1 rounded-sm rounded-b-lg shadow-sm divide-x bg-gray-100 select-none`}
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
                  onClick={handleEditIconClick}
                  className="py-1.5 px-2 text-sm text-gray-600 cursor-pointer hover:bg-gray-300 hover:text-white"
                >
                  Edit Comment
                </li>
              </>
            )}
          </ul>
          <span>{comment?.likes?.length ? comment?.likes?.length : ''}</span>
        </>
      )}
      {commentEditInput && (
        <>
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
            className="px-1 py-[1px] rounded-md"
          />
          <button
            onClick={handleEditComment}
            className="px-1 py-[2px] text-sm rounded-md bg-blue-400 text-white"
          >
            update
          </button>
        </>
      )}
    </li>
  );
};

export default Comment;
