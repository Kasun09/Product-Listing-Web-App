import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const SortDropdown = ({ sortOption, onSortChange }) => {
    return (
        <div className="relative">
            <div className="relative inline-flex">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-600">
                    <ArrowUpDown className="h-4 w-4" />
                </div>
                <select
                    value={sortOption}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="appearance-none pl-10 pr-8 py-2.5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 cursor-pointer transition-all hover:border-slate-300 dark:hover:border-slate-600"
                >
                    <option value="default">Sort by: Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-500">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd" />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default SortDropdown;
