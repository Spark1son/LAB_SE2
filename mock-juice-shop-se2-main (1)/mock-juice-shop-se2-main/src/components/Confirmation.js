import React from 'react';

const Confirmation = ({ orderData, onNewOrder }) => {
    return (
        <section id="confirmation-section" className="section active">
            <div className="confirmation-message">
                <div className="success-icon">✓</div>
                <h2>Order Placed Successfully!</h2>
                <p>Thank you for your order, <span id="order-customer-name">{orderData.customerName}</span>!</p>
                <p>Order Number: <strong id="order-number">{orderData.orderNumber}</strong></p>
                <p>Total Amount: <strong id="order-total">€{orderData.total.toFixed(2)}</strong></p>
                <p>A confirmation email has been sent to <span id="order-email">{orderData.email}</span></p>
                <button
                    id="new-order"
                    className="btn btn-primary"
                    onClick={onNewOrder}
                >
                    Start New Order
                </button>
            </div>
        </section>
    );
};

export default Confirmation;
