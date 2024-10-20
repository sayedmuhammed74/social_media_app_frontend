const SkeletonPost = () => {
  return (
    <div className="p-5 shadow-md flex flex-col rounded-sm my-5 bg-white animate-pulse">
      {/* User Info and Time */}
      <div className="flex p-3 justify-between relative">
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-md bg-gray-300" />{' '}
          {/* Placeholder for user image */}
          <div className="flex flex-col items-stretch">
            <div className="h-4 w-32 bg-gray-300 rounded-md mb-1" />{' '}
            {/* Placeholder for username */}
            <div className="h-3 w-20 bg-gray-300 rounded-md" />{' '}
            {/* Placeholder for time ago */}
          </div>
        </div>
        <div className="w-6 h-6 bg-gray-300 rounded-md" />{' '}
        {/* Placeholder for options icon */}
      </div>

      {/* Post Text */}
      <div className="px-3 overflow-hidden my-5">
        <div className="h-4 w-full bg-gray-300 rounded-md mb-2" />{' '}
        {/* Placeholder for post description */}
        <div className="h-4 w-full bg-gray-300 rounded-md mb-2" />
        <div className="h-4 w-full bg-gray-300 rounded-md mb-2" />
      </div>

      {/* Post Media */}
      <div className="flex flex-1 justify-center my-2 h-[200px]">
        <div className="w-full h-full bg-gray-300 rounded-sm" />{' '}
        {/* Placeholder for media */}
      </div>

      {/* Likes and Icons */}
      <div className="flex justify-between p-3">
        <div className="flex gap-2 items-center p-2">
          <div className="w-6 h-6 bg-gray-300 rounded-md" />{' '}
          {/* Placeholder for like icon */}
          <div className="w-6 h-6 bg-gray-300 rounded-md" />{' '}
          {/* Placeholder for comment icon */}
        </div>
        <div className="h-4 w-20 bg-gray-300 rounded-md" />{' '}
        {/* Placeholder for comments count */}
      </div>
    </div>
  );
};

export default SkeletonPost;
