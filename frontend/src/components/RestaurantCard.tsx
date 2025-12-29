import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import { Heart } from 'lucide-react';

interface RestaurantProps {
    restaurant: {
        _id: string;
        name: string;
        image: string;
        cuisine: string;
        address: string;
        rating: number;
        numReviews: number;
        deliveryTime: number;
        priceRange: string;
    };
}

const RestaurantCard: React.FC<RestaurantProps> = ({ restaurant }) => {
    // Basic fallback if image fails to load
    const [imgSrc, setImgSrc] = useState(restaurant.image);
    const { toggleFavorite, isFavorite } = useFavorites();
    const favorite = isFavorite(restaurant._id);

    const handleError = () => {
        setImgSrc('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'); // Generic fallback
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group h-full flex flex-col">
            <Link to={`/restaurant/${restaurant._id}`} className="block relative flex-shrink-0">
                <div className="w-full aspect-video min-h-[200px] bg-gray-100 overflow-hidden relative">
                    <img
                        src={imgSrc || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
                        alt={restaurant.name}
                        onError={handleError}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-in-out"
                    />
                    {/* Delivery Time Badge Overlay */}
                    <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 text-gray-800 z-10">
                        <i className="fas fa-clock text-primary"></i>
                        {restaurant.deliveryTime} min
                    </div>
                    {/* Favorite Heart Button */}
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(restaurant._id);
                        }}
                        className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-20"
                    >
                        <Heart
                            className={`w-5 h-5 transition-all ${favorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                            strokeWidth={2}
                        />
                    </button>
                </div>
            </Link>

            <div className="p-5 flex flex-col flex-1">
                <div className="flex justify-between items-start mb-1">
                    <Link to={`/restaurant/${restaurant._id}`} className="flex-1 mr-2">
                        <h3 className="text-gray-900 font-bold text-lg leading-snug group-hover:text-primary transition-colors line-clamp-1">
                            {restaurant.name}
                        </h3>
                    </Link>
                    <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-md border border-green-100 flex-shrink-0">
                        <span className="text-green-700 text-sm font-bold">{restaurant.rating.toFixed(1)}</span>
                        <i className="fas fa-star text-[10px] text-green-600"></i>
                    </div>
                </div>

                <p className="text-gray-500 text-sm mb-4 flex-grow">
                    {restaurant.cuisine} <span className="mx-1">•</span> {restaurant.priceRange}
                </p>

                <Link
                    to={`/restaurant/${restaurant._id}`}
                    className="w-full block text-center bg-[#FF7043] hover:bg-[#FF6E40] active:bg-[#E64A19] text-white font-bold py-3 rounded-xl transition-all transform active:scale-95 shadow-lg shadow-orange-500/30 cursor-pointer"
                >
                    View Menu
                </Link>
            </div>
        </div>
    );
};

export default RestaurantCard;