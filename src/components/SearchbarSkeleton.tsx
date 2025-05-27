import React from 'react';

const SearchbarSkeleton = () => {
  return (
    <div className="flex items-center space-x-2 p-4 animate-pulse">
      <div className="w-full h-10 bg-gray-200 rounded-md"></div>
      <div className="w-24 h-10 bg-gray-200 rounded-md"></div>
    </div>
  );
};

export default SearchbarSkeleton; 