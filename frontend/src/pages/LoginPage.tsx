import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.post(
                'http://localhost:5000/api/auth/login',
                { email, password },
                config
            );

            localStorage.setItem('userInfo', JSON.stringify(data));
            setLoading(false);
            navigate('/'); // Redirect to home on success
            window.location.reload(); // Refresh to update header state
        } catch (err: any) {
            setError(err.response?.data?.message || err.message);
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-20 bg-[#FDFCFB] min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-xl shadow-soft">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Welcome Back</h1>
                    <p className="mt-2 text-sm text-gray-600">Sign in to your account to continue</p>
                </div>

                {error && <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded text-sm">{error}</div>}
                {loading && <div className="text-center text-primary font-medium animate-pulse">Authenticating...</div>}

                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-sm font-semibold text-gray-700">Password</label>
                            <a href="#" className="text-sm text-primary hover:underline">Forgot password?</a>
                        </div>
                        <input
                            type="password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 text-white bg-primary rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 font-bold tracking-wide transition-all shadow-lg shadow-indigo-500/30"
                    >
                        Sign In
                    </button>
                </form>

                <div className="text-center text-sm text-gray-600 mt-6">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary font-semibold hover:underline">
                        Create an account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

