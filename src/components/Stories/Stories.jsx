// Components
import Story from './StoryCard';
import CreateStory from './CreateStory';
// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
// Actions
import { fetchStories } from '../../redux/features/stories/storyThunks';
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper-bundle.css';

const Stories = () => {
  // Redux
  const dispatch = useDispatch();
  const { stories } = useSelector((state) => state.stories);
  const { user } = useSelector((state) => state.user);

  // States
  const [showStoryPage, setShowStoryPage] = useState(false);

  // Fetch Stories
  useEffect(() => {
    dispatch(fetchStories());
    return () => {};
  }, [dispatch]);

  return (
    <>
      {showStoryPage && <CreateStory setShowStoryPage={setShowStoryPage} />}

      <div className="text-sm flex gap-3 h-[180px] overflow-hidden py-3 shadow-md rounded-md mb-3 border-r-8 border-l-8 border-white bg-white">
        {/* Stories */}
        <Swiper
          spaceBetween={3}
          slidesPerView={6} // Adjust how many stories are visible
          grabCursor={true} // Change cursor to grab
          breakpoints={{
            0: {
              slidesPerView: 4, // Show 3 slides on smaller screens
              spaceBetween: 10, // Less space between slides for smaller screens
            },
            640: {
              slidesPerView: 5, // Show 3 slides on smaller screens
              spaceBetween: 10, // Less space between slides for smaller screens
            },
            768: {
              slidesPerView: 6, // Adjust to show 4 slides on tablets
              spaceBetween: 6, // Same space as default
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 6,
            },
          }}
          className="w-full"
        >
          {/* Add Story Part */}
          <SwiperSlide>
            <div className="relative overflow-hidden rounded-md w-full h-full bg-gray-500">
              <img
                className="w-full h-4/5 absolute top-0 left-0 hover:scale-105 transition-all"
                src={user?.picture}
                alt=""
              />
              <FontAwesomeIcon
                icon={faPlus}
                className="absolute top-[75%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-2 p-1 opacity-90 hover:opacity-75 cursor-pointer rounded-full border-primary text-primary bg-white"
                onClick={() => setShowStoryPage(true)}
              />
              <div className="w-full absolute bottom-1.5 text-center z-10 font-light text-white">
                Add Story
              </div>
            </div>
          </SwiperSlide>

          {stories.map((story) => (
            <SwiperSlide key={story._id} className="overflow-hidden rounded-md">
              <Story story={story} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default Stories;
