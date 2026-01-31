import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CartSummary = ({ onCheckoutComplete }) => {
    const { getSubtotal, getTotal } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        address: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        address: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Clear previous errors
        setErrors({ name: '', email: '', address: '' });

        // Validate form
        const newErrors = {};
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
            isValid = false;
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email';
            isValid = false;
        }

        if (!formData.address.trim()) {
            newErrors.address = 'Address is required';
            isValid = false;
        }

        if (!isValid) {
            setErrors(newErrors);
            return;
        }

        // Process order
        const orderNumber = 'ORD-' + Date.now().toString(36).toUpperCase();
        const total = getTotal();

        onCheckoutComplete({
            orderNumber,
            customerName: formData.name,
            email: formData.email,
            total
        });
    };

    const subtotal = getSubtotal();
    const total = getTotal();

    return (
        <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
                <span>Subtotal:</span>
                <span id="subtotal" data-testid="subtotal">€{subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
                <span>Shipping:</span>
                <span id="shipping">€5.00</span>
            </div>
            <div className="summary-row total">
                <span>Total:</span>
                <span id="total" data-testid="total">€{total.toFixed(2)}</span>
            </div>

            {/* Checkout Form */}
            <form id="checkout-form" className="checkout-form" onSubmit={handleSubmit}>
                <h4>Customer Information</h4>
                <div className="form-group">
                    <label htmlFor="customer-name">Name *</label>
                    <input
                        type="text"
                        id="customer-name"
                        name="name"
                        data-testid="customer-name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <span className="error-message" id="name-error">
                        {errors.name}
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="customer-email">Email *</label>
                    <input
                        type="email"
                        id="customer-email"
                        name="email"
                        data-testid="customer-email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <span className="error-message" id="email-error">
                        {errors.email}
                    </span>
                </div>
                <div className="form-group">
                    <label htmlFor="customer-address">Address *</label>
                    <textarea
                        id="customer-address"
                        name="address"
                        rows="3"
                        data-testid="customer-address"
                        value={formData.address}
                        onChange={handleChange}
                    ></textarea>
                    <span className="error-message" id="address-error">
                        {errors.address}
                    </span>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    id="checkout-button"
                    data-testid="checkout-button"
                >
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default CartSummary;
