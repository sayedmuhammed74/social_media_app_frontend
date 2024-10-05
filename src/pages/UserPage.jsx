import { faShare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Posts from './../components/Posts/Posts';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { url } from './../url';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  acceptRequest,
  cancelRequest,
  createRequest,
} from '../redux/features/requestsSlice';

const ProfilePage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [showBtn, setShowBtn] = useState(false);
  const [user, setUser] = useState(undefined);
  const [request, setRequest] = useState({});

  // Fetch User
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = `Bearer ${Cookies.get('jwt')}`;
        const res = await fetch(`${url}/api/v1/users/${slug}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'Application/json',
            authorization: token,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error ${res.status}`);
        }

        const json = await res.json();
        setUser(json?.data.user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
    slug && fetchUser();
    return () => {};
  }, [slug]);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`${url}/api/v1/users/requests/${user?._id}`, {
        headers: { authorization: `Bearer ${Cookies.get('jwt')}` },
      })
      .then((res) => setRequest(res.data.data.request))
      .catch((err) => console.log(err));
    return () => {};
  }, [user]);

  const handleUnfriend = () => {
    dispatch(cancelRequest({ id: request?._id }));
    setShowBtn(false);
    setRequest({});
  };

  const handleAddFriend = () => {
    dispatch(createRequest({ reciever: user?._id }));
    axios
      .get(`${url}/api/v1/users/requests/${user?._id}`, {
        headers: { authorization: `Bearer ${Cookies.get('jwt')}` },
      })
      .then((res) => setRequest(res.data.data.request))
      .catch((err) => console.log(err));
  };

  const handleAcceptRequest = () => {
    dispatch(acceptRequest({ id: request?._id }));
    axios
      .get(`${url}/api/v1/users/requests/${user?._id}`, {
        headers: { authorization: `Bearer ${Cookies.get('jwt')}` },
      })
      .then((res) => setRequest(res.data.data.request))
      .catch((err) => console.log(err));
  };

  return (
    <>
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
                {request?.status === 'accepted' && (
                  <div className="relative flex flex-col divide-y">
                    <button
                      className={`w-[65%] sm:w-28 py-1 rounded-sm hover:opacity-95 hover:scale-95 transition-all duration-75 bg-gray-400 text-slate-800`}
                      onClick={() => setShowBtn((prev) => !prev)}
                    >
                      Friends
                    </button>
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
                {!request?.status && (
                  <button
                    className="w-[65%] sm:w-auto px-4 py-1 rounded-sm hover:opacity-95 hover:scale-95 transition-all duration-75 bg-gray-400 text-slate-800"
                    onClick={handleAddFriend}
                  >
                    Add Friend
                  </button>
                )}
                {request?.status === 'pending' && request?.to === user?.id && (
                  <button
                    className="w-[65%] sm:w-auto px-4 py-1 rounded-sm hover:opacity-95 hover:scale-95 transition-all duration-75 bg-gray-400 text-slate-800"
                    onClick={handleUnfriend}
                  >
                    Cancel
                  </button>
                )}
                {request?.status === 'pending' &&
                  request?.from === user?.id && (
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
