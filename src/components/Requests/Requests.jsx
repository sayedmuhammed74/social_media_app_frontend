// Hooks
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
// Actions
import { fetchRequests } from '../../redux/features/requestsSlice';
// Components
import RequestCard from './RequestCard';
import Loading from '../Loading';

const Requests = () => {
  const dispatch = useDispatch();
  const { requests, status } = useSelector((state) => state.requests);

  // Fetch Requests
  useEffect(() => {
    dispatch(fetchRequests());
    return () => {};
  }, [dispatch]);

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-gray-400">Requests</h2>
        <span className=" rounded-full text-white bg-primary py-1 px-2.5">
          {requests?.length}
        </span>
      </div>
      <div>
        {requests?.map((request) => (
          <RequestCard request={request} key={request?._id} />
        ))}
      </div>
      {requests?.length === 0 && <Loading status={status} />}
      {requests?.length === 0 && status !== 'loading' && (
        <div className="text-center text-gray-400">no requests</div>
      )}
    </div>
  );
};

export default Requests;
