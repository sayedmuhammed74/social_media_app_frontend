// Hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Components
import ContactCard from './ContactCard';
import Loading from '../Loading';
// Actions
import { fetchFriends } from '../../redux/features/friends/friendThunks';
import { setOnlineFriends } from '../../redux/features/friends/friendSlice';

const Contacts = () => {
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { friends, status, onlineFriends } = useSelector(
    (state) => state.friends
  );
  const { socket } = useSelector((state) => state.socket);

  // Fetch Friends
  useEffect(() => {
    dispatch(fetchFriends());
    return () => {};
  }, [dispatch]);

  //Get Online Friends
  useEffect(() => {
    socket?.emit('getOnlineFriends', { friends });
  }, [socket, friends, user]);

  useEffect(() => {
    socket?.on('recieveOnlineFriends', (onlineFriends) =>
      dispatch(setOnlineFriends(onlineFriends))
    );
  }, [socket, dispatch]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-gray-400">Online</h2>
        <span className=" rounded-full text-white bg-primary py-1 px-2.5">
          {onlineFriends?.length}
        </span>
      </div>
      <ul>
        {onlineFriends?.map((contact) => (
          <li key={contact?._id}>
            <ContactCard contact={contact} />
          </li>
        ))}
      </ul>
      <Loading status={status} />
      {friends?.length === 0 && status !== 'loading' ? 'no contacts' : ''}
    </div>
  );
};

export default Contacts;
