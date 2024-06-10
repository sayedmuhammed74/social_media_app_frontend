import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faEllipsis,
  faHeart,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { convertMilliseconds } from './../../utils/convertTime';

const PostCard = ({ post }) => {
  const { days, hours, minutes, seconds } = convertMilliseconds(
    Date.now() - new Date(post.createdAt)
  );

  const [showMoreText, setShowMoreText] = useState(false);
  const [showMoreImages, setShowMoreImages] = useState(false);

  const toggleText = () => setShowMoreText(!showMoreText);
  const toggleImages = () => setShowMoreImages(!showMoreImages);

  return (
    <div className="p-5 shadow-md rounded-sm my-5 bg-white">
      <div className="flex justify-between p-3">
        <div className="flex gap-2">
          <img
            src={post.user.picture} // Assuming profilePicture is the property for user's profile picture
            className="rounded-md"
            width={30}
            height={30}
            alt=""
          />
          <div className="flex flex-col items-stretch">
            <span className="text-sm font-medium text-slate-800">
              {post.user.firstname} {post.user.lastname}
            </span>
            <span className="flex gap-1 font-extralight text-gray-400">
              {seconds > 0 && <span>{seconds}s</span>}
              {minutes > 0 && <span>{minutes}m</span>}
              {hours > 0 && <span>{hours}h</span>}
              {days > 0 && <span>{days}d</span>}
            </span>
          </div>
        </div>
        <FontAwesomeIcon icon={faEllipsis} className="cursor-pointer" />
      </div>
      <div className="px-3 overflow-hidden">
        <p className={showMoreText ? '' : 'line-clamp-3'}>{post.description}</p>
        {post.description.length > 100 && (
          <span className="text-blue-500 cursor-pointer" onClick={toggleText}>
            {showMoreText ? ' Show less' : ' Read more'}
          </span>
        )}
      </div>
      <div className="flex gap-2 p-3">
        {post.media
          .slice(0, showMoreImages ? undefined : 2)
          .map((media, index) => (
            <img
              key={index}
              src={media}
              alt={`Media ${index}`}
              className="w-1/2 h-20 object-cover rounded-sm"
            />
          ))}
        {post.media.length > 2 && (
          <span
            className="text-blue-500 cursor-pointer self-end"
            onClick={toggleImages}
          >
            {showMoreImages ? 'Show less' : 'Show more'}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <span>{post.totalLikes}</span>
        <div className="relative flex">
          {[...Array(3)].map((_, index) => (
            <img
              key={index}
              src="./imgs/man.jpg" // Replace with actual user images or profile pictures
              height={15}
              width={20}
              className="rounded-full"
              alt={`User ${index}`}
            />
          ))}
        </div>
      </div>
      <div className="flex justify-between p-3">
        <div className="flex gap-2 items-center p-2">
          <FontAwesomeIcon icon={faHeart} style={{ color: '#74C0FC' }} />
          <FontAwesomeIcon icon={faComment} style={{ color: '#74C0FC' }} />
        </div>
        <div className="flex gap-2 items-center p-2">
          <span className="text-gray-500">{post.totalComments} comments</span>
          <FontAwesomeIcon icon={faShare} style={{ color: '#74C0FC' }} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
