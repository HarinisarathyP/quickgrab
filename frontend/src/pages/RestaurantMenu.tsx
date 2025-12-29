import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Plus, Minus } from 'lucide-react';

interface MenuItem {
    _id: string;
    name: string;
    image: string;
    price: number;
    description: string;
    category: string;
    rating: number;
    numReviews: number;
    countInStock: number;
    isVeg?: boolean;
}

const RestaurantMenu: React.FC<{ onItemAdded?: () => void }> = ({ onItemAdded }) => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState<any>(null);
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>('Appetizers');
    const [itemQuantities, setItemQuantities] = useState<Record<string, number>>({});
    const { dispatch } = useCart();

    const categories = ['Appetizers', 'Main Course', 'Drinks', 'Desserts'];

    useEffect(() => {
        const fetchRestaurantData = async () => {
            try {
                setLoading(true);
                const { data: restaurantData } = await axios.get(`/api/restaurants/${id}`);
                setRestaurant(restaurantData);

                const { data: productsData } = await axios.get(`/api/products?restaurant=${id}`);
                setMenuItems(productsData);

                setLoading(false);
            } catch (err: any) {
                console.error("Error fetching restaurant/menu:", err);
                setError(err.response?.data?.message || err.message || "Failed to load restaurant details");
                setLoading(false);
            }
        };

        if (id) {
            fetchRestaurantData();
        }
    }, [id]);

    const addToCartHandler = (item: MenuItem) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                _id: item._id,
                name: item.name,
                image: item.image,
                price: item.price,
                qty: 1,
                restaurantId: restaurant._id,
                restaurantName: restaurant.name,
                restaurantImage: restaurant.image
            }
        });

        toast.success(
            (t) => (
                <div className="flex items-center gap-3">
                    <span>Item added!</span>
                    <Link
                        to="/cart"
                        onClick={() => toast.dismiss(t.id)}
                        className="bg-primary text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-orange-600 transition-colors"
                    >
                        View Cart
                    </Link>
                </div>
            ),
            {
                duration: 4000,
                style: {
                    minWidth: '300px',
                },
            }
        );
    };

    const handleIncreaseQuantity = (itemId: string, item: MenuItem) => {
        const newQty = (itemQuantities[itemId] || 0) + 1;
        setItemQuantities(prev => ({ ...prev, [itemId]: newQty }));
        
        if ((itemQuantities[itemId] || 0) === 0) {
            // First time adding, dispatch to cart
            dispatch({
                type: 'ADD_ITEM',
                payload: {
                    _id: item._id,
                    name: item.name,
                    image: item.image,
                    price: item.price,
                    qty: 1,
                    restaurantId: restaurant._id,
                    restaurantName: restaurant.name,
                    restaurantImage: restaurant.image
                }
            });
            // Trigger the cart bar notification
            onItemAdded?.();
        } else {
            // Increase quantity in cart
            dispatch({
                type: 'UPDATE_QUANTITY',
                payload: { id: itemId, qty: newQty }
            });
        }
    };

    const handleDecreaseQuantity = (itemId: string) => {
        const currentQty = itemQuantities[itemId] || 0;
        if (currentQty > 0) {
            const newQty = currentQty - 1;
            setItemQuantities(prev => ({ ...prev, [itemId]: newQty }));
            
            if (newQty === 0) {
                dispatch({ type: 'REMOVE_ITEM', payload: itemId });
            } else {
                dispatch({
                    type: 'UPDATE_QUANTITY',
                    payload: { id: itemId, qty: newQty }
                });
            }
        }
    };

    const scrollToCategory = (category: string) => {
        const element = document.getElementById(category.toLowerCase().replace(' ', '-'));
        if (element) {
            const offset = 180; // Account for sticky header + sticky nav
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setActiveCategory(category);
        }
    };

    const groupedItems = menuItems.reduce((acc, item) => {
        (acc[item.category] = acc[item.category] || []).push(item);
        return acc;
    }, {} as Record<string, MenuItem[]>);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-[#FDFCFB]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (error) return (
        <div className="text-center py-20 bg-[#FDFCFB] min-h-screen">
            <div className="text-red-500 mb-4 font-bold text-xl">{error}</div>
            <button
                onClick={() => window.location.reload()}
                className="bg-primary text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition-all"
            >
                Retry
            </button>
        </div>
    );

    if (!restaurant) return <div className="text-center py-20 bg-[#FDFCFB] min-h-screen">Restaurant Not Found...</div>;

    return (
        <div className="bg-[#FDFCFB] min-h-screen pb-24 md:pb-10">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="fixed top-16 left-4 z-40 bg-white text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-orange-50 hover:text-primary transition-all active:scale-95 md:hidden border-2 border-gray-100"
                title="Go back"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>

            {/* Restaurant Header */}
            <div className="bg-white shadow-sm mb-4">
                <div className="container mx-auto px-4 md:px-6 py-6">
                    <div className="flex items-start justify-between gap-6 mb-6">
                        <div className="flex items-center gap-6 flex-1">
                            <div className="w-20 h-20 md:w-24 md:h-24 min-h-[80px] md:min-h-[96px] rounded-2xl overflow-hidden shadow-lg border-2 border-gray-100 flex-shrink-0">
                                <img
                                    src={restaurant.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
                                    alt={restaurant.name}
                                    onError={(e) => {
                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
                                    }}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="flex-1">
                                <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-1 tracking-tight">{restaurant.name}</h1>
                                <p className="text-gray-500 text-sm md:text-base font-medium mb-2">{restaurant.cuisine} • {restaurant.priceRange}</p>
                                <div className="flex items-center gap-4">
                                    <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-black border border-green-100 flex items-center gap-1">
                                        {restaurant.rating.toFixed(1)} <i className="fas fa-star text-[8px]"></i>
                                    </span>
                                    <span className="text-gray-600 font-bold text-xs bg-gray-100 px-3 py-1 rounded-full flex items-center gap-2">
                                        <i className="fas fa-clock text-primary"></i>
                                        {restaurant.deliveryTime} mins
                                    </span>
                                </div>
                            </div>
                        </div>
                        <Link 
                            to="/" 
                            className="hidden md:flex items-center gap-2 px-4 py-2 text-primary font-bold hover:bg-orange-50 rounded-lg transition-colors border-2 border-primary hover:border-primary flex-shrink-0"
                        >
                            <i className="fas fa-arrow-left"></i>
                            Back to Menu
                        </Link>
                    </div>
                </div>
            </div>

            {/* Sticky Category Navigation */}
            <div className="sticky top-[64px] z-40 bg-white border-b border-gray-200 shadow-sm">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-4">
                        {categories.map(category => (
                            <button
                                key={category}
                                onClick={() => scrollToCategory(category)}
                                className={`px-6 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border-2 ${activeCategory === category
                                    ? 'bg-primary text-white border-primary shadow-md'
                                    : 'bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Menu Items - Vertical Single Column Layout */}
            <div className="container mx-auto px-4 md:px-6 max-w-4xl mt-6">
                {Object.keys(groupedItems).length === 0 ? (
                    <div className="text-center py-20 text-gray-400 font-medium bg-white rounded-3xl border-2 border-dashed border-gray-100 italic">
                        No menu items found for this restaurant.
                    </div>
                ) : (
                    categories.map(category => {
                        const items = groupedItems[category];
                        if (!items || items.length === 0) return null;

                        return (
                            <div
                                key={category}
                                id={category.toLowerCase().replace(' ', '-')}
                                className="mb-10"
                            >
                                <h2 className="text-2xl font-black text-gray-900 mb-6 pb-2 border-b-2 border-primary/20">
                                    {category}
                                </h2>
                                <div className="space-y-4">
                                    {items.map((item) => (
                                        <div
                                            key={item._id}
                                            className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                                        >
                                            <div className="flex gap-4">
                                                {/* Item Details */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-start gap-2 mb-2">
                                                        {/* Veg/Non-Veg Indicator */}
                                                        <div className={`flex-shrink-0 w-5 h-5 border-2 flex items-center justify-center rounded ${item.isVeg
                                                            ? 'border-green-600'
                                                            : 'border-red-600'
                                                            }`}>
                                                            <div className={`w-2.5 h-2.5 rounded-full ${item.isVeg
                                                                ? 'bg-green-600'
                                                                : 'bg-red-600'
                                                                }`}></div>
                                                        </div>
                                                        <h3 className="font-bold text-gray-900 text-lg leading-tight flex-1">
                                                            {item.name}
                                                        </h3>
                                                    </div>
                                                    <p className="text-sm text-gray-500 mb-3 leading-relaxed line-clamp-2">
                                                        {item.description}
                                                    </p>
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-black text-xl text-gray-900">
                                                            {item.price.toFixed(2)}
                                                        </span>
                                                        {(itemQuantities[item._id] || 0) === 0 ? (
                                                            <button
                                                                onClick={() => handleIncreaseQuantity(item._id, item)}
                                                                className="bg-[#FF7043] text-white font-bold text-sm px-8 py-3 rounded-lg shadow-lg hover:bg-[#FF6E40] active:bg-[#E64A19] transition-all uppercase tracking-wide z-10"
                                                            >
                                                                Add
                                                            </button>
                                                        ) : (
                                                            <div className="flex items-center border-2 border-[#FF7043] rounded-lg bg-white">
                                                                <button
                                                                    onClick={() => handleDecreaseQuantity(item._id)}
                                                                    className="p-2 text-[#FF7043] hover:bg-orange-50 transition-colors"
                                                                >
                                                                    <Minus className="w-4 h-4" />
                                                                </button>
                                                                <span className="px-4 py-2 font-black text-gray-900 min-w-[40px] text-center">
                                                                    {itemQuantities[item._id] || 0}
                                                                </span>
                                                                <button
                                                                    onClick={() => handleIncreaseQuantity(item._id, item)}
                                                                    className="p-2 text-[#FF7043] hover:bg-orange-50 transition-colors"
                                                                >
                                                                    <Plus className="w-4 h-4" />
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Item Image */}
                                                <div className="w-24 h-24 md:w-28 md:h-28 min-h-[96px] md:min-h-[112px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        onError={(e) => {
                                                            e.currentTarget.style.display = 'none';
                                                            const parent = e.currentTarget.parentElement;
                                                            if (parent && !parent.querySelector('.fallback-icon')) {
                                                                const fallback = document.createElement('div');
                                                                fallback.className = 'fallback-icon text-4xl text-gray-400';
                                                                fallback.innerHTML = '🍽️';
                                                                parent.appendChild(fallback);
                                                            }
                                                        }}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default RestaurantMenu;