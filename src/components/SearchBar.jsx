import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
    return (
        <div className="relative w-full md:w-96 group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
            </div>
            <input
                type="text"
                className="block w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl leading-5 bg-transparent text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 sm:text-sm transition-all duration-300 shadow-sm"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && (
                <button
                    onClick={() => onSearchChange('')}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
