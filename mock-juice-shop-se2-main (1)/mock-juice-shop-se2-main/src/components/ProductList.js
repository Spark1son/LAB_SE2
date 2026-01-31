import React, { useState, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from './ProductCard';

const ProductList = () => {
    const { addToCart } = useCart();
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('all');
    const [sortBy, setSortBy] = useState('name');
    const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);

    useEffect(() => {
        let filtered = PRODUCTS.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = category === 'all' || product.category === category;
            return matchesSearch && matchesCategory;
        });

        // Sort products
        filtered = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case 'name':
                    return a.name.localeCompare(b.name);
                case 'price-low':
                    return a.price - b.price;
                case 'price-high':
                    return b.price - a.price;
                default:
                    return 0;
            }
        });

        setFilteredProducts(filtered);
    }, [searchTerm, category, sortBy]);

    return (
        <section id="products-section" className="section active">
            <h2>Our Products</h2>

            {/* Search and Filter */}
            <div className="filters">
                <input
                    type="text"
                    id="search-input"
                    className="search-box"
                    placeholder="Search products..."
                    data-testid="search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                    id="category-filter"
                    className="filter-select"
                    data-testid="category-filter"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="all">All Categories</option>
                    <option value="fruit">Fruit Juices</option>
                    <option value="vegetable">Vegetable Juices</option>
                    <option value="mixed">Mixed Juices</option>
                </select>
                <select
                    id="sort-select"
                    className="filter-select"
                    data-testid="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="name">Sort by Name</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>

            {/* Product Count */}
            <p className="product-count">
                Showing <span id="product-count">{filteredProducts.length}</span> products
            </p>

            {/* Products Grid */}
            <div id="products-grid" className="products-grid">
                {filteredProducts.length === 0 ? (
                    <p style={{ gridColumn: '1/-1', textAlign: 'center', color: '#666', padding: '2rem' }}>
                        No products found
                    </p>
                ) : (
                    filteredProducts.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={addToCart}
                        />
                    ))
                )}
            </div>
        </section>
    );
};

export default ProductList;
