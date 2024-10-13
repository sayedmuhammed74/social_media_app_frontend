// Hooks
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Utils
import { url } from '../../url';
// Components
import Comment from './Comment';
// Actions
import { addComment } from '../../redux/features/posts/postSlice';
import { postAPIData } from '../../utils/APIFunctions';

const Comments = ({ showComments, post, setShowComments }) => {
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [inputComment, setInputComment] = useState('');

  // Add Comment
  const handleAddComment = (e) => {
    if (e.key === 'Enter' && inputComment && !isSubmitting) {
      setIsSubmitting(true);
      postAPIData(`${url}/api/v1/posts/${post?._id}/comments`, {
        content: inputComment,
      })
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
            <Comment key={comment?._id} comment={comment} postId={post?._id} />
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
