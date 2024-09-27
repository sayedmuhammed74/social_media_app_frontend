// Icons
import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Hooks
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, fetchPosts } from './../../redux/features/postsSlice';

const AddPost = () => {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [media] = useState([]);
  const { user } = useSelector((state) => state.user);

  const handleCreatePost = () => {
    dispatch(createPost({ media, description }));
    dispatch(fetchPosts({ userId: '' }));
  };

  return (
    <>
      <form
        onSubmit={handleCreatePost}
        className="flex justify-between p-5 bg-white"
      >
        <div className="flex gap-2">
          <img
            src={user?.picture}
            alt=""
            width={40}
            height={40}
            className="rounded-md"
          />
          <input
            type="text"
            placeholder="What's New ?"
            className="text-lg font-light focus:outline-none text-slate-300 focus:text-slate-900"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className="flex items-center gap-2 px-2 rounded-md cursor-pointer text-white bg-primary"
          type="submit"
        >
          <FontAwesomeIcon icon={faPaperclip} />
          <span>Post it</span>
        </button>
      </form>
    </>
  );
};

export default AddPost;
