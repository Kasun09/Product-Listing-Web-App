import React, { useEffect, useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import { useFavourites } from '../context/FavouriteContext';
import { fetchProducts } from '../services/api';
import { AnimatePresence, motion } from 'framer-motion';

const FavoritesSidebar = () => {
    const { favourites, toggleFavorite, isSidebarOpen, setIsSidebarOpen } = useFavourites();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isSidebarOpen) {
            loadFavoriteProducts();
        }
    }, [isSidebarOpen, favourites]);

    const loadFavoriteProducts = async () => {
        setLoading(true);
        try {
            const allProducts = await fetchProducts();
            const favs = allProducts.filter(p => favourites.includes(p.id));
            setProducts(favs);
        } catch (error) {
            console.error("Failed to load favorites", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isSidebarOpen && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/20 backdrop-blur-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    ></motion.div>

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-md h-full bg-white dark:bg-slate-900 shadow-2xl p-6 flex flex-col"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Your Favorites ({favourites.length})</h2>
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                                <X className="w-6 h-6 text-slate-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                            {loading ? (
                                <div className="flex justify-center py-10">
                                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                                </div>
                            ) : products.length > 0 ? (
                                <AnimatePresence mode="popLayout">
                                    {products.map(product => (
                                        <motion.div
                                            layout
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            key={product.id}
                                            className="flex gap-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 group"
                                        >
                                            <div className="w-20 h-20 bg-white p-2 rounded-lg flex-shrink-0">
                                                <img src={product.image} alt={product.title} className="w-full h-full object-contain" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-sm font-medium text-slate-900 dark:text-white line-clamp-2 mb-1">{product.title}</h4>
                                                <p className="text-indigo-600 font-bold">${product.price}</p>
                                            </div>
                                            <button
                                                onClick={() => toggleFavorite(product.id)}
                                                className="p-2 self-start text-slate-400 hover:text-red-500 transition-colors"
                                                title="Remove from favorites"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            ) : (
                                <div className="text-center py-10 text-slate-500">
                                    <p>No favorites yet.</p>
                                    <p className="text-sm mt-2">Start exploring and add items you love!</p>
                                </div>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                            <button
                                onClick={() => setIsSidebarOpen(false)}
                                className="w-full py-3 bg-slate-900 dark:bg-indigo-600 text-white rounded-xl font-bold hover:bg-slate-800 dark:hover:bg-indigo-500 transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default FavoritesSidebar;
