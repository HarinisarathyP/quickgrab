import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const BottomNav: React.FC = () => {
    const location = useLocation();
    const { state } = useCart();
    const cartCount = state.cartItems.reduce((acc, item) => acc + item.qty, 0);

    const navItems = [
        { path: '/', icon: 'fas fa-home', label: 'Home' },
        { path: '/search', icon: 'fas fa-search', label: 'Search' }, // Placeholder route
        { path: '/cart', icon: 'fas fa-shopping-bag', label: 'Cart', badge: cartCount },
        { path: '/login', icon: 'fas fa-user', label: 'Profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-gray-200 md:hidden z-50 pb-safe shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)]">
            <div className="flex justify-around items-center h-16">
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${isActive ? 'text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                        >
                            <div className="relative">
                                <i className={`${item.icon} text-xl mb-0.5`}></i>
                                {item.badge && item.badge > 0 ? (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4 w-4 flex items-center justify-center rounded-full ring-1 ring-white">
                                        {item.badge}
                                    </span>
                                ) : null}
                            </div>
                            <span className="text-[10px] font-medium">{item.label}</span>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNav;
