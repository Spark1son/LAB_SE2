import React from 'react';
import { useCart } from '../context/CartContext';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

const Cart = ({ setCurrentView, onCheckoutComplete }) => {
    const { cart } = useCart();

    if (cart.length === 0) {
        return (
            <section id="cart-section" className="section active">
                <h2>Shopping Cart</h2>
                <div id="empty-cart" className="empty-cart">
                    <p>Your cart is empty</p>
                    <button
                        id="continue-shopping"
                        className="btn btn-secondary"
                        onClick={() => setCurrentView('products')}
                    >
                        Continue Shopping
                    </button>
                </div>
            </section>
        );
    }

    return (
        <section id="cart-section" className="section active">
            <h2>Shopping Cart</h2>
            <div id="cart-content" className="cart-content">
                {/* Cart Items */}
                <div id="cart-items" className="cart-items">
                    {cart.map(item => (
                        <CartItem key={item.product.id} item={item} />
                    ))}
                </div>

                {/* Cart Summary */}
                <CartSummary onCheckoutComplete={onCheckoutComplete} />
            </div>
        </section>
    );
};

export default Cart;
