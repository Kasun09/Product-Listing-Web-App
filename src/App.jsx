import React from 'react';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import { FavouriteProvider } from './context/FavouriteContext';
import Footer from './components/Footer';

import FavoritesSidebar from './components/FavoritesSidebar';

function App() {
  return (
    <FavouriteProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans flex flex-col">
        <Navbar />
        <FavoritesSidebar />
        <main className="flex-grow">
          <ProductList />
        </main>
        <Footer />
      </div>
    </FavouriteProvider>
  );
}

export default App;
