// Icons
// import { faPaperclip } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
    if (media || description) {
      dispatch(createPost({ media, description }));
      dispatch(fetchPosts({ userId: '' }));
    }
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
          {/* <input
            type="file"
            placeholder=""
            className="text-lg font-light focus:outline-none text-slate-300 focus:text-slate-900"
            value={media[0]}
            onChange={(e) => setMedia([e.target.files[0]])}
          /> */}
        </div>
        <button
          className="px-3 h-8 rounded-md cursor-pointer hover:opacity-80 text-white bg-primary"
          type="submit"
        >
          {/* <FontAwesomeIcon icon={faPaperclip} /> */}
          share
        </button>
      </form>
    </>
  );
};

export default AddPost;
