import React from 'react';
import { Heart } from 'lucide-react'; // Lucide icons use karanna lesiyi

const ProductCard = ({ product, isFavorite, toggleFavorite, viewMode = 'grid', onViewDetails }) => {
    const isList = viewMode === 'list';

    return (
        <div className={`group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 dark:border-slate-700 overflow-hidden ${isList ? 'flex flex-row items-center p-4 gap-6' : 'flex flex-col'
            }`}>

            {/* Recommended Badge */}
            {product.recommended && (
                <div className={`absolute z-10 ${isList ? 'top-2 left-2' : 'top-3 left-3'}`}>
                    <span className="bg-amber-400 text-black text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        ⭐ Recommended
                    </span>
                </div>
            )}

            {/* Favorite Button */}
            <button
                onClick={() => toggleFavorite(product.id)}
                className={`absolute z-10 p-2 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-slate-900 transition-colors shadow-sm ${isList ? 'top-2 right-2' : 'top-3 right-3'
                    }`}
            >
                <Heart
                    size={20}
                    className={`${isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-slate-600'} transition-colors`}
                />
            </button>

            {/* Product Image */}
            <div className={`${isList ? 'w-32 h-32 md:w-48 md:h-48' : 'aspect-square w-full'} flex-shrink-0 overflow-hidden bg-slate-50 dark:bg-slate-900/50 p-4 relative rounded-xl`}>
                <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />
            </div>

            {/* Product Details */}
            <div className={`flex flex-col flex-grow ${isList ? 'py-2 px-0' : 'p-5'}`}>
                <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400 uppercase mb-2">
                    {product.category}
                </span>

                <h3 className={`font-semibold text-slate-800 dark:text-white mb-2 ${isList ? 'text-lg line-clamp-1' : 'line-clamp-2 h-12 text-sm'}`}>
                    {product.title}
                </h3>

                {isList && (
                    <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-3 hidden md:block">
                        {product.description}
                    </p>
                )}

                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded text-green-700 dark:text-green-400 text-xs font-bold">
                        ★ {product.rating.rate}
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400">({product.rating.count} reviews)</span>
                </div>

                <div className={`mt-auto flex items-center justify-between ${isList ? 'md:justify-start md:gap-8' : ''}`}>
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                        ${product.price}
                    </span>
                    <button
                        onClick={() => onViewDetails(product)}
                        className="bg-slate-900 dark:bg-indigo-600 text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors"
                    >
                        View Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;