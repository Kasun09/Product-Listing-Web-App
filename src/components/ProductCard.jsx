import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const ProductCard = ({ product, isFavorite, toggleFavorite, viewMode = 'grid', onViewDetails }) => {
    const isList = viewMode === 'list';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className={cn(
                "group relative bg-blue-200 dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-800 dark:border-slate-200 overflow-hidden",
                isList ? 'flex flex-row items-center p-4 gap-6' : 'flex flex-col'
            )}
        >

            {/* Recommended Badge */}
            {product.recommended && (
                <div className={cn("absolute z-10", isList ? 'top-2 left-2' : 'top-3 left-3')}>
                    <span className="bg-amber-400 text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        ⭐ Recommended
                    </span>
                </div>
            )}

            {/* Favorite Button */}
            <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => toggleFavorite(product.id)}
                className={cn(
                    "absolute z-10 p-2 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-slate-900 transition-colors shadow-sm",
                    isList ? 'top-2 right-2' : 'top-3 right-3'
                )}
            >
                <Heart
                    size={20}
                    className={cn(isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-slate-600', "transition-colors")}
                />
            </motion.button>

            {/* Product Image */}
            <div className={cn(isList ? 'w-32 h-32 md:w-48 md:h-48' : 'aspect-square w-full', "flex-shrink-0 overflow-hidden bg-slate-50 dark:bg-slate-900/50 p-2 sm:p-4 relative rounded-xl")}>
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                />
            </div>

            {/* Product Details */}
            <div className={cn("flex flex-col flex-grow", isList ? 'py-2 px-0' : 'p-3 sm:p-5')}>
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase mb-2">
                    {product.category}
                </span>

                <h3
                    className={cn("font-semibold text-slate-800 dark:text-white mb-2", isList ? 'text-lg' : 'text-sm')}
                    title={product.title}
                >
                    {product.title}
                </h3>

                {isList && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 hidden md:block">
                        {product.description}
                    </p>
                )}

                <div className="flex items-center gap-2 mb-2 sm:mb-4">
                    <div className="flex items-center bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded text-green-700 dark:text-green-400 text-xs font-bold">
                        ★ {product.rating.rate}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">({product.rating.count} reviews)</span>
                </div>

                <div className={cn("mt-auto flex items-center justify-between", isList ? 'md:justify-start md:gap-8' : '')}>
                    <span className="text-base sm:text-xl font-bold text-slate-900 dark:text-white">
                        ${product.price}
                    </span>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onViewDetails(product)}
                        className="bg-slate-900 dark:bg-indigo-600 text-white text-xs font-bold px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors"
                    >
                        View Details
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default ProductCard;