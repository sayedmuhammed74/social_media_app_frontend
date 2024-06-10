// Components
import Story from './StoryCard';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchStories } from '../../redux/features/storiesSlice';

const Stories = () => {
  const { stories, status, error } = useSelector((state) => state.stories);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchStories());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'faild') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="text-sm flex justify-start gap-3 overflow-hidden py-3 shadow-md rounded-md mb-3 border-r-8 border-l-8 border-white bg-white">
      {/* Add Story */}
      <div className="relative overflow-hidden rounded-md h-[140px] min-w-[90px]">
        <img
          className="w-full h-full absolute top-0 left-0 hover:scale-105 transition-all"
          src="./imgs/story-cover.jpg"
          alt=""
        />
        <FontAwesomeIcon
          icon={faPlus}
          className=" absolute bottom-7 left-8 border-2 p-1 opacity-90 hover:opacity-100 rounded-full border-primary text-primary bg-white"
        />
        <span className="absolute bottom-1.5 left-4 text-center z-10 font-light text-white">
          Add Story
        </span>
      </div>
      {/* Stories */}
      {stories.map((story) => (
        <Story key={story._id} story={story} />
      ))}
    </div>
  );
};

export default Stories;
