import { useEffect } from 'react';
import { postAPIData } from '../utils/APIFunctions';
import { useSelector } from 'react-redux';

const useAddNotification = ({ userId, type, referenceId, referenceType }) => {
  const { socket } = useSelector((state) => state.socket);

  useEffect(() => {
    // Handle Sending Notifications
    postAPIData('/api/v1/notifications', {
      userId,
      type,
      referenceId,
      referenceType,
    })
      .then((res) =>
        socket?.emit('handleNotification', {
          notification: res.data.notification,
        })
      )
      .catch((err) => console.log(err));
  });
};

export default useAddNotification;
