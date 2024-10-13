import { faBell, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Notifications = () => {
  const { socket } = useSelector((state) => state.socket);
  const [notifications, setNotifications] = useState([]);
  const [messages] = useState([]);

  //  Listen to Get Notification
  useEffect(() => {
    socket?.on('getNotification', (data) =>
      setNotifications((prev) => [...prev, data])
    );
  }, [socket]);

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
