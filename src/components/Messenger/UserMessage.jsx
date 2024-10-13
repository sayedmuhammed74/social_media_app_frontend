const UserMessage = ({ message }) => {
  return (
    <div className="self-end px-3 py-2 w-fit rounded-sm text-white bg-blue-400">
      {message}
    </div>
  );
};

export default UserMessage;
