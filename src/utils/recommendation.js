export const isRecommended = (product, averagePrice) => {
    // Logic: Rating > 4 OR price below average
    return product.rating.rate > 4 || product.price < averagePrice;
};

export const calculateAveragePrice = (products) => {
    if (products.length === 0) return 0;
    const total = products.reduce((sum, item) => sum + item.price, 0);
    return total / products.length;
};