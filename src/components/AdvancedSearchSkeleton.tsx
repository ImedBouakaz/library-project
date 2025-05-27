import React from 'react';

const AdvancedSearchSkeleton = () => {
  return (
    <div className="space-y-4 p-4 bg-white rounded-lg shadow animate-pulse">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recherche principale */}
        <div className="md:col-span-2 space-y-2">
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-10 w-full bg-gray-200 rounded-md"></div>
        </div>

        {/* Langue */}
        <div className="space-y-2">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-10 w-full bg-gray-200 rounded-md"></div>
        </div>

        {/* Année */}
        <div className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-10 w-full bg-gray-200 rounded-md"></div>
        </div>

        {/* Type de document */}
        <div className="space-y-2">
          <div className="h-4 w-28 bg-gray-200 rounded"></div>
          <div className="h-10 w-full bg-gray-200 rounded-md"></div>
        </div>

        {/* Couverture */}
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-gray-200 rounded"></div>
          <div className="h-4 w-32 bg-gray-200 rounded"></div>
        </div>
      </div>

      <div className="flex justify-end">
        <div className="h-10 w-24 bg-gray-200 rounded-md"></div>
      </div>
    </div>
  );
};

export default AdvancedSearchSkeleton; 