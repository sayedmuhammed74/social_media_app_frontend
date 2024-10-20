import { useEffect, useState } from 'react';
import { createStory } from '../../redux/features/stories/storyThunks';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose, faPalette } from '@fortawesome/free-solid-svg-icons';

const CreateStory = ({ setShowStoryPage }) => {
  // Redux
  const dispatch = useDispatch();

  // States
  const [image, setImage] = useState('');
  const [imageSrc, setImageSrc] = useState('');
  const [text, setText] = useState('');
  const [showTextStory, setShowTextStory] = useState(false);
  const [storyBackground, setStoryBackground] = useState();

  const handleAddStory = () => {
    if (text) {
      dispatch(
        createStory({ text, type: 'text', background: storyBackground })
      );
      setShowStoryPage(false);
    }
  };

  const handleBackgroundChange = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const randomColor = `rgb(${r}, ${g}, ${b})`;
    setStoryBackground(randomColor);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Set the image source to the file data URL
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  useEffect(() => handleBackgroundChange(), []);

  return (
    <div className="fixed top-0 left-0 z-50 h-full w-full flex justify-center items-center bg-gray-100 bg-opacity-70">
      <FontAwesomeIcon
        icon={faClose}
        className="absolute right-3 top-3 text-2xl cursor-pointer text-gray-600 hover:opacity-70"
        onClick={() => setShowStoryPage(false)}
      />
      <div className="relative z-10 w-[90%] md:w-[400px] h-[400px] p-5 flex flex-col items-center justify-center gap-4 shadow-md rounded-lg bg-white">
        {/* Text Story */}
        {showTextStory && (
          <div
            className="relative w-[200px] h-[400px] p-2 flex justify-center items-center rounded-md"
            style={{ backgroundColor: storyBackground }}
          >
            <FontAwesomeIcon
              icon={faClose}
              className="absolute right-4 top-4 text-lg text-gray-400 cursor-pointer hover:opacity-80 select-none"
              onClick={() => setShowTextStory(false)}
            />
            <input
              type="text"
              className="bg-transparent text-center text-white"
              placeholder="write"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faPalette}
              className="absolute right-4 bottom-4 text-lg text-white cursor-pointer hover:opacity-80 select-none"
              onClick={handleBackgroundChange}
            />
          </div>
        )}

        {/* BUTTONS */}
        {!showTextStory && !image && (
          <>
            <button
              className="w-[60%] py-1 cursor-pointer rounded-md bg-gray-400 text-white"
              onClick={() => setShowTextStory(true)}
            >
              Text
            </button>
            <div className="relative overflow-hidden rounded-md w-[60%] cursor-pointer bg-green-400">
              <input
                type="file"
                onChange={handleImageChange} // Use files[0] to get the file object
                className="absolute top-0 left-0 z-20 h-full w-full opacity-0 cursor-pointer"
              />
              <button className="w-full py-1 font-medium rounded-md bg-blue-400 text-white cursor-pointer">
                Image
              </button>
            </div>
          </>
        )}
        {image && (
          <div className="relative h-[400px] bg-gray-100 rounded-md overflow-hidden p-5">
            <img
              src={imageSrc}
              alt=""
              className="object-contain aspect-square rounded-md"
            />
            <FontAwesomeIcon
              icon={faClose}
              className="absolute right-1.5 top-1.5 text-lg text-gray-400 cursor-pointer hover:opacity-80 select-none"
              onClick={() => {
                setImage('');
                setImageSrc('');
              }}
            />
          </div>
        )}
        {(showTextStory || image) && (
          <button
            onClick={handleAddStory}
            className="px-6 py-2 rounded-md text-white bg-primary"
          >
            Add Story
          </button>
        )}
      </div>
    </div>
  );
};

export default CreateStory;
