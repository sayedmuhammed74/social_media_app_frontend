const Story = ({ story }) => {
  return (
    <div
      style={{ backgroundColor: story?.background }}
      className="relative overflow-hidden cursor-pointer rounded-md w-full h-full font-light border border-gray-300 hover:scale-105 transition-all"
    >
      {story?.image && (
        <img
          className="w-full h-full absolute top-0 left-0 hover:scale-105 hover:opacity-95 transition-all ease-in"
          src={story?.image ? story?.image : story?.user?.picture}
          alt={story?.user?.firstname}
        />
      )}
      <img
        className="absolute top-4 left-4 w-[30px] h-[30px] rounded-xl border-2 border-white"
        src={story?.user?.picture}
        alt={story?.user?.firstname}
      />
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-white w-full text-center px-2">
        {story?.text}
      </div>
    </div>
  );
};

export default Story;
