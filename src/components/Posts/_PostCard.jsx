// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faComment,
  faEllipsis,
  faHeart,
  faShare,
} from '@fortawesome/free-solid-svg-icons';

// Utils
import { convertMilliseconds } from './../../utils/convertTime';

const PostCard = ({ post }) => {
  const { days, hours, minutes, seconds } = convertMilliseconds(
    Date.now() - new Date(post.createdAt)
  );
  return (
    <div className="p-5 shadow-md rounded-sm  my-5 bg-white ">
      <div className="flex justify-between p-3">
        <div className="flex gap-2">
          <img
            src="./imgs/man.jpg"
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
      <p className="px-3">
        {/* This was one of the most epic trips, that I have got myyslf involbed in
          egypt */}
        {post.description}
      </p>
      {/* imgs */}
      <div className="">
        <img src="./imgs/girl.jpg" className="object-contain aspect-square" />
      </div>
      {/* <div className="flex gap-2 p-3 w-full max-h-[80%] overflow-hidden">
        <img src="./imgs/girl.jpg" alt="" className="w-1/2 h-full" />
        <div className="flex flex-col gap-2">
          <img src="./imgs/man.jpg" alt="" className="w-full h-full" />
          <img src="./imgs/man.jpg" alt="" className="w-full h-full" />
        </div>
      </div> */}
      {/* info */}
      <div className="flex items-center gap-2">
        <span>1288</span>
        {/* likes */}
        <div className="relative flex">
          <img
            src="./imgs/man.jpg"
            height={15}
            width={20}
            className="rounded-full"
          />
          <img
            src="./imgs/man.jpg"
            height={15}
            width={20}
            className="rounded-full"
          />
          <img
            src="./imgs/man.jpg"
            height={15}
            width={20}
            className="rounded-full"
          />
        </div>
      </div>
      <div className="flex justify-between p-3">
        <div className="flex gap-2 items-center p-2">
          <FontAwesomeIcon icon={faHeart} style={{ color: '#74C0FC' }} />
          <FontAwesomeIcon icon={faComment} style={{ color: '#74C0FC' }} />
        </div>
        <div className="flex gap-2 items-center p-2">
          <span className="text-gray-500">20 commnets</span>
          <FontAwesomeIcon icon={faShare} style={{ color: '#74C0FC' }} />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
