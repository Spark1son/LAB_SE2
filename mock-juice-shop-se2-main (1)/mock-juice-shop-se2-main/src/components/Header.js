import React from 'react';
import { useCart } from '../context/CartContext';

const Header = ({ currentView, setCurrentView }) => {
    const { getCartCount } = useCart();

    return (
        <header id="header">
            <div className="container">
                <h1 className="logo">🍹 Juice Shop</h1>
                <nav>
                    <button
                        id="view-products"
                        className={`nav-button ${currentView === 'products' ? 'active' : ''}`}
                        data-testid="products-nav"
                        onClick={() => setCurrentView('products')}
                    >
                        Products
                    </button>
                    <button
                        id="view-cart"
                        className={`nav-button ${currentView === 'cart' ? 'active' : ''}`}
                        data-testid="cart-nav"
                        onClick={() => setCurrentView('cart')}
                    >
                        Cart (<span id="cart-count">{getCartCount()}</span>)
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
