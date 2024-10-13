// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGear,
  faHouse,
  faImage,
  faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { faRocketchat } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
      <ul className="w-[220px] m-5 shadow-xl rounded-md bg-white">
        <li className="group flex items-center gap-2 py-4 px-4 relative border-l-4 border-white transition-all cursor-pointer  hover:border-primary">
          <FontAwesomeIcon
            icon={faHouse}
            className="text-gray-500 group-hover:text-primary active:text-primary transition-all"
          />
          <Link to="/" className="font-medium hover:text-primary text-gray-500">
            Home
          </Link>
          <span className="absolute right-2 rounded-full text-sm w-4 h-4 flex justify-center items-center text-white bg-primary">
            2
          </span>
        </li>
        <li className="flex items-center gap-2 py-4 px-4 relative border-l-4 border-white transition-all cursor-pointer  cursor-pointer  hover:border-primary">
          <FontAwesomeIcon icon={faUsers} className="text-gray-500" />
          <span className="font-medium text-gray-500">Friends</span>
          <span className="absolute right-2 rounded-full text-sm w-4 h-4 flex justify-center items-center text-white bg-primary">
            2
          </span>
        </li>
        <li className="flex items-center gap-2 py-4 px-4 relative border-l-4 border-white transition-all cursor-pointer  hover:border-primary">
          <FontAwesomeIcon icon={faImage} className="text-gray-500" />
          <span className="font-medium text-gray-500">Photos</span>
          <span className="absolute right-2 rounded-full text-sm w-4 h-4 flex justify-center items-center text-white bg-primary">
            2
          </span>
        </li>
        <li>
          <Link
            to="/messenger"
            className="flex items-center gap-2 py-4 px-4 relative border-l-4 border-white transition-all cursor-pointer  hover:border-primary"
          >
            <FontAwesomeIcon icon={faRocketchat} className="text-gray-500" />
            <span className="font-medium text-gray-500">Messenger</span>
            <span className="absolute right-2 rounded-full text-sm w-4 h-4 flex justify-center items-center text-white bg-primary">
              2
            </span>
          </Link>
        </li>
        <li className="flex items-center gap-2 py-4 px-4 relative border-l-4 border-white transition-all cursor-pointer  hover:border-primary">
          <FontAwesomeIcon icon={faGear} className="text-gray-500" />
          <span className="font-medium text-gray-500">Settings</span>
          <span className="absolute right-2 rounded-full text-sm w-4 h-4 flex justify-center items-center text-white bg-primary">
            2
          </span>
        </li>
      </ul>
    </>
  );
};

export default Sidebar;
