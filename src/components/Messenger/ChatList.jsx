// Hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Actions
import { fetchChats } from '../../redux/features/chats/chatThunks';
// Helpers
import { checkSender } from '../../utils/helper';
import { fetchFriends } from '../../redux/features/friends/friendThunks';

const Chats = ({ setChatId, setMessenger, chatId }) => {
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { chats } = useSelector((state) => state.chats);
  const { friends } = useSelector((state) => state.friends);
  // States
  const [searchValue, setSearchValue] = useState('');
  const [searchChats, setSearchChats] = useState([]);

  // Fetch Chats
  useEffect(() => {
    dispatch(fetchChats());
    return () => {};
  }, [dispatch, chatId]);

  // Fetch Friends
  useEffect(() => {
    friends.length === 0 && dispatch(fetchFriends());
  }, [dispatch, friends?.length]);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    const filtered = friends.filter((friend) =>
      friend?.firstname?.includes(e.target.value)
    );
    setSearchChats(filtered);
  };

  return (
    <div className="lg:w-1/5 rounded-l-md shadow bg-white overflow-hidden">
      <input
        type="text"
        placeholder="search"
        className="w-[90%] px-3 py-1.5 m-4 text-sm rounded-md bg-gray-50"
        value={searchValue}
        onChange={handleChange}
      />
      <ul className="border-t divide-y flex flex-row md:flex-col">
        {searchValue &&
          searchChats?.map((friend) => (
            <li
              key={friend?._id}
              className="flex gap-3 items-center p-2 cursor-pointer hover:opacity-85"
              onClick={() => {
                setChatId('saksh');
                setMessenger(friend);
                setSearchValue('');
              }}
            >
              <img
                alt={friend?.firstname}
                src={friend?.picture}
                className="w-10 h-10 rounded-full"
              />
              <div className="hidden md:flex flex-col gap-1 ">
                <span className="font-medium text-slate-900">
                  {friend?.firstname}
                </span>
              </div>
            </li>
          ))}

        {!searchValue &&
          chats?.map((conv) => {
            const sender = checkSender(conv?.members, user?._id);
            return (
              <li
                key={conv?._id}
                className="flex gap-3 items-center p-2 cursor-pointer hover:opacity-85"
                onClick={() => {
                  setChatId(conv?._id);
                  setMessenger(sender);
                }}
              >
                <img
                  alt={sender?.firstname}
                  src={sender?.picture}
                  className="w-10 h-10 rounded-full"
                />
                <div className="hidden md:flex flex-col gap-1 ">
                  <span className="font-medium text-slate-900">
                    {sender?.firstname}
                  </span>
                  <span className="text-sm text-gray-400">
                    {conv?.lastMessage && conv?.lastMessage?.content.length > 20
                      ? conv?.lastMessage?.content.slice(0, 20) + '...'
                      : conv?.lastMessage?.content}
                    {!conv?.lastMessage && 'no messages yet'}
                  </span>
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default Chats;
