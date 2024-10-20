import { faBell, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAPIData, updateAPIData } from '../utils/APIFunctions';
import { Link } from 'react-router-dom';

const Notifications = () => {
  // Redux
  const { socket } = useSelector((state) => state.socket);

  // States
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [showNotificationsList, setShowNotificationsList] = useState(false);
  const [showMessagesList, setShowMessagesList] = useState(false);

  const readNotifications = () => {
    setShowNotificationsList((prev) => !prev);
    setShowMessagesList(false);
  };

  const readMessages = () => {
    setShowMessagesList((prev) => !prev);
    setShowNotificationsList(false);
  };

  // Listening to notifications
  useEffect(() => {
    socket?.on('sendNotification', (notification) => {
      if (notification?.type === 'message') {
        setMessages((prev) => [...prev, notification]);
      } else {
        setNotifications((prev) => [...prev, notification]);
      }
    });
  }, [socket]);

  // Fetch Notifications
  useEffect(() => {
    getAPIData('/api/v1/notifications')
      .then((res) => setNotifications(res.data.notifications))
      .catch((err) => console.log(err));
  }, []);

  // Fetch Messages Notifications
  useEffect(() => {
    getAPIData('/api/v1/notifications/messages')
      .then((res) => setMessages(res.data.notifications))
      .catch((err) => console.log(err));
  }, []);

  const handleReadMessage = (id, index) => {
    updateAPIData(`/api/v1/notifications/${id}`, undefined)
      .catch((err) => console.log(err))
      .finally(() => {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages]; // Create a shallow copy of the array
          updatedMessages[index] = { ...updatedMessages[index], isRead: true }; // Update the specific index
          return updatedMessages; // Return the new array
        });
      });
    setShowMessagesList(false);
  };

  const handleReadNotification = (n, index) => {
    !n?.isRead &&
      updateAPIData(`/api/v1/notifications/${n?._id}`, undefined)
        .catch((err) => console.log(err))
        .finally(() => {
          setNotifications((prevNotifications) => {
            const updatedNotifications = [...prevNotifications]; // Create a shallow copy of the array
            updatedNotifications[index] = {
              ...updatedNotifications[index],
              isRead: true,
            }; // Update the specific index
            return updatedNotifications; // Return the new array
          });
        });
    setShowNotificationsList(false);
  };

  return (
    <>
      {/* Alerts */}
      <div className="relative flex items-center">
        <FontAwesomeIcon
          icon={faBell}
          className="cursor-pointer hover:opacity-70 font-bold text-2xl select-none text-blue-400"
          onClick={readNotifications}
        />
        <span className="absolute -top-2.5 -right-2 text-red-500">
          {notifications.length > 0 && notifications.length}
        </span>
        {showNotificationsList && (
          <ul className="absolute z-50 top-9 -left-12 flex flex-col pt-2 py-2 divide-y gap-2 w-[200px] rounded-md bg-white shadow-md">
            {notifications.map((n, index) => (
              <li key={n?._id}>
                <Link
                  to={`/posts/${n?.referenceId}`}
                  className={`flex items-center gap-2 px-3 py-2 ${
                    !n?.isRead ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => handleReadNotification(n, index)}
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={n?.creator.picture}
                  />
                  <p className="cursor-pointer text-gray-700">
                    {n?.creator.firstname} {n?.type} {n?.referenceType}
                  </p>
                </Link>
              </li>
            ))}
            {notifications.length > 7 && (
              <li className="text-sm text-gray-500 pt-2 pb-1 text-center bg-gray-200 cursor-pointer hover:opacity-80">
                Show More
              </li>
            )}
            {notifications.length === 0 && (
              <li className="text-sm text-gray-500 pt-2 pb-1 text-center bg-gray-200 cursor-pointer hover:opacity-80">
                no notifications yet
              </li>
            )}
          </ul>
        )}
      </div>

      {/* Messages */}
      <div className="relative flex items-center">
        <FontAwesomeIcon
          icon={faMessage}
          className="cursor-pointer hover:opacity-70 font-bold text-2xl text-blue-400 select-none"
          onClick={readMessages}
        />
        <span className="absolute -top-2.5 -right-2 text-red-500">
          {messages.length > 0 && messages.length}
        </span>
        {showMessagesList && (
          <ul className="absolute z-50 top-9 -left-20 flex flex-col pt-2 divide-y gap-2 w-[200px] rounded-md bg-white shadow-md">
            {messages.map((n, index) => (
              <li key={n?._id}>
                <Link
                  className={`flex items-center gap-2 px-3 py-2 ${
                    !n?.isRead ? 'bg-gray-200' : ''
                  }`}
                  onClick={() => !n?.isRead && handleReadMessage(n?._id, index)}
                >
                  <img
                    className="w-8 h-8 rounded-full"
                    src={n?.creator.picture}
                  />
                  <p className="cursor-pointer text-gray-700">
                    <span className="font-medium text-lg">
                      {n?.creator.firstname}
                    </span>
                    <span className="ml-1">{n?.referenceId.content}</span>
                  </p>
                </Link>
              </li>
            ))}
            {messages.length > 7 && (
              <li className="text-sm text-gray-500 pt-2 pb-1 text-center bg-gray-200 cursor-pointer hover:opacity-80">
                Show More
              </li>
            )}
            {messages.length === 0 && (
              <li className="text-sm text-gray-500 pt-2 pb-1 text-center bg-gray-200 cursor-pointer hover:opacity-80">
                no messages yet
              </li>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default Notifications;
