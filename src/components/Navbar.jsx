import React, { useState, useEffect } from 'react';
import { ShoppingBag, Moon, Sun, Heart } from 'lucide-react';
import { useFavourites } from '../context/FavouriteContext';

const Navbar = () => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') === 'dark' ||
                (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
        return false;
    });

    const { favourites } = useFavourites();

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

    return (
        <nav className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <div className="bg-indigo-600 p-1.5 rounded-lg">
                            <ShoppingBag className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                            Shop<span className="text-indigo-600">Hub</span>
                        </span>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Favorites Counter (Mobile/Desktop) */}
                        <div className="relative group">
                            <Heart className="w-6 h-6 text-slate-600 dark:text-slate-300 group-hover:text-red-500 transition-colors cursor-pointer" />
                            {favourites.length > 0 && (
                                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white dark:ring-slate-900">
                                    {favourites.length}
                                </span>
                            )}
                        </div>

                        {/* Theme Toggle */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-600 dark:text-slate-300"
                            aria-label="Toggle Dark Mode"
                        >
                            {isDarkMode ? (
                                <Sun className="w-5 h-5 text-amber-400" />
                            ) : (
                                <Moon className="w-5 h-5 text-indigo-600" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
