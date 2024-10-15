import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updatePost } from '../../redux/features/posts/postThunks';

const UpdateCard = ({ post, setUpdate }) => {
  // Redux
  const dispatch = useDispatch();
  //   const { user } = useSelector((state) => state.user);
  const [description, setDescription] = useState(post?.description);

  const handleUpdatePost = () => {
    description && dispatch(updatePost({ description, id: post?._id }));
    setUpdate(false);
  };

  return (
    <>
      <div className="px-3 overflow-hidden my-5 flex flex-col gap-3">
        <textarea
          type="text"
          className="max-h-20 min-h-20 w-full bg-gray-100 p-3 flex justify-start items-start outline-none border"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          className="bg-blue-400 mx-auto mr-0 w-16 h-10 rounded-md font-medium text-white"
          onClick={handleUpdatePost}
        >
          save
        </button>
      </div>

      {/* post media */}
      {/* {post?.media?.length > 0 && (
        <div className="flex flex-1 justify-center my-2 h-[200px]">
          <img
            src={post?.media[0]}
            alt=""
            className="object-contain aspect-square rounded-sm"
          />
          </div>
          )} */}
    </>
  );
};

export default UpdateCard;
