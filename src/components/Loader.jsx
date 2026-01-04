import React from 'react';

const Loader = ({ viewMode = 'grid' }) => {
    const isList = viewMode === 'list';

    return (
        <div className={isList ? "flex flex-col gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"}>
            {[...Array(8)].map((_, i) => (
                <div key={i} className={`bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden animate-pulse ${isList ? 'flex flex-row items-center p-4 gap-6' : 'flex flex-col'
                    }`}>

                    {/* Image Placeholder */}
                    <div className={`${isList ? 'w-32 h-32 md:w-48 md:h-48 rounded-xl' : 'aspect-square w-full'} bg-slate-200 dark:bg-slate-700/50 p-4`}></div>

                    {/* Content Placeholder */}
                    <div className={`${isList ? 'flex flex-col flex-grow py-2 px-0' : 'p-5 flex flex-col flex-grow space-y-3'}`}>
                        {/* Category */}
                        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-3"></div>

                        {/* Title */}
                        <div className="space-y-2 mb-4">
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
                        </div>

                        {/* Description for List View */}
                        {isList && (
                            <div className="space-y-2 mb-4 hidden md:block">
                                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
                            </div>
                        )}

                        {/* Rating */}
                        <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-4"></div>

                        {/* Price & Button Action */}
                        <div className={`mt-auto flex items-center ${isList ? 'justify-start gap-8' : 'justify-between'}`}>
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
