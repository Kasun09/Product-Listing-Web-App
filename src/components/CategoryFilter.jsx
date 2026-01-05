import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/cn';

const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => {
    const allCategories = ['all', ...categories];

    return (
        <div className="flex flex-nowrap gap-2 py-2 overflow-x-auto scrollbar-hide">
            {allCategories.map((cat) => (
                <motion.button
                    key={cat}
                    layout
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onSelectCategory(cat)}
                    className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 border capitalize",
                        selectedCategory === cat
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-200 dark:shadow-none"
                            : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-700 hover:text-indigo-600 dark:hover:text-indigo-400"
                    )}
                >
                    {cat}
                </motion.button>
            ))}
        </div>
    );
};

export default CategoryFilter;
