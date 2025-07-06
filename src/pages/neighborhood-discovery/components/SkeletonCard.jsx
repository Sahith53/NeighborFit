import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-surface rounded-xl shadow-elevation-2 overflow-hidden animate-pulse">
      {/* Profile Image Skeleton */}
      <div className="h-48 bg-muted" />
      
      {/* Profile Info Skeleton */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="h-6 bg-muted rounded w-32" />
          <div className="h-4 bg-muted rounded w-16" />
        </div>
        
        {/* Activity Status Skeleton */}
        <div className="h-4 bg-muted rounded w-20 mb-3" />
        
        {/* Interests Skeleton */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            <div className="h-6 bg-muted rounded-full w-16" />
            <div className="h-6 bg-muted rounded-full w-20" />
            <div className="h-6 bg-muted rounded-full w-14" />
          </div>
        </div>
        
        {/* Action Buttons Skeleton */}
        <div className="flex space-x-2">
          <div className="h-10 bg-muted rounded flex-1" />
          <div className="h-10 bg-muted rounded flex-1" />
          <div className="h-10 bg-muted rounded w-12" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;