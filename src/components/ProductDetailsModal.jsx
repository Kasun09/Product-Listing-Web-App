import React, { useEffect } from 'react';
import { X, Star, ShoppingCart, Heart } from 'lucide-react';

const ProductDetailsModal = ({ product, onClose, isFavorite, toggleFavorite }) => {
    if (!product) return null;

    // Prevent body scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fade-in"
                onClick={onClose}
            ></div>

            {/* Modal Content */}
            <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden animate-scale-up flex flex-col md:flex-row max-h-[90vh]">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/50 dark:bg-black/50 backdrop-blur rounded-full hover:bg-white dark:hover:bg-black transition-colors"
                >
                    <X className="w-6 h-6 text-slate-800 dark:text-white" />
                </button>

                {/* Left: Image Section */}
                <div className="w-full md:w-1/2 bg-slate-50 dark:bg-slate-800/50 p-8 flex items-center justify-center relative">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-[60vh] md:max-h-[500px] w-auto object-contain drop-shadow-xl"
                    />
                    {product.recommended && (
                        <span className="absolute top-6 left-6 bg-amber-400 text-black text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                            ⭐ Recommended
                        </span>
                    )}
                </div>

                {/* Right: Details Section */}
                <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col overflow-y-auto">
                    <div className="mb-auto">
                        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                            {product.category}
                        </span>

                        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mt-2 mb-4 leading-tight">
                            {product.title}
                        </h2>

                        {/* Rating */}
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${i < Math.round(product.rating.rate) ? 'fill-current' : 'text-slate-300 dark:text-slate-600'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-slate-500 dark:text-slate-400 font-medium">
                                {product.rating.rate} ({product.rating.count} reviews)
                            </span>
                        </div>

                        <div className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
                            ${product.price}
                        </div>

                        <div className="prose prose-slate dark:prose-invert mb-8">
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                        <button className="flex-1 bg-slate-900 dark:bg-indigo-600 text-white font-bold py-4 rounded-xl hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform active:scale-95 duration-200">
                            <ShoppingCart className="w-5 h-5" />
                            Add to Cart
                        </button>
                        <button
                            onClick={() => toggleFavorite(product.id)}
                            className={`px-6 py-4 rounded-xl font-bold border-2 transition-colors flex items-center justify-center gap-2 ${isFavorite
                                    ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/10'
                                    : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:border-slate-300 dark:hover:border-slate-600'
                                }`}
                        >
                            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsModal;
