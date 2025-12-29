import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ShippingPage: React.FC = () => {
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        // Save to LocalStorage or Context in real app
        localStorage.setItem('shippingAddress', JSON.stringify({ address, city, postalCode, country }));
        navigate('/payment');
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] py-10 px-4">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="fixed top-16 left-4 z-40 bg-white text-gray-900 p-2 rounded-full shadow-lg hover:shadow-xl hover:bg-[#F5F4F3] transition-all active:scale-95 md:hidden"
                title="Go back"
            >
                <ArrowLeft className="w-6 h-6" />
            </button>

            <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-soft">
                <nav className="flex mb-8 text-sm font-medium text-gray-500 justify-center gap-4">
                    <span className="text-primary font-bold">Shipping</span> &rarr;
                    <span>Payment</span> &rarr;
                    <span>Place Order</span>
                </nav>

                <h1 className="text-2xl font-bold text-gray-900 mb-6">Delivery Address</h1>

                <form onSubmit={submitHandler} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                        <input
                            type="text"
                            required
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-2 border"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <input
                            type="text"
                            required
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-2 border"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                        <input
                            type="text"
                            required
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-2 border"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                        <input
                            type="text"
                            required
                            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary p-2 border"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors mt-4"
                    >
                        Continue to Payment
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingPage;
