import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './../redux/features/userSlice';
import logo from './../assets/imgs/logo.svg';
import Cookies from 'js-cookie';
import picture from './../assets/imgs/man.jpg';
import searchIcon from './../assets/imgs/icons/magnifying-glass-solid.svg';
import { useEffect, useRef, useState } from 'react';
import { url } from './../url';

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const searchListComponent = useRef(null);
  const dropList = useRef(null);
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleDropList = () => {
    dropList.current.classList.toggle('hidden');
    dropList.current.classList.toggle('flex');
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
              onClick={() => setSearch('')}
            >
              <Link
                to={`/users/${user?.slug}`}
                className="flex items-center gap-2"
              >
                <img src={picture} alt="" className="h-8 w-8 rounded-full" />
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
            {/* DropList */}
            {user && (
              <>
                <img
                  src="./imgs/icons/list-ul-solid.svg"
                  className="cursor-pointer hover:scale-105 transition-all flex md:hidden"
                  alt=""
                  width={30}
                  height={30}
                  onClick={handleDropList}
                />
                <ul
                  ref={dropList}
                  className=" absolute z-10 p-3 transition-all text-slate-800 top-[42px] right-0 w-full font-medium bg-gray-100 hidden md:hidden flex-col gap-5 justify-center items-center"
                >
                  <li>
                    <Link
                      className="flex gap-2 items-center"
                      to={`/profile/${user.slug}`}
                    >
                      <img
                        src={picture}
                        alt={user.slug}
                        className="w-8 h-8 rounded-full"
                      />
                      <span>Profile</span>
                    </Link>
                  </li>
                  <li>Home</li>
                  <li>Friends</li>
                  <li>
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
