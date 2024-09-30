import { useDispatch, useSelector } from 'react-redux';
import RequestCard from './RequestCard';
import { useEffect } from 'react';
import { fetchRequests } from '../../redux/features/requestsSlice';
const Requests = () => {
  const dispatch = useDispatch();
  const { requests, status } = useSelector((state) => state.requests);

  useEffect(() => {
    dispatch(fetchRequests());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-gray-400">Requests</h2>
        <span className=" rounded-full text-white bg-primary py-1 px-2.5">
          {requests.length}
        </span>
      </div>
      <div>
        {requests?.map((request) => (
          <RequestCard request={request} key={request._id} />
        ))}
      </div>
    </div>
  );
};

export default Requests;
