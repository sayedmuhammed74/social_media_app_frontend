import { useDispatch, useSelector } from 'react-redux';
import ContactCard from './ContactCard';
import { useEffect } from 'react';
import { fetchFriends } from '../../redux/features/friendsSlice';
import Loading from '../Loading';

const Contacts = () => {
  const dispatch = useDispatch();
  const { friends, status } = useSelector((state) => state.friends);

  useEffect(() => {
    dispatch(fetchFriends());
    return () => {};
  }, [dispatch]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-gray-400">Contacts</h2>
        <span className=" rounded-full text-white bg-primary py-1 px-2.5">
          {friends?.length}
        </span>
      </div>
      <ul>
        {friends?.map((contact) => (
          <li key={contact?._id}>
            <ContactCard contact={contact} />
          </li>
        ))}
      </ul>
      <Loading status={status} />
    </div>
  );
};

export default Contacts;
