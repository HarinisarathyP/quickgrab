import React from 'react';

const RestaurantCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full flex flex-col animate-pulse">
            {/* Image Skeleton */}
            <div className="w-full aspect-video min-h-[200px] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] animate-shimmer"></div>

            {/* Content Skeleton */}
            <div className="p-5 flex-1 flex flex-col">
                {/* Title */}
                <div className="h-6 bg-gray-200 rounded-lg w-3/4 mb-3"></div>

                {/* Cuisine & Price */}
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>

                {/* Rating & Time */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-24"></div>
                </div>

                {/* Button */}
                <div className="mt-auto pt-2">
                    <div className="h-12 bg-gray-200 rounded-xl w-full"></div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCardSkeleton;
