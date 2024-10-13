const FriendMessage = ({ message }) => {
  return (
    <div className="self-start px-3 py-2 w-fit rounded-sm text-slate-900 bg-gray-200">
      {message}
    </div>
  );
};

export default FriendMessage;
