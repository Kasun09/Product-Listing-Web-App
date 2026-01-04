import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
    return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-full mb-4">
                <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Oops! Something went wrong</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-6">{message || "We couldn't load the products. Please try again."}</p>
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    <RefreshCw className="h-4 w-4" />
                    Try Again
                </button>
            )}
        </div>
    );
};

export default ErrorMessage;
