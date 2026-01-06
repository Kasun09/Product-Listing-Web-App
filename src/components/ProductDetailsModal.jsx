import React, { useEffect } from 'react';
import { X, Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const ProductDetailsModal = ({ product, onClose, isFavorite, toggleFavorite }) => {
    // Prevent body scroll when modal is open
    useEffect(() => {
        if (product) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [product]);

    if (!product) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            ></motion.div>

            {/* Modal Content */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="relative w-full max-w-4xl bg-blue-200 dark:bg-slate-700 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
            >

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/50 dark:bg-black/50 backdrop-blur rounded-full hover:bg-white dark:hover:bg-black transition-colors"
                >
                    <X className="w-6 h-6 text-slate-800 dark:text-white" />
                </button>

                {/* Left: Image Section */}
                <div className="w-full md:w-1/2 bg-slate-50 dark:bg-slate-800/50 p-6 md:p-8 flex items-center justify-center relative min-h-[200px]">
                    <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        src={product.image}
                        alt={product.title}
                        className="h-48 sm:h-64 md:h-auto md:max-h-[500px] w-auto object-contain drop-shadow-xl"
                    />
                    {product.recommended && (
                        <motion.span
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="absolute top-4 left-4 bg-amber-400 text-black text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-wider shadow-sm"
                        >
                            ⭐ Recommended
                        </motion.span>
                    )}
                </div>

                {/* Right: Details Section */}
                <div className="w-full md:w-1/2 p-5 md:p-10 flex flex-col overflow-y-auto">
                    <div className="mb-auto">
                        <span className="text-xs md:text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                            {product.category}
                        </span>

                        <h2 className="text-xl md:text-3xl font-bold text-slate-900 dark:text-white mt-2 mb-3 leading-tight">
                            {product.title}
                        </h2>

                        {/* Rating */}
                        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                            <div className="flex items-center text-amber-500">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-4 h-4 md:w-5 md:h-5 ${i < Math.round(product.rating.rate) ? 'fill-current' : 'text-slate-300 dark:text-slate-600'}`}
                                    />
                                ))}
                            </div>
                            <span className="text-sm md:text-base text-slate-500 dark:text-slate-400 font-medium">
                                {product.rating.rate} ({product.rating.count} reviews)
                            </span>
                        </div>

                        <div className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6">
                            ${product.price}
                        </div>

                        <div className="prose prose-slate dark:prose-invert mb-6 md:mb-8">
                            <p className="text-sm md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-4 md:mt-8 pt-6 md:pt-8 border-t border-slate-100 dark:border-slate-800">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="flex-1 bg-slate-900 dark:bg-indigo-600 text-white font-bold py-3 md:py-4 rounded-xl hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl duration-200 text-sm md:text-base"
                        >
                            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                            Add to Cart
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => toggleFavorite(product.id)}
                            className={`px-6 py-4 rounded-xl font-bold border-2 transition-colors flex items-center justify-center gap-2 ${isFavorite
                                ? 'border-red-500 text-red-500 bg-red-50 dark:bg-red-900/10'
                                : 'border-slate-200 dark:border-slate-700 text-slate-700 dark:text-white hover:border-slate-300 dark:hover:border-slate-600'
                                }`}
                        >
                            <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProductDetailsModal;
