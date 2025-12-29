import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart, UtensilsCrossed } from 'lucide-react';

const Header: React.FC = () => {
    const { state } = useCart();
    const { cartItems } = state;
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] transition-all duration-300">
            <div className="container mx-auto px-4 md:px-6 py-3 flex justify-between items-center gap-4">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-2 group">
                    <UtensilsCrossed className="w-8 h-8 text-primary" strokeWidth={2.5} />
                    <span className="text-2xl font-extrabold tracking-tight text-gray-900 group-hover:text-primary transition-colors">
                        Quick<span className="text-primary">Grab</span>
                    </span>
                </Link>

                {/* Search Bar (Pill Shaped) */}
                <div className="hidden md:flex flex-1 max-w-xl relative group">
                    <form onSubmit={handleSearch} className="w-full flex items-center">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <i className="fas fa-search text-gray-400 group-focus-within:text-primary transition-colors"></i>
                        </div>
                        <input
                            type="text"
                            placeholder="Search for restaurants or food..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-11 pr-4 py-2.5 bg-gray-100 border-none rounded-full text-sm font-medium text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all shadow-inner"
                        />
                    </form>
                </div>

                {/* Desktop Actions */}
                <nav className="flex items-center gap-6">
                    <Link to="/cart" className="relative p-2 hover:bg-gray-100/50 rounded-full transition-colors group">
                        <ShoppingCart className="w-6 h-6 text-gray-600 group-hover:text-primary transition-colors" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full ring-2 ring-white shadow-sm animate-bounce-short transform translate-x-1 -translate-y-1">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    <Link to="/login" className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-bold rounded-full hover:bg-gray-800 hover:shadow-lg transition-all active:scale-95">
                        <i className="fas fa-user"></i>
                        <span>Sign In</span>
                    </Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;