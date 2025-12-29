import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

interface Product {
    _id: string;
    name: string;
    image: string;
    description: string;
    brand: string;
    category: string;
    price: number;
    countInStock: number;
    rating: number;
    numReviews: number;
}

const ProductPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    // Placeholder Product State (Fetch logic is same as before, preserving it)
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [qty, setQty] = useState<number>(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (err: any) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const addToCartHandler = () => {
        alert(`Added ${qty} items to cart (Feature In Progress)`);
    };

    if (loading) return (
        <div className="flex justify-center items-center min-h-screen bg-[#FDFCFB]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
    );

    if (error) return (
        <div className="min-h-screen flex justify-center items-center bg-[#FDFCFB]">
            <div className="bg-white p-6 rounded-xl shadow-soft text-center">
                <div className="text-red-500 font-bold mb-2">Error Loading Product</div>
                <p className="text-gray-600 mb-4">{error}</p>
                <Link to="/" className="text-primary hover:underline">Go Back Home</Link>
            </div>
        </div>
    );

    if (!product) return null;

    return (
        <div className="bg-[#FDFCFB] min-h-screen py-10">
            <div className="container mx-auto px-6">
                {/* Breadcrumb / Back */}
                <nav className="mb-6 flex items-center text-sm text-gray-500">
                    <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800 font-medium truncate max-w-xs">{product.name}</span>
                </nav>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Product Image Section */}
                    <div className="md:w-1/2">
                        <div className="bg-white rounded-2xl shadow-soft overflow-hidden p-6 md:p-10 flex justify-center items-center min-h-[400px]">
                            <img
                                src={product.image || 'https://via.placeholder.com/500?text=Product+Image'}
                                alt={product.name}
                                onError={(e) => {
                                    e.currentTarget.src = 'https://via.placeholder.com/500?text=Product+Image';
                                }}
                                className="max-h-[500px] w-full object-contain hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                    </div>

                    {/* Product Details Section */}
                    <div className="md:w-1/2">
                        <div className="bg-white rounded-2xl shadow-soft p-8 h-full">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h1 className="text-3xl font-extrabold text-gray-900 leading-tight mb-2 tracking-tight">{product.name}</h1>
                                    <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{product.brand}</p>
                                </div>
                                {/* Rating Badge */}
                                <div className="bg-yellow-50 px-3 py-1 rounded-lg flex items-center gap-1 border border-yellow-100">
                                    <span className="text-yellow-500 font-bold">{product.rating}</span>
                                    <i className="fas fa-star text-yellow-500 text-xs"></i>
                                    <span className="text-yellow-700 text-xs font-medium ml-1">({product.numReviews} Reviews)</span>
                                </div>
                            </div>

                            <div className="my-8 border-t border-gray-100 pt-6">
                                <h2 className="text-4xl font-bold text-primary mb-2">{product.price}</h2>
                                <p className="text-gray-500 text-sm">Inclusive of all taxes</p>
                            </div>

                            <div className="mb-8">
                                <h3 className="text-lg font-bold text-gray-900 mb-3">Description</h3>
                                <p className="text-gray-600 leading-relaxed text-base">
                                    {product.description}
                                </p>
                            </div>

                            {/* Action Box */}
                            <div className="bg-[#F5F4F3] p-6 rounded-xl border border-gray-200">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-semibold text-gray-700">Status</span>
                                    <span className={`font-bold px-3 py-1 rounded-full text-sm ${product.countInStock > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </span>
                                </div>

                                {product.countInStock > 0 && (
                                    <div className="flex justify-between items-center mb-6">
                                        <span className="font-semibold text-gray-700">Quantity</span>
                                        <div className="relative w-24">
                                            <select
                                                value={qty}
                                                onChange={(e) => setQty(Number(e.target.value))}
                                                className="block w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary text-gray-700"
                                            >
                                                {[...Array(product.countInStock).keys()].slice(0, 10).map((x) => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={addToCartHandler}
                                    disabled={product.countInStock === 0}
                                    className={`w-full py-4 px-6 rounded-xl font-bold text-lg text-white shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 ${product.countInStock === 0
                                            ? "bg-gray-400 cursor-not-allowed shadow-none"
                                            : "bg-primary hover:bg-indigo-700 shadow-indigo-500/30"
                                        }`}
                                >
                                    {product.countInStock === 0 ? 'Temporarily Unavailable' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section Placeholder */}
                <div className="mt-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
                    <div className="bg-white rounded-2xl shadow-soft p-8 text-center text-gray-500">
                        No reviews yet for this product.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
