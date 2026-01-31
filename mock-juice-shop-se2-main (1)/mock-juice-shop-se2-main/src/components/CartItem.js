import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    const itemTotal = (item.product.price * item.quantity).toFixed(2);

    return (
        <div
            className="cart-item"
            data-product-id={item.product.id}
            data-testid={`cart-item-${item.product.id}`}
        >
            <div className="cart-item-icon">{item.product.icon}</div>
            <div className="cart-item-details">
                <div className="cart-item-name">{item.product.name}</div>
                <div className="cart-item-price">€{item.product.price.toFixed(2)} each</div>
            </div>
            <div className="cart-item-controls">
                <div className="quantity-controls">
                    <button
                        className="quantity-btn decrease-btn"
                        data-product-id={item.product.id}
                        data-testid={`decrease-${item.product.id}`}
                        onClick={() => updateQuantity(item.product.id, -1)}
                    >
                        -
                    </button>
                    <span
                        className="quantity-display"
                        data-testid={`quantity-${item.product.id}`}
                    >
                        {item.quantity}
                    </span>
                    <button
                        className="quantity-btn increase-btn"
                        data-product-id={item.product.id}
                        data-testid={`increase-${item.product.id}`}
                        onClick={() => updateQuantity(item.product.id, 1)}
                    >
                        +
                    </button>
                </div>
                <div className="cart-item-price" data-testid={`item-total-${item.product.id}`}>
                    €{itemTotal}
                </div>
                <button
                    className="btn btn-danger remove-btn"
                    data-product-id={item.product.id}
                    data-testid={`remove-${item.product.id}`}
                    onClick={() => removeFromCart(item.product.id)}
                >
                    Remove
                </button>
            </div>
        </div>
    );
};

export default CartItem;
