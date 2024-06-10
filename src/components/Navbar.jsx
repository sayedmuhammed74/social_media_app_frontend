import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from './../redux/features/userSlice';
const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };
  return (
    <nav className="px-5 py-2 bg-gray-300 mb-3">
      <div className="container px-3 mx-auto flex justify-between">
        <div className="flex items-center gap-2">
          <img width={30} height={30} src="./imgs/logo.svg" alt="logo" />
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
                className="rounded-xl bg-gray-50 hover:bg-white focus:border-b-2"
              />
              <img
                src="./imgs/icons/magnifying-glass-solid.svg"
                alt=""
                width={20}
                height={20}
                className="absolute right-2"
              />
            </div>
          )}
          {/* {user && (
            <button className="px-3.5 py-1.5 rounded-lg text-white bg-primary hidden md:flex">
              <span>Create</span>
            </button>
          )} */}
          {/* {user && (
            <img
              src={user?.picture ? user?.picture : './imgs/users/no-user.svg'}
              width={30}
              height={30}
              alt={user ? user?.firstname : ''}
              className="rounded-full"
            />
          )} */}
          {user && (
            <img
              src="./imgs/icons/list-ul-solid.svg"
              className="cursor-pointer hover:scale-105 transition-all flex md:hidden"
              alt=""
              width={30}
              height={30}
            />
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
    </nav>
  );
};

export default Navbar;
