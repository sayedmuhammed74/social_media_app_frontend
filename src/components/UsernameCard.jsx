import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UsernameCard = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="flex gap-5 items-center rounded-md w-[220px] p-3 shadow-xl mx-5 bg-white">
        <Link to={`/profile/${user?.slug}`}>
          <div className="rounded-xl overflow-hidden">
            <img
              src={user?.picture}
              alt={user?.firstname}
              width={35}
              height={35}
            />
          </div>
        </Link>
        <div className="flex flex-col justify-center gap-1 text-slate-900">
          <Link to={`/profile/${user?.slug}`}>
            <h2 className="font-medium hover:opacity-90 hover:scale-95 transition-all duration-100">
              {user?.firstname} {user?.lastname}
            </h2>
          </Link>
          <span className="font-light">
            @{user?.firstname}
            {user?.lastname}
          </span>
        </div>
      </div>
    </>
  );
};
export default UsernameCard;
