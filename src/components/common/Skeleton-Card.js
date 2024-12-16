import React from 'react';

const SkeletonCard = ({ message = "Loading..." }) => {
  return (
    <div className="animate-pulse relative">
      <div className="bg-[#064d4f63] rounded-lg h-36 mb-4 flex items-center justify-center">
        <span className="text-[#064c4f] text-sm font-medium">{message}</span>
      </div>
      <div className="space-y-3">
        <div className="h-4 bg-[#064d4f63] rounded w-3/4"></div>
        <div className="h-4 bg-[#064d4f63] rounded w-1/2"></div>
        <div className="h-4 bg-[#064d4f63] rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;