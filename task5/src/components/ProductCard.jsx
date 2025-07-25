import React, { useState } from 'react';
import './ProductCard.css';

// 1. A helper function to format the price based on the selected currency
const formatCurrency = (price, currency, exchangeRate) => {
    const convertedPrice = price * exchangeRate;
    // Use the built-in Intl.NumberFormat for perfect currency formatting
    const options = { style: 'currency', currency: currency, minimumFractionDigits: 2 };
    return new Intl.NumberFormat(undefined, options).format(convertedPrice);
};

// 2. Receive currency and exchangeRate as props
const ProductCard = ({ product, addToCart, currency, exchangeRate }) => {
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCartClick = () => {
        addToCart(product);
        setIsAdded(true);

        setTimeout(() => {
            setIsAdded(false);
        }, 1500);
    };

    return (
        <div className="product-card">
            <div className="image-container">
                <img src={product.image} alt={product.name} loading="lazy" />
            </div>
            <div className="card-content">
                <h3>{product.name}</h3>
                {/* 3. Use the helper function to display the correctly formatted price */}
                <p className="price">
                    {formatCurrency(product.price, currency, exchangeRate)}
                </p>
                <button 
                    onClick={handleAddToCartClick} 
                    className={isAdded ? 'add-to-cart-btn added' : 'add-to-cart-btn'}
                    disabled={isAdded}
                >
                    {isAdded ? '✓ Added!' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
