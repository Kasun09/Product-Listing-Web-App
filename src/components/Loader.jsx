import React from 'react';

const Loader = () => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-100 dark:border-slate-700 h-[400px] flex flex-col animate-pulse">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-xl aspect-square mb-4"></div>
                    <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-6"></div>
                    <div className="mt-auto flex justify-between items-center">
                        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
                        <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Loader;
