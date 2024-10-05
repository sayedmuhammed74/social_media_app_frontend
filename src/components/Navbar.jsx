// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
// Actions
import { logout } from './../redux/features/userSlice';
// Icons
import logo from './../assets/imgs/logo.svg';
import searchIcon from './../assets/imgs/icons/magnifying-glass-solid.svg';
import DropListIcon from './../assets/imgs/icons/list-ul-solid.svg';
// Utils
import Cookies from 'js-cookie';
import { url } from './../url';
import { resetPosts } from '../redux/features/postsSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-regular-svg-icons';

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const searchListComponent = useRef(null);
  const dropList = useRef(null);
  const [showDropList, setShowDropList] = useState(false);
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetPosts());
    navigate('/login');
  };

  useEffect(() => {
    const fetchSearch = async () => {
      const token = `Bearer ${Cookies.get('jwt')}`;
      const res = await fetch(`${url}/api/v1/users?name=${search}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'Application/json',
          authorization: token,
        },
      });
      const json = await res.json();
      setUsers(json.data.users);
    };
    if (search) {
      fetchSearch();
    }
    return () => {};
  }, [search]);

  const searchResults = () => {
    if (users.length > 0 && search) {
      return (
        <ul
          className="flex flex-col absolute z-40 top-9 rounded-bl-md rounded-br-md bg-white w-[213px] cursor-pointer max-h-[500px] overflow-hidden"
          ref={searchListComponent}
        >
          {users?.map((user) => (
            <li
              className="p-3 hover:bg-gray-50"
              key={user._id}
              onClick={() => {
                setSearch('');
                setShowDropList(false);
              }}
            >
              <Link
                to={`/users/${user?.slug}`}
                className="flex items-center gap-2"
              >
                <img
                  src={user?.picture}
                  alt=""
                  className="h-8 w-8 rounded-full"
                />
                <span>
                  {user?.firstname} {user?.lastname}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <nav className="px-5 py-2 bg-gray-300">
      <div className="container mx-auto">
        <div className="container relative px-3 mx-auto flex justify-between">
          <div className="flex items-center gap-2">
            <img width={30} height={30} src={logo} alt="logo" />
            <Link to="/">
              <h1 className="font-medium text-xl text-primary">
                Space<span className="text-white">Park</span>
              </h1>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            {user && (
              <div className=" relative hidden md:flex items-center">
                <input
                  type="search"
                  placeholder="search"
                  className="pl-4 pr-8 py-1.5 rounded-tr-lg rounded-tl-lg bg-gray-50 hover:bg-white focus:outline-none"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <img
                  src={searchIcon}
                  alt=""
                  width={20}
                  height={20}
                  className="absolute right-2"
                />
                {searchResults()}
              </div>
            )}
            <div className="relative flex items-center">
              <FontAwesomeIcon
                icon={faBell}
                className=" cursor-pointer hover:opacity-70 font-bold text-2xl text-blue-400"
              />
              <span className="absolute -top-2.5 -right-2 text-red-500">2</span>
            </div>
            {/* DropList */}
            {user && (
              <>
                <img
                  src={DropListIcon}
                  className="cursor-pointer hover:scale-105 transition-all flex md:hidden"
                  alt=""
                  width={30}
                  height={30}
                  onClick={() => setShowDropList((prev) => !prev)}
                />
                <ul
                  ref={dropList}
                  className={`${
                    showDropList ? 'flex' : 'hidden'
                  } absolute z-10 p-3 transition-all text-slate-800 top-[42px] right-0 w-full font-medium bg-gray-100 md:hidden flex-col gap-5 justify-center items-center`}
                >
                  <li>
                    <Link
                      className="flex gap-2 items-center"
                      to={`/profile/${user.slug}`}
                      onClick={() => setShowDropList(false)}
                    >
                      <img
                        src={user?.picture}
                        alt={user.slug}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li onClick={() => setShowDropList(false)}>Home</li>
                  <li onClick={() => setShowDropList(false)}>Friends</li>
                  <li onClick={() => setShowDropList(false)}>
                    <button onClick={handleLogout}>Logout</button>
                  </li>
                  <i>
                    <div className="relative md:hidden items-center z-40">
                      <input
                        type="search"
                        placeholder="search"
                        className="pl-4 pr-8 py-1.5 rounded-tr-lg rounded-tl-lg bg-gray-50 hover:bg-white focus:outline-none"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                      />
                      <img
                        src={searchIcon}
                        alt=""
                        width={20}
                        height={20}
                        className="absolute right-2"
                      />
                      {searchResults()}
                    </div>
                  </i>
                </ul>
              </>
            )}
            {user && (
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-lg text-white bg-primary hidden md:flex"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
