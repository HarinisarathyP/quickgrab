import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PaymentPage: React.FC = () => {
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        // Save to LocalStorage
        localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod));
        // Mock Success
        alert("Payment Method Selected: " + paymentMethod + ". Simulating Order Success...");
        navigate('/'); // Go back home for now, or to an OrderSuccess page
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
                    <span className="text-green-600">Shipping</span> &rarr;
                    <span className="text-primary font-bold">Payment</span> &rarr;
                    <span>Place Order</span>
                </nav>

                <h1 className="text-2xl font-bold text-gray-900 mb-6">Payment Method</h1>

                <form onSubmit={submitHandler} className="space-y-4">
                    <div className="space-y-4">
                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-[#F5F4F3] transition-colors">
                            <input
                                type="radio"
                                className="form-radio text-primary h-5 w-5"
                                name="paymentMethod"
                                value="PayPal"
                                checked={paymentMethod === 'PayPal'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span className="ml-3 font-medium">PayPal or Credit Card</span>
                        </label>

                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-[#F5F4F3] transition-colors">
                            <input
                                type="radio"
                                className="form-radio text-primary h-5 w-5"
                                name="paymentMethod"
                                value="Stripe"
                                checked={paymentMethod === 'Stripe'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span className="ml-3 font-medium">Stripe</span>
                        </label>

                        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-[#F5F4F3] transition-colors">
                            <input
                                type="radio"
                                className="form-radio text-primary h-5 w-5"
                                name="paymentMethod"
                                value="CashOnDelivery"
                                checked={paymentMethod === 'CashOnDelivery'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            />
                            <span className="ml-3 font-medium">Cash On Delivery</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-colors mt-6"
                    >
                        Continue
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate('/shipping')}
                        className="w-full text-gray-500 py-3 font-medium hover:text-gray-700"
                    >
                        Back
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PaymentPage;
