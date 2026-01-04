import React, { useState, useEffect, useMemo } from 'react';
import { PackageSearch } from 'lucide-react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import SortDropdown from '../components/SortDropdown';
import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import useDebounce from '../hooks/useDebounce';
import { isRecommended, calculateAveragePrice } from '../utils/recommendation';
import { useFavourites } from '../context/FavouriteContext';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filter & Sort States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('default');

    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const { favourites, toggleFavorite, isFavorite } = useFavourites();

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        setLoading(true);
        setError(null);
        try {
            // Wait for both the API call and a minimum delay of 800ms to ensure the loader is visible and preventing flickering
            const [data] = await Promise.all([
                fetchProducts(),
                new Promise(resolve => setTimeout(resolve, 800))
            ]);
            setProducts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Calculate derived data
    const categories = useMemo(() => {
        const uniqueCategories = [...new Set(products.map(p => p.category))];
        return uniqueCategories;
    }, [products]);

    const averagePrice = useMemo(() => calculateAveragePrice(products), [products]);

    // Main Filtering & Sorting Logic
    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        // 1. Filter by Category
        if (selectedCategory !== 'all') {
            result = result.filter(product => product.category === selectedCategory);
        }

        // 2. Filter by Search Term
        if (debouncedSearchTerm) {
            const lowerTerm = debouncedSearchTerm.toLowerCase();
            result = result.filter(product =>
                product.title.toLowerCase().includes(lowerTerm)
            );
        }

        // 3. Sort
        if (sortOption === 'price-asc') {
            result.sort((a, b) => a.price - b.price);
        } else if (sortOption === 'price-desc') {
            result.sort((a, b) => b.price - a.price);
        }

        // 4. Add Recommendation Flag
        // We map new objects to avoid mutating original state, although strictly not necessary if just reading,
        // but good for injecting the 'recommended' property for the UI to use.
        return result.map(product => ({
            ...product,
            recommended: isRecommended(product, averagePrice)
        }));

    }, [products, selectedCategory, debouncedSearchTerm, sortOption, averagePrice]);

    // Renders
    if (error) {
        return <ErrorMessage message={error} onRetry={loadProducts} />;
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20 transition-colors duration-300">
            {/* Header / Controls Section */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40 transition-colors duration-300">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                                Discover Products
                            </h1>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                                <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />
                            </div>
                        </div>

                        <CategoryFilter
                            categories={categories}
                            selectedCategory={selectedCategory}
                            onSelectCategory={setSelectedCategory}
                        />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <Loader />
                ) : filteredAndSortedProducts.length > 0 ? (
                    <>
                        <p className="text-sm text-slate-500 mb-6 font-medium">
                            Showing {filteredAndSortedProducts.length} results
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredAndSortedProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    isFavorite={isFavorite(product.id)}
                                    toggleFavorite={toggleFavorite}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                        <PackageSearch className="h-16 w-16 mb-4 opacity-50" />
                        <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-300 mb-2">No products found</h3>
                        <p className="text-slate-500 dark:text-slate-500">Try adjusting your search or filter to find what you're looking for.</p>
                        <button
                            onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}
                            className="mt-6 text-indigo-600 hover:text-indigo-500 font-medium"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;