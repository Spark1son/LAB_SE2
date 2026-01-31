import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div
            className="product-card"
            data-product-id={product.id}
            data-testid={`product-${product.id}`}
        >
            <div className="product-icon">{product.icon}</div>
            <h3 className="product-name">{product.name}</h3>
            <span className="product-category" data-category={product.category}>
                {product.category}
            </span>
            <p className="product-description">{product.description}</p>
            <div className="product-footer">
                <span className="product-price" data-testid={`price-${product.id}`}>
                    €{product.price.toFixed(2)}
                </span>
                <button
                    className="btn btn-primary add-to-cart-btn"
                    data-product-id={product.id}
                    data-testid={`add-to-cart-${product.id}`}
                    onClick={() => onAddToCart(product)}
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
