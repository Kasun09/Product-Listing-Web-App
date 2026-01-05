import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div className="flex flex-nowrap gap-2 py-2 overflow-x-auto scrollbar-hide">
            <button
                onClick={() => onSelectCategory('all')}
                className={twMerge(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                    selectedCategory === 'all'
                        ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none"
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                )}
            >
                All
            </button>
            {categories.map((cat) => (
                <button
                    key={cat}
                    onClick={() => onSelectCategory(cat)}
                    className={twMerge(
                        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border capitalize",
                        selectedCategory === cat
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none"
                            : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                    )}
                >
                    {cat}
                </button>
            ))}
        </div>
    );
};

export default CategoryFilter;
