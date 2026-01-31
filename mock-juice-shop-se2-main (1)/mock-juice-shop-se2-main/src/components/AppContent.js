import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import Header from './Header';
import ProductList from './ProductList';
import Cart from './Cart';
import Confirmation from './Confirmation';
import Footer from './Footer';

function AppContent() {
  const [currentView, setCurrentView] = useState('products');
  const [orderData, setOrderData] = useState(null);
  const { clearCart } = useCart();

  const handleCheckoutComplete = (data) => {
    setOrderData(data);
    setCurrentView('confirmation');
  };

  const handleNewOrder = () => {
    clearCart();
    setOrderData(null);
    setCurrentView('products');
  };

  return (
    <>
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      
      <main className="container">
        {currentView === 'products' && <ProductList />}
        {currentView === 'cart' && (
            <Cart
              setCurrentView={setCurrentView}
              onCheckoutComplete={handleCheckoutComplete}
            />
          )}
        {currentView === 'confirmation' && orderData && (
          <Confirmation
            orderData={orderData}
            onNewOrder={handleNewOrder}
          />
        )}
      </main>

      <Footer />
    </>
  );
}

export default AppContent;
