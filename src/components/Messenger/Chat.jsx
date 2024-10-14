// Hooks
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Icons
import {
  faEllipsisVertical,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Components
import UserMessage from './UserMessage';
import FriendMessage from './FriendMessage';
// Emojies
import EmojiPicker from 'emoji-picker-react';
// Helpers
import { getAPIData, postAPIData } from '../../utils/APIFunctions';
// Actions
import { setLastMesage } from './../../redux/features/chats/chatSlice';

const Chat = ({ chatId, messenger }) => {
  // Redux
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { socket } = useSelector((state) => state.socket);
  const { onlineFriends } = useSelector((state) => state.friends);

  // States
  const [conversation, setConversation] = useState([]);
  const [message, setMessage] = useState('');
  // Emojies
  const [showPicker, setShowPicker] = useState(false);

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
    setShowPicker(false);
  };

  // Fetch Conversation
  useEffect(() => {
    // setLoading(true);
    chatId &&
      getAPIData(
        `/api/v1/conversations/${chatId}/messages?member=${messenger?._id}`
      )
        .then((res) => {
          setConversation(res.data.messages);
        })
        .catch((err) => console.log(err));
    // .finally(() => setLoading(false));
  }, [chatId, user, messenger]);

  // Send Message
  const handleSendMessage = () => {
    message &&
      postAPIData(
        `/api/v1/conversations/${chatId}/messages?member=${messenger?._id}`,
        {
          content: message,
        }
      )
        .then((res) => {
          setConversation((prev) => [...prev, res.data.message]);
          socket?.emit('sendMessage', {
            message: res.data.message,
            to: messenger?._id,
          });
          dispatch(setLastMesage({ chatId, message: res.data.message }));
        })
        .catch((err) => console.log(err))
        .finally(() => setMessage(''));
  };

  // Listening to new Messages
  useEffect(() => {
    socket?.on('recieveMessage', (message) => {
      setConversation((prev) => [...prev, message]);
    });
  }, [socket]);

  // Handle Chat Scroll Bottom
  const messagesEndRef = useRef(null);
  useEffect(() => {
    scrollToBottom();
  }, [conversation]); // Scroll to bottom when messages change

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="flex flex-col flex-1 shadow-md rounded-md overflow-hidden">
      {/* header */}
      <div className="flex justify-between items-center p-3 min-h-14 border-b-2 bg-white">
        {messenger && (
          <>
            <div className="flex gap-3 items-center">
              <img
                src={messenger?.picture}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex flex-col justify-center">
                <span className="font-medium text-slate-800">
                  {messenger?.firstname}
                </span>
                {onlineFriends.some(
                  (friend) => friend._id === messenger?._id
                ) ? (
                  <span className="text-sm text-gray-300">Available</span>
                ) : (
                  <span className="text-sm text-gray-300">
                    Today at 3:00 AM
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-3 items-center">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className=" cursor-pointer hover:opacity-70 font-bold text-lg text-blue-400"
              />
              <FontAwesomeIcon
                icon={faEllipsisVertical}
                className=" cursor-pointer hover:opacity-70 font-bold text-lg text-blue-400"
              />
            </div>
          </>
        )}
      </div>

      {/* chat */}
      <div className="h-[65vh] flex flex-col px-5 gap-1 py-2 w-full overflow-y-auto scrollbar">
        {conversation?.length === 0 && (
          <div className="h-full flex justify-center items-center bg-blue-50">
            <span className="text-lg text-gray-400">no chat</span>
          </div>
        )}
        {conversation?.length > 0 &&
          conversation?.map((message) =>
            message.sender === user?._id ? (
              <UserMessage message={message.content} key={message._id} />
            ) : (
              <FriendMessage message={message.content} key={message._id} />
            )
          )}
        <div ref={messagesEndRef} /> {/* Empty div to act as scroll target */}
      </div>

      {/* Send Message */}
      <div className="flex items-center bg-white px-3 relative">
        <input
          type="text"
          placeholder="type..."
          className="p-3 font-medium flex-1"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button onClick={() => setShowPicker((prev) => !prev)}>😊</button>
        <div className="absolute right-24 bottom-3">
          {showPicker && <EmojiPicker onEmojiClick={handleEmojiSelect} />}
        </div>
        <button
          className="w-14 h-8 rounded-md ml-2 bg-blue-400 text-white"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </section>
  );
};

export default Chat;
