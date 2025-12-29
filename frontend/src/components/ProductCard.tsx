import React from 'react';
import { Link } from 'react-router-dom';

interface ProductProps {
    product: {
        _id: string;
        name: string;
        image: string;
        price: number;
        rating: number;
        numReviews: number;
    };
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
    return (
        <div className="bg-white rounded-xl shadow-soft hover:shadow-hover transition-all duration-300 overflow-hidden transform hover:-translate-y-1">
            <Link to={`/product/${product._id}`} className="block relative group">
                <div className="w-full h-56 bg-gray-100 overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
                {/* Quick Add Overlay Placeholder */}
                <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    {/* Could add a button here later */}
                </div>
            </Link>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <Link to={`/product/${product._id}`}>
                        <h3 className="text-gray-800 font-semibold text-lg leading-tight hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                    </Link>
                    <span className="text-primary font-bold text-lg">
                        ${product.price.toFixed(2)}
                    </span>
                </div>

                <div className="flex items-center mt-3">
                    <div className="flex text-yellow-400 text-sm">
                        {[...Array(5)].map((_, i) => (
                            <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? '' : 'text-gray-300'}`}></i>
                        ))}
                    </div>
                    <span className="text-gray-400 text-xs ml-2 font-medium">{product.numReviews} Reviews</span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
