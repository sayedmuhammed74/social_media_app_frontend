// Components
import Story from './StoryCard';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
// Actions
import {
  createStory,
  fetchStories,
} from '../../redux/features/stories/storyThunks';

const Stories = () => {
  // Redux
  const dispatch = useDispatch();
  const { stories, error } = useSelector((state) => state.stories);

  // States
  const [image, setImage] = useState('');
  const [text, setText] = useState('');
  const addStoryBox = useRef(null);

  const handleAddStoryBox = () => {
    addStoryBox.current.classList.remove('hidden');
    addStoryBox.current.classList.add('flex');
  };

  const handleAddStory = () => {
    if (image || text) {
      dispatch(createStory({ image, text }));
      setTimeout(() => {
        if (!error) {
          addStoryBox.current.classList.add('hidden');
          addStoryBox.current.classList.remove('flex');
        }
      }, 500);
    }
  };

  // Fetch Stories
  useEffect(() => {
    dispatch(fetchStories());
    return () => {};
  }, [dispatch]);

  return (
    <>
      <div
        className="gap-4 items-center justify-center flex-col absolute z-50 h-[350px] w-[400px] p-3 bg-white shadow rounded-md opacity-70 hidden"
        ref={addStoryBox}
      >
        <div>
          <input
            className="p-2 shadow focus:outline-none bg-gray-100"
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div className="flex gap-2 justify-center items-center">
          <input
            type="file"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button
          onClick={handleAddStory}
          className="px-3 py-2 rounded-sm font-medium text-white bg-primary"
        >
          Add Story
        </button>
      </div>
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
            className=" absolute bottom-7 left-8 border-2 p-1 opacity-90 hover:opacity-75 cursor-pointer rounded-full border-primary text-primary bg-white"
            onClick={handleAddStoryBox}
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
    </>
  );
};

export default Stories;
