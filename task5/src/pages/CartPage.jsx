import React from 'react'; // useEffect is no longer needed here
import { Link } from 'react-router-dom';
import './CartPage.css';

// A helper function to format the price based on the selected currency
const formatCurrency = (price, currency, exchangeRate) => {
    const convertedPrice = price * exchangeRate;
    const options = { style: 'currency', currency: currency, minimumFractionDigits: 2 };
    return new Intl.NumberFormat(undefined, options).format(convertedPrice);
};

// 1. Remove the onLoaded function from the props
const CartPage = ({ cartItems, removeFromCart, increaseQuantity, decreaseQuantity, clearCart, currency, exchangeRate }) => {
    
    // 2. The useEffect hook for onLoaded has been removed from here.

    // Calculate the total price in the base currency (USD)
    const totalPriceInBase = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart-page">
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className="cart-empty">Your cart is empty.</p>
            ) : (
                <>
                    <div className="cart-items">
                        {cartItems.map(item => (
                            <div key={item.id} className="cart-item">
                                <img src={item.image} alt={item.name} />
                                <div className="item-details">
                                    <h2>{item.name}</h2>
                                    <div className="quantity-controls">
                                        <button onClick={() => decreaseQuantity(item.id)} className="quantity-btn">-</button>
                                        <span className="quantity-display">{item.quantity}</span>
                                        <button onClick={() => increaseQuantity(item.id)} className="quantity-btn">+</button>
                                    </div>
                                </div>
                                <p className="item-price">
                                    {formatCurrency(item.price * item.quantity, currency, exchangeRate)}
                                </p>
                                <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-actions">
                        <button onClick={clearCart} className="clear-cart-btn">
                            Clear All Items
                        </button>
                        <div className="cart-summary">
                            <h2>Total: {formatCurrency(totalPriceInBase, currency, exchangeRate)}</h2>
                            <Link to="/checkout" className="checkout-btn">
                                Proceed to Checkout
                            </Link>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default CartPage;
