import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingOverlay from './components/LoadingOverlay';
import ToastNotification from './components/ToastNotification';

// Import pages
const HomePage = lazy(() => import('./pages/HomePage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));

// Helper component to manage loading state on route change
const PageLoader = ({ setIsLoading }) => {
    const location = useLocation();
    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500); // Adjust delay as needed

        return () => clearTimeout(timer);
    }, [location, setIsLoading]);

    return null; // This component doesn't render anything
};


const App = () => {
    const [cartItems, setCartItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState(null);
    const [currency, setCurrency] = useState('USD');
    
    const exchangeRates = { USD: 1, INR: 83.50, EUR: 0.92 };
    const handleCurrencyChange = (newCurrency) => setCurrency(newCurrency);

    const handleAddToCart = (product) => {
        setCartItems(prevItems => {
            const itemExists = prevItems.find(item => item.id === product.id);
            if (itemExists) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prevItems, { ...product, quantity: 1 }];
        });
    };

    const addItemAndShowToast = (product) => {
        handleAddToCart(product);
        setToast(`${product.name} was added to your cart!`);
    };
    
    const removeFromCart = (productId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
    };

    const increaseQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    const decreaseQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0)
        );
    };

    const clearCart = () => {
        setCartItems([]);
        setToast('Your cart has been cleared.');
    };

    const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <Router>
            {isLoading && <LoadingOverlay />}
            {toast && <ToastNotification message={toast} onClose={() => setToast(null)} />}
            
            <PageLoader setIsLoading={setIsLoading} />
            
            <Header cartItemCount={cartItemCount} />
            
            <main>
                <Suspense fallback={<LoadingOverlay />}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route 
                            path="/products" 
                            element={<ProductsPage 
                                addToCart={addItemAndShowToast} 
                                currency={currency}
                                exchangeRate={exchangeRates[currency]}
                                onCurrencyChange={handleCurrencyChange}
                            />} 
                        />
                        <Route 
                            path="/cart" 
                            element={<CartPage 
                                cartItems={cartItems} 
                                removeFromCart={removeFromCart}
                                increaseQuantity={increaseQuantity}
                                decreaseQuantity={decreaseQuantity}
                                clearCart={clearCart}
                                currency={currency}
                                exchangeRate={exchangeRates[currency]}
                            />} 
                        />
                        {/* The change is on this line: added clearCart={clearCart} */}
                        <Route path="/checkout" element={<CheckoutPage clearCart={clearCart} />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer />
        </Router>
    );
};

export default App;
