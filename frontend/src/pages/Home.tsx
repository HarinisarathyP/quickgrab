import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import RestaurantCard from '../components/RestaurantCard';
import { useFavorites } from '../context/FavoritesContext';

const Home: React.FC<{ onItemAdded?: () => void }> = ({ onItemAdded }) => {
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchParams] = useSearchParams();
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const { favorites } = useFavorites();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { data } = await axios.get('/api/restaurants');
        setRestaurants(data);
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching restaurants:", err);
        setError(`Failed to load: ${err.message || JSON.stringify(err)}`);
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  const tags = ['All', 'Italian', 'Indian', 'Chinese', 'Mexican', 'American', 'Thai', 'Japanese', 'Mediterranean', 'French', 'Greek'];

  // Filter by cuisine tag
  let filteredRestaurants = selectedTag === 'All'
    ? restaurants
    : restaurants.filter(r => r.cuisine === selectedTag);

  // Filter by search query (restaurant name or menu items)
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredRestaurants = filteredRestaurants.filter(r => {
      const nameMatch = r.name.toLowerCase().includes(query);
      const cuisineMatch = r.cuisine.toLowerCase().includes(query);
      return nameMatch || cuisineMatch;
    });
  }

  // Filter by favorites if enabled
  if (showOnlyFavorites) {
    filteredRestaurants = filteredRestaurants.filter(r => favorites.includes(r._id));
  }

  return (
    <div className="bg-[#FDFCFB] min-h-screen pb-24 md:pb-10">

      {/* Modern Hero & Filter Section */}
      <div className="bg-white border-b border-gray-100 py-6 md:py-10">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-6">
            What are you <span className="text-primary">craving</span> today?
          </h1>

          {/* Filter Bar - No Scrolling on Desktop */}
          <div className="flex items-center gap-2 flex-wrap md:gap-3">
            {tags.map(tag => (
              <button
                key={tag}
                onClick={() => {
                  setSelectedTag(tag);
                  setShowOnlyFavorites(false);
                }}
                className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm border ${selectedTag === tag && !showOnlyFavorites
                    ? 'bg-red-500 text-white border-red-500 shadow-red-500/30 ring-2 ring-red-500/20'
                    : 'bg-white text-gray-600 border-gray-100 hover:border-red-500 hover:text-red-500'
                  }`}
              >
                {tag}
              </button>
            ))}
            <button
              onClick={() => {
                setShowOnlyFavorites(!showOnlyFavorites);
                setSelectedTag('All');
              }}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all shadow-sm border flex items-center gap-2 ${showOnlyFavorites
                  ? 'bg-red-500 text-white border-red-500 shadow-red-500/30 ring-2 ring-red-500/20'
                  : 'bg-white text-gray-600 border-gray-100 hover:border-red-500 hover:text-red-500'
                }`}
            >
              <i className="fas fa-heart"></i>
              Favorites
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-10">
        {/* Restaurants Grid Section */}
        <div className="flex items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {showOnlyFavorites ? 'Your Favorite Restaurants' : (searchQuery ? `Search Results for "${searchQuery}"` : (selectedTag === 'All' ? 'Available Restaurants' : `${selectedTag} Restaurants`))}
          </h2>
          <span className="ml-3 text-sm font-medium text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
            {filteredRestaurants.length}
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500">{error}</div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
            <div className="text-gray-400 mb-6">
              <i className="fas fa-search text-6xl opacity-20"></i>
            </div>
            <div className="text-gray-500 mb-6 text-xl font-medium">
              {showOnlyFavorites ? 'No favorite restaurants yet!' : searchQuery ? `No restaurants match "${searchQuery}"` : 'No restaurants available'}
            </div>
            <button
              onClick={() => {
                setShowOnlyFavorites(false);
                setSelectedTag('All');
              }}
              className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              Browse All Restaurants
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredRestaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
