import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import Posts from './../components/Posts/Posts';
import { url } from '../url';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <section className="my-5">
        <div className="container w-[90%] mx-auto p-5 shadow-md rounded-md bg-white">
          <div className="h-[300px]">
            <img
              className="h-full object-cover w-full"
              src="./../../imgs/profile-cover.jpg"
              alt={user?.slug}
            />
          </div>
          <div className="relative min-h-[140px] px-5">
            <div className="absolute -top-20 border-4 border-white rounded-full overflow-hidden w-[200px] h-[200px]">
              <img
                className="h-full aspect-square w-full"
                src={user?.picture}
                alt={user?.slug}
              />
            </div>
          </div>
          {/* user info */}
          <div>
            <div className="container mx-auto px-8 flex flex-col text-gray-500">
              <h2 className="font-bold text-2xl mb-2 text-slate-800">
                {user?.firstname} {user?.lastname}
              </h2>
              <span className="ml-2">Cairo, Egypt</span>
              <span className="ml-2">@{user?.slug}</span>
              <div className="flex gap-3 my-2 font-medium text-lg">
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      url + '/profile/' + user?.slug
                    )
                  }
                  className="flex px-5 rounded-sm items-center gap-2 hover:opacity-95 hover:scale-95 transition-all duration-75 text-white bg-primary"
                >
                  <FontAwesomeIcon icon={faShare} style={{ color: 'white' }} />
                  Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="container w-[90%] mt-5 mx-auto p-5 shadow-md rounded-md bg-white">
          <Posts userId={user?._id} />
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
