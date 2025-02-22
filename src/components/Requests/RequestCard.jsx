// Hooks
import { useDispatch, useSelector } from 'react-redux';
// Actions
import {
  acceptRequest,
  cancelRequest,
} from '../../redux/features/requests/requestThunks';
import { addFriend } from '../../redux/features/friends/friendSlice';
import { Link } from 'react-router-dom';
import { addNotification } from '../../utils/APIFunctions';

const RequestCard = ({ request }) => {
  // Redux
  const dispatch = useDispatch();
  const { socket } = useSelector((state) => state.socket);

  // Accept Request
  const handleAcceptRequest = () => {
    dispatch(acceptRequest({ id: request?._id }));
    dispatch(addFriend(request?.from));
    // Add Notification
    addNotification(
      request?.from._id,
      'friend_request',
      request?._id,
      'Request',
      socket
    );
  };

  const handleCancelRequest = () => {
    dispatch(cancelRequest({ id: request?._id }));
  };

  return (
    <div className="rounded-md p-3 my-5 shadow-md bg-white">
      <div className="flex gap-3 p-2">
        <img
          src={request?.from.picture}
          alt=""
          width={35}
          height={35}
          className="rounded-md"
        />
        <p className="text-slate-500">
          <Link
            to={`/users/${request?.from.slug}`}
            className="font-medium text-light mr-2 hover:opacity-80 cursor-pointer"
          >
            {request?.from.firstname} {request?.from.lastname}
          </Link>
          wants to add you to friends
        </p>
      </div>
      <div className="flex justify-between px-5">
        <button className="btn font-medium" onClick={handleAcceptRequest}>
          Accept
        </button>
        <button className="btn font-medium" onClick={handleCancelRequest}>
          Decline
        </button>
      </div>
    </div>
  );
};

export default RequestCard;
