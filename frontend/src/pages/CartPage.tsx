import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';

const CartPage: React.FC = () => {
    const navigate = useNavigate();
    const { state, dispatch } = useCart();
    const { cartItems } = state;

    const subtotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    const tax = subtotal * 0.15;
    const total = subtotal + tax;

    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    };

    const removeFromCartHandler = (id: string) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const updateQuantityHandler = (id: string, qty: number) => {
        if (qty < 1) return; // Prevent quantity from going below 1
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, qty } });
    };

    // Group items by Restaurant
    const groupedItems = cartItems.reduce((acc, item) => {
        const restName = item.restaurantName || 'Other Items';
        if (!acc[restName]) {
            acc[restName] = {
                details: {
                    name: restName,
                    image: item.restaurantImage
                },
                items: []
            };
        }
        acc[restName].items.push(item);
        return acc;
    }, {} as Record<string, { details: any, items: any[] }>);

    return (
        <div className="bg-[#FDFCFB] min-h-screen py-10 pb-10">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="fixed top-16 left-4 z-40 bg-white text-gray-900 p-3 rounded-full shadow-lg hover:shadow-xl hover:bg-orange-50 hover:text-primary transition-all active:scale-95 md:hidden border-2 border-gray-100"
                title="Go back"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl md:text-4xl font-black text-gray-900">Your Food Order</h1>
                    <Link to="/" className="hidden md:flex items-center gap-2 px-4 py-2 text-primary font-bold hover:bg-orange-50 rounded-lg transition-colors">
                        <i className="fas fa-arrow-left"></i>
                        Back to Menu
                    </Link>
                </div>

                {cartItems.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl shadow-sm text-center">
                        <div className="text-gray-400 mb-6">
                            <i className="fas fa-utensils text-6xl opacity-20"></i>
                        </div>
                        <div className="text-gray-500 mb-6 text-xl font-medium">Your cart is hungry!</div>
                        <Link to="/" className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                            Browse Restaurants
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Cart Items List */}
                        <div className="lg:w-2/3 space-y-6">
                            {Object.keys(groupedItems).map((restName) => (
                                <div key={restName} className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                                    {/* Restaurant Header in Cart */}
                                    <div className="bg-[#F5F4F3] px-6 py-4 border-b border-gray-100 flex items-center gap-4">
                                        {groupedItems[restName].details.image && (
                                            <div className="w-12 h-12 min-h-[48px] rounded-full overflow-hidden shadow-sm flex-shrink-0 bg-gray-100">
                                                <img
                                                    src={groupedItems[restName].details.image || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=48&q=80'}
                                                    alt={restName}
                                                    onError={(e) => {
                                                        e.currentTarget.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=48&q=80';
                                                    }}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        )}
                                        <h2 className="text-lg font-bold text-gray-800">Order from {restName}</h2>
                                    </div>

                                    <div className="p-5">
                                        {groupedItems[restName].items.map((item) => (
                                            <div key={item._id} className="flex items-center gap-4 py-5 border-b last:border-0 border-gray-100">
                                                <div className="w-20 h-20 min-h-[80px] bg-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                                                    <img
                                                        src={item.image || 'https://via.placeholder.com/80?text=Item'}
                                                        alt={item.name}
                                                        onError={(e) => {
                                                            e.currentTarget.src = 'https://via.placeholder.com/80?text=Item';
                                                        }}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>

                                                <div className="flex-1 min-w-0">
                                                    <Link to={`/restaurant/${item.restaurantId}`} className="text-gray-900 font-bold hover:text-primary leading-tight block mb-1.5 truncate">
                                                        {item.name}
                                                    </Link>
                                                    <div className="text-primary font-black text-lg">{item.price.toFixed(2)}</div>
                                                </div>

                                                <div className="flex items-center gap-3 flex-shrink-0">
                                                    {/* Quantity Controls */}
                                                    <div className="flex items-center border-2 border-gray-200 rounded-xl bg-white shadow-sm">
                                                        <button
                                                            onClick={() => updateQuantityHandler(item._id, item.qty - 1)}
                                                            disabled={item.qty <= 1}
                                                            className="p-2 hover:bg-[#F5F4F3] transition-colors disabled:opacity-30 disabled:cursor-not-allowed rounded-l-xl"
                                                        >
                                                            <Minus className="w-4 h-4 text-gray-600" />
                                                        </button>
                                                        <span className="px-4 py-2 text-sm font-black text-gray-900 min-w-[40px] text-center">
                                                            {item.qty}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantityHandler(item._id, item.qty + 1)}
                                                            className="p-2 hover:bg-[#F5F4F3] transition-colors rounded-r-xl"
                                                        >
                                                            <Plus className="w-4 h-4 text-gray-600" />
                                                        </button>
                                                    </div>

                                                    {/* Remove Button */}
                                                    <button
                                                        onClick={() => removeFromCartHandler(item._id)}
                                                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                        title="Remove item"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:w-1/3">
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 lg:sticky lg:top-24">
                                <h2 className="text-xl font-black text-gray-900 mb-6">Bill Details</h2>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span className="font-medium">Item Total</span>
                                        <span className="font-bold">{subtotal.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span className="font-medium">Delivery Fee</span>
                                        <span className="font-bold text-green-600">Free</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span className="font-medium">Taxes & Charges</span>
                                        <span className="font-bold">{tax.toFixed(2)}</span>
                                    </div>

                                    {/* Checkout Button - Replace To Pay */}
                                    <button
                                        onClick={checkoutHandler}
                                        className="w-full bg-[#FF7043] hover:bg-[#FF6E40] active:bg-[#E64A19] text-white font-black text-base py-4 px-4 rounded-xl shadow-lg shadow-orange-500/40 transition-all duration-200 transform active:scale-95 flex items-center justify-center gap-2 mt-4"
                                    >
                                        Checkout • {total.toFixed(2)}
                                    </button>
                                </div>

                                <p className="text-xs text-gray-400 text-center mt-6">
                                    Prices are inclusive of all taxes
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
