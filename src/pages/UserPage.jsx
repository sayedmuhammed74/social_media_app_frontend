import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Utils
import { url } from './../url';
import { addNotification, getAPIData } from '../utils/APIFunctions';
// Actions
import {
  acceptRequest,
  cancelRequest,
  createRequest,
} from '../redux/features/requests/requestThunks';
// Components
import UserPosts from '../components/Posts/UserPosts';

const ProfilePage = () => {
  // Redux
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);

  // States
  const { slug } = useParams();
  const [showBtn, setShowBtn] = useState(false);
  const [user, setUser] = useState(undefined);
  const [request, setRequest] = useState({});

  // Fetch User
  useEffect(() => {
    slug &&
      getAPIData(`/api/v1/users/${slug}`)
        .then((res) => setUser(res.data.user))
        .catch((err) => console.log(err));
    return () => {};
  }, [slug]);

  // Fetch FriendShip
  useEffect(() => {
    user &&
      getAPIData(`/api/v1/users/requests/${user?._id}`)
        .then((res) => setRequest(res.data.request))
        .catch((err) => console.log(err));
    return () => {};
  }, [user]);

  // Add Friend
  const handleAddFriend = () => {
    dispatch(createRequest({ reciever: user?._id }));
    // Handle Notification
    addNotification(
      request?.to._id,
      'friend_request',
      request?._id,
      'Request',
      socket
    );
    setTimeout(() => {
      getAPIData(`/api/v1/users/requests/${user?._id}`)
        .then((res) => setRequest(res.data.request))
        .catch((err) => console.log(err));
    }, 1000);
  };

  // Unfriend
  const handleUnfriend = () => {
    dispatch(cancelRequest({ id: request?._id }));
    setShowBtn(false);
    setRequest({});
  };

  // Accept Friend
  const handleAcceptRequest = () => {
    dispatch(acceptRequest({ id: request?._id }));
    setRequest((prev) => ({ ...prev, status: 'accepted' }));
  };

  return (
    <section className="my-5">
      <div className="container w-[90%] mx-auto p-5 shadow-md rounded-md bg-white">
        <div className="h-[300px]">
          <img
            className="h-full object-cover w-full"
            src={user?.cover}
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
            <span className="ml-2">{user?.bio}</span>
            <div className="flex flex-col sm:flex-row gap-3 my-2 font-medium text-lg">
              {/* Friends Already */}
              {request?.status === 'accepted' && (
                <div className="relative flex flex-col divide-y">
                  <button
                    className={`w-[65%] sm:w-28 py-1 rounded-sm hover:opacity-95 hover:scale-95 transition-all duration-75 bg-gray-400 text-slate-800`}
                    onClick={() => setShowBtn((prev) => !prev)}
                  >
                    Friends
                  </button>
                  {/* unfriend */}
                  <button
                    onClick={handleUnfriend}
                    className={`w-[65%] sm:w-auto ${
                      showBtn ? 'inline' : 'hidden'
                    } absolute top-8 left-0 w-28 py-1 rounded-sm hover:opacity-95 hover:scale-95 transition-all duration-75 bg-gray-400 text-slate-800`}
                  >
                    Unfriend
                  </button>
                </div>
              )}
              {/* Add Friend */}
              {!request?.status && (
                <button
                  className="w-[65%] sm:w-auto px-4 py-1 rounded-sm hover:opacity-95 hover:scale-95 transition-all duration-75 bg-gray-400 text-slate-800"
                  onClick={handleAddFriend}
                >
                  Add Friend
                </button>
              )}
              {/* Cancel Request from another*/}
              {request?.status === 'pending' && request?.to === user?._id && (
                <button
                  className="w-[65%] sm:w-auto px-4 py-1 rounded-sm hover:opacity-95 hover:scale-95 transition-all duration-75 bg-gray-400 text-slate-800"
                  onClick={handleUnfriend}
                >
                  Cancel
                </button>
              )}
              {/* Accept Request */}
              {request?.status === 'pending' && request?.from === user?._id && (
                <button
                  className="w-[65%] sm:w-auto px-4 py-1 rounded-sm hover:opacity-95 hover:scale-95 transition-all duration-75 bg-gray-400 text-slate-800"
                  onClick={handleAcceptRequest}
                >
                  Accept
                </button>
              )}

              <button className="w-[65%] sm:w-auto px-4 py-1 rounded-sm hover:opacity-95 hover:scale-95 transition-all duration-75 bg-gray-400 text-slate-800">
                Message
              </button>
              <button
                onClick={() =>
                  navigator.clipboard.writeText(url + '/users/' + user?.slug)
                }
                className="w-[65%] sm:w-auto flex justify-center px-2 py-1 rounded-sm items-center gap-2 hover:opacity-95 hover:scale-95 transition-all duration-75 text-white bg-primary"
              >
                {/* <FontAwesomeIcon icon={faShare} style={{ color: 'white' }} /> */}
                Share Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container w-[90%] mt-5 mx-auto p-5 shadow-md rounded-md bg-white">
        <UserPosts userId={user?._id} />
      </div>
    </section>
  );
};

export default ProfilePage;
