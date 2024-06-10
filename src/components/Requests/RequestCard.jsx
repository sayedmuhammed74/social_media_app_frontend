const RequestCard = () => {
  return (
    <>
      <div className="rounded-md p-3 my-5 shadow-md bg-white">
        <div className="flex gap-3 p-2">
          <img
            src="./imgs/girl.jpg"
            alt=""
            width={35}
            height={35}
            className="rounded-md"
          />
          <p className="text-slate-500">
            <span className="font-medium text-light">Mona Mohamed</span> wants
            to add you to friends
          </p>
        </div>
        <div className="flex justify-between px-5">
          <button className="btn font-medium">Accept</button>
          <button className="btn font-medium">Decline</button>
        </div>
      </div>
    </>
  );
};

export default RequestCard;
