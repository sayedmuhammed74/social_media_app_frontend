import { faBell, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getAPIData } from '../utils/APIFunctions';

const Notifications = () => {
  const { socket } = useSelector((state) => state.socket);
  const [notifications, setNotifications] = useState([]);
  const [messages] = useState([]);

  // Listening to notifications
  useEffect(() => {
    socket?.on('sendNotification', (notification) =>
      setNotifications((prev) => [...prev, notification])
    );
  }, [socket]);

  // Fetch Notifications
  useEffect(() => {
    getAPIData('/api/v1/notifications')
      .then((res) => setNotifications(res.data.notifications))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div className="relative flex items-center">
        <FontAwesomeIcon
          icon={faBell}
          className=" cursor-pointer hover:opacity-70 font-bold text-2xl text-blue-400"
        />
        <span className="absolute -top-2.5 -right-2 text-red-500">
          {notifications.length > 0 && notifications.length}
        </span>
      </div>
      <div className="relative flex items-center">
        <FontAwesomeIcon
          icon={faMessage}
          className=" cursor-pointer hover:opacity-70 font-bold text-2xl text-blue-400"
        />
        <span className="absolute -top-2.5 -right-2 text-red-500">
          {messages.length > 0 && messages.length}
        </span>
      </div>
    </>
  );
};

export default Notifications;
