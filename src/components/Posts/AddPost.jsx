// Hooks
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { createPost } from '../../redux/features/posts/postThunks';

const AddPost = () => {
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // States
  const [description, setDescription] = useState('');
  const [media] = useState([]);

  // Create Post
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (media || description) {
      dispatch(createPost({ media, description }));
    }
  };

  return (
    <form
      onSubmit={handleCreatePost}
      className="flex justify-between p-5 bg-white"
    >
      <div className="flex gap-2">
        <img
          src={user?.picture}
          alt={user?.firstname}
          width={40}
          height={40}
          className="rounded-md"
        />
        <input
          type="text"
          name="post"
          placeholder="What's New ?"
          className="text-lg font-light focus:outline-none text-slate-300 focus:text-slate-900"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* <input
            type="file"
            name="media"
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
        share
      </button>
    </form>
  );
};

export default AddPost;
