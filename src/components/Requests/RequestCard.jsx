import { useDispatch } from 'react-redux';
import {
  acceptRequest,
  cancelRequest,
  fetchRequests,
} from '../../redux/features/requestsSlice';
import { fetchFriends } from '../../redux/features/friendsSlice';

const RequestCard = ({ request }) => {
  const dispatch = useDispatch();

  const handleAcceptRequest = () => {
    dispatch(acceptRequest({ id: request?._id }));
    dispatch(fetchRequests());
    dispatch(fetchFriends());
  };

  const handleCancelRequest = () => {
    dispatch(cancelRequest({ id: request?._id }));
    dispatch(fetchRequests());
  };

  return (
    <>
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
            <span className="font-medium text-light">
              {request?.from.firstname} {request?.from.lastname}
            </span>{' '}
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
    </>
  );
};

export default RequestCard;
