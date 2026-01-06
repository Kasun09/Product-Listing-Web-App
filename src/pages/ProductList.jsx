import React, { useState, useEffect, useMemo } from 'react';
import { PackageSearch, LayoutGrid, LayoutList, Filter } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
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
import ProductDetailsModal from '../components/ProductDetailsModal';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 8;

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // Filter & Sort States
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('default');
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

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

    // Pagination Logic
    const totalPages = Math.ceil(filteredAndSortedProducts.length / ITEMS_PER_PAGE);

    const paginatedProducts = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredAndSortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredAndSortedProducts, currentPage]);

    // Reset pagination when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory, debouncedSearchTerm, sortOption]);

    // Scroll to top when page changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    // Renders
    if (error) {
        return <ErrorMessage message={error} onRetry={loadProducts} />;
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-900 min-h-screen pb-20 transition-colors duration-300">
            {/* Header / Controls Section */}
            <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-16 z-40 transition-colors duration-300 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col gap-6">

                        {/* 1. Search Bar - Centered & Wide */}
                        <div className="w-full flex justify-center">
                            <SearchBar
                                searchTerm={searchTerm}
                                onSearchChange={setSearchTerm}
                                className="max-w-3xl shadow-sm hover:shadow-md transition-shadow"
                            />
                        </div>


                        {/* 2. Controls Toolbar */}
                        {/* Mobile Filter Toggle */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="w-full flex items-center justify-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 py-3 rounded-xl font-medium transition-all active:scale-95"
                            >
                                <Filter className="w-4 h-4" />
                                {showFilters ? 'Hide Filters' : 'Filter & Sort'}
                            </button>
                        </div>

                        <div className={`flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-300 ease-in-out origin-top ${showFilters ? 'max-h-[500px] opacity-100 mb-4' : 'max-h-0 opacity-0 overflow-hidden md:max-h-none md:opacity-100 md:overflow-visible'}`}>

                            {/* Sort - Left Side */}
                            <div className="flex-shrink-0 pt-2 md:pt-0">
                                <SortDropdown sortOption={sortOption} onSortChange={setSortOption} />
                            </div>

                            {/* Categories & View Toggle - Right Side */}
                            <div className="flex-grow flex flex-col md:flex-row md:items-center justify-end gap-4 overflow-hidden">
                                <div className="overflow-x-auto pb-2 md:pb-0 scrollbar-hide w-full md:w-auto">
                                    <CategoryFilter
                                        categories={categories}
                                        selectedCategory={selectedCategory}
                                        onSelectCategory={setSelectedCategory}
                                    />
                                </div>

                                {/* View Toggle */}
                                <div className="flex-shrink-0 flex bg-slate-100 dark:bg-slate-800 p-1 rounded-lg self-end md:self-auto">
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                        title="List View"
                                    >
                                        <LayoutList className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-700 shadow text-indigo-600 dark:text-indigo-400' : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'}`}
                                        title="Grid View"
                                    >
                                        <LayoutGrid className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {loading ? (
                    <Loader viewMode={viewMode} />
                ) : filteredAndSortedProducts.length > 0 ? (
                    <>
                        <div className="flex justify-between items-center mb-6">
                            <p className="text-sm text-slate-500 font-medium">
                                Showing {filteredAndSortedProducts.length} results
                            </p>
                        </div>

                        <motion.div
                            layout
                            className={viewMode === 'grid'
                                ? "grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-6"
                                : "flex flex-col gap-4"
                            }>
                            <AnimatePresence mode='popLayout'>
                                {paginatedProducts.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        isFavorite={isFavorite(product.id)}
                                        toggleFavorite={toggleFavorite}
                                        viewMode={viewMode}
                                        onViewDetails={setSelectedProduct}
                                    />
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
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

            {/* Product Details Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <ProductDetailsModal
                        key="product-details-modal"
                        product={selectedProduct}
                        onClose={() => setSelectedProduct(null)}
                        isFavorite={isFavorite(selectedProduct.id)}
                        toggleFavorite={toggleFavorite}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProductList;