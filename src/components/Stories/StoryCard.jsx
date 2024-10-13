const Story = ({ story }) => {
  return (
    <div className="relative overflow-hidden cursor-pointer rounded-md h-[140px] min-w-[90px] font-light">
      <img
        className="w-full h-full absolute top-0 left-0 hover:scale-105 hover:opacity-95 transition-all ease-in"
        src={story?.image ? story?.image : story?.user?.picture}
        alt={story?.user?.firstname}
      />
      <img
        className="absolute top-4 left-4 w-[30px] h-[30px] rounded-xl border-2 border-white"
        src={story?.user?.picture}
        alt={story?.user?.firstname}
      />
      <span className="absolute bottom-1.5 left-4 text-white">
        {story?.user?.firstname} {story?.user?.lastname}
      </span>
    </div>
  );
};

export default Story;
