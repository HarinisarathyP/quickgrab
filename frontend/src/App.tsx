// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import LoginPage from './pages/LoginPage';
import RestaurantMenu from './pages/RestaurantMenu';
import ShippingPage from './pages/ShippingPage';
import PaymentPage from './pages/PaymentPage';
import RegisterPage from './pages/RegisterPage';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const [showCartBar, setShowCartBar] = React.useState(false);
  const [cartBarTimeout, setCartBarTimeout] = React.useState<NodeJS.Timeout | null>(null);

  const handleShowCartBar = () => {
    setShowCartBar(true);
    if (cartBarTimeout) clearTimeout(cartBarTimeout);
    const timeout = setTimeout(() => setShowCartBar(false), 5000); // Auto-hide after 5 seconds
    setCartBarTimeout(timeout);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen font-sans bg-[#F8F9FA] text-gray-900">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onItemAdded={handleShowCartBar} />} />
            <Route path="/restaurant/:id" element={<RestaurantMenu onItemAdded={handleShowCartBar} />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart/:id?" element={<CartPage />} />
            <Route path="/shipping" element={<ShippingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<h1 className="text-center text-3xl mt-10">404: Not Found</h1>} />
          </Routes>
        </main>
        <BottomNav />

        {/* Floating Go to Cart Bar */}
        {showCartBar && (
          <div className="fixed bottom-20 left-0 right-0 z-40 px-4 py-2 flex justify-center">
            <div className="bg-gray-900/90 backdrop-blur-md border border-gray-700 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center justify-between gap-4 max-w-md">
              <div className="flex items-center gap-2">
                <i className="fas fa-check-circle text-green-400 text-lg"></i>
                <span className="font-bold">Item added to cart!</span>
              </div>
              <button
                onClick={() => {
                  window.location.href = '/cart';
                  setShowCartBar(false);
                }}
                className="bg-[#FF7043] hover:bg-[#FF6E40] text-white font-bold px-6 py-2 rounded-full text-sm transition-all active:scale-95"
              >
                View Cart
              </button>
            </div>
          </div>
        )}

        <footer className="bg-white border-t border-gray-200 mt-auto py-8 text-center hidden md:block">
          <p className="text-gray-500 text-sm">© 2025 QuickGrab. Premium Food Delivery.</p>
        </footer>
        <Toaster
          position="bottom-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#111827',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: '12px',
              padding: '16px',
            },
            success: {
              iconTheme: {
                primary: '#FF5200',
                secondary: '#fff',
              },
            },
          }}
        />
      </div>
    </Router>
  );
};

export default App;