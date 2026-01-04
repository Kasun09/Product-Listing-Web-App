import React, { createContext, useContext, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const FavouriteContext = createContext();

export const useFavourites = () => {
    return useContext(FavouriteContext);
};

export const FavouriteProvider = ({ children }) => {
    const [favourites, setFavourites] = useLocalStorage('product-favourites', []);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleFavorite = (productId) => {
        setFavourites((prev) => {
            if (prev.includes(productId)) {
                return prev.filter((id) => id !== productId);
            } else {
                return [...prev, productId];
            }
        });
    };

    const isFavorite = (productId) => {
        return favourites.includes(productId);
    };

    return (
        <FavouriteContext.Provider value={{
            favourites,
            toggleFavorite,
            isFavorite,
            isSidebarOpen,
            setIsSidebarOpen
        }}>
            {children}
        </FavouriteContext.Provider>
    );
};
