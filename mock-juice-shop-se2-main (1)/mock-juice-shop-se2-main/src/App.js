import React from 'react';
import './App.css';
import { CartProvider } from './context/CartContext';
import AppContent from './components/AppContent';

function App() {
  return (
    <CartProvider>
      <div className="App">
        <AppContent />
      </div>
    </CartProvider>
  );
}

export default App;
