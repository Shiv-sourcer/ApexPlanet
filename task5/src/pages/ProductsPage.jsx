import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/mockAPI';
import './ProductsPage.css';

// 1. Remove the onLoaded prop from the component's arguments
const ProductsPage = ({ addToCart, currency, exchangeRate, onCurrencyChange }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);

    // 2. The useEffect hook is simplified. It no longer needs to call onLoaded().
    // The dependency array is now empty, so it only runs once when the component mounts.
    useEffect(() => {
        const getProductsAndCategories = async () => {
            try {
                const productData = await fetchProducts();
                setAllProducts(productData);
                setFilteredProducts(productData);
                const uniqueCategories = [...new Set(productData.map(p => p.category))];
                setCategories(uniqueCategories);
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                // The onLoaded() call is removed from here.
                setLoading(false);
            }
        };
        
        getProductsAndCategories();
    }, []); // The dependency array is now empty.

    useEffect(() => {
        let result = allProducts;

        if (searchTerm) {
            result = result.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (selectedCategory !== 'all') {
            result = result.filter(product => product.category === selectedCategory);
        }

        setFilteredProducts(result);
    }, [searchTerm, selectedCategory, allProducts]);

    return (
        <div className="products-page">
            <h1>Our Products</h1>

            <div className="filter-bar">
                <input
                    type="text"
                    placeholder="Search for products..."
                    className="search-input"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                />
                
                <div className="filter-selectors">
                    <select
                        className="category-select"
                        value={selectedCategory}
                        onChange={e => setSelectedCategory(e.target.value)}
                    >
                        <option value="all">All Categories</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </option>
                        ))}
                    </select>
                    
                    <select
                        className="currency-select"
                        value={currency}
                        onChange={e => onCurrencyChange(e.target.value)}
                    >
                        <option value="USD">USD ($)</option>
                        <option value="INR">INR (₹)</option>
                        <option value="EUR">EUR (€)</option>
                    </select>
                </div>
            </div>

            {!loading ? (
                <div className="product-grid">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map(product => (
                            <ProductCard 
                                key={product.id} 
                                product={product} 
                                addToCart={addToCart}
                                currency={currency}
                                exchangeRate={exchangeRate}
                            />
                        ))
                    ) : (
                        <p className="no-results">No products found. Try adjusting your search.</p>
                    )}
                </div>
            ) : (
                // This loader is a good fallback for the initial data fetch
                <div className="loader">Preparing products...</div>
            )}
        </div>
    );
};

export default ProductsPage;
