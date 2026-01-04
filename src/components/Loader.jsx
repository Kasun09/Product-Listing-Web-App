import React from 'react';

const Loader = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 flex flex-col overflow-hidden animate-pulse">

                    {/* Image Placeholder */}
                    <div className="aspect-square w-full bg-slate-200 dark:bg-slate-700/50 p-4"></div>

                    {/* Content Placeholder */}
                    <div className="p-5 flex flex-col flex-grow space-y-3">
                        {/* Category */}
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3"></div>

                        {/* Title */}
                        <div className="space-y-2">
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                        </div>

                        {/* Rating */}
                        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/4 pt-2"></div>

                        {/* Price & Button Action */}
                        <div className="mt-auto flex items-center justify-between pt-4">
                            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
                            <div className="h-10 bg-slate-200 dark:bg-slate-700 rounded w-28"></div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Loader;
