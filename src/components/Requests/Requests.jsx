import RequestCard from './RequestCard';

const Requests = () => {
  return (
    <div className="p-5">
      <div className="flex justify-between">
        <h2 className="text-gray-400">Requests</h2>
        <span className=" rounded-full text-white bg-primary py-1 px-2.5">
          2
        </span>
      </div>
      <div className="">
        <RequestCard />
        <RequestCard />
      </div>
    </div>
  );
};

export default Requests;
