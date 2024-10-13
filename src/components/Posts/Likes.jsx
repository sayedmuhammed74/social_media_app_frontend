const Likes = ({ likes }) => {
  return (
    <div className="flex items-center gap-2 p-3">
      <span>{likes?.length ? likes?.length + ' likes' : ''}</span>
      <div className="relative flex">
        {likes?.slice(0, 3).map((like) => (
          <img
            key={like?._id}
            src={like?.user?.picture}
            alt={like?.user?.firstname}
            className="rounded-full w-5 h-5"
          />
        ))}
      </div>
    </div>
  );
};

export default Likes;
