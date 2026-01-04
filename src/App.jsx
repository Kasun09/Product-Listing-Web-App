import React from 'react';
import Navbar from './components/Navbar';
import ProductList from './pages/ProductList';
import { FavouriteProvider } from './context/FavouriteContext';

function App() {
  return (
    <FavouriteProvider>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300 font-sans">
        <Navbar />
        <main>
          <ProductList />
        </main>
      </div>
    </FavouriteProvider>
  );
}

export default App;
