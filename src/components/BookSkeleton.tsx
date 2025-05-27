import React from 'react';

const BookSkeleton: React.FC = () => {
  return (
    <div className="bg-gray-100 rounded-xl shadow-md p-4 flex flex-col items-center animate-pulse"> {/* Base card style and pulse animation */}
      <div className="w-36 h-52 bg-gray-300 rounded-md mb-4"></div> {/* Placeholder for cover */}
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div> {/* Placeholder for title line 1 */}
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div> {/* Placeholder for title line 2 or shorter title */}
      <div className="h-4 bg-gray-300 rounded w-1/3"></div> {/* Placeholder for author */}
    </div>
  );
};

export default BookSkeleton; 