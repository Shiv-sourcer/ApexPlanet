import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser'; // 1. Import the EmailJS library
import './CheckoutPage.css';
import SuccessModal from '../components/SuccessModal';

// 2. Receive the clearCart function as a prop
const CheckoutPage = ({ onLoaded, clearCart }) => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: '',
        paymentMethod: 'cod',
    });
    const [isOrderPlaced, setIsOrderPlaced] = useState(false); // State to control modal visibility
    const navigate = useNavigate();

    useEffect(() => {
        if (onLoaded) {
            onLoaded();
        }
    }, [onLoaded]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // 3. Update the handleSubmit function
    const handleSubmit = (e) => {
        e.preventDefault();

        // --- IMPORTANT: Replace these with your actual credentials from EmailJS ---
        const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const templateID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

        // Create the object of variables for your EmailJS template
        const templateParams = {
            user_name: formData.fullName,
            user_email: formData.email,
            user_phone: formData.phone,
            user_address: formData.address,
            user_city: formData.city,
            user_state: formData.state,
            user_zip: formData.zip,
            payment_method: formData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Paid Online',
        };

        // Send the email using EmailJS
        emailjs.send(serviceID, templateID, templateParams, publicKey)
            .then((response) => {
                console.log('Email sent successfully!', response.status, response.text);
                setIsOrderPlaced(true); // Show the success modal
                if (clearCart) {
                    clearCart(); // Clear the cart
                }
            })
            .catch((err) => {
                console.error('Failed to send email:', err);
                alert('There was an error placing your order. Please try again.');
            });
    };

    const handleCloseModal = () => {
        setIsOrderPlaced(false);
        navigate('/products');
    };

    return (
        <>
            {isOrderPlaced && <SuccessModal onClose={handleCloseModal} />}
            <div className="checkout-page">
                <div className="checkout-container">
                    <h1 className="checkout-title">Shipping Details</h1>
                    <p className="checkout-subtitle">Please fill out your information to complete the purchase.</p>

                    <form onSubmit={handleSubmit} className="checkout-form">
                        <div className="form-group">
                            <label htmlFor="fullName">Full Name <span className="required-star">*</span></label>
                            <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">Email Address <span className="required-star">*</span></label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="phone">Phone Number <span className="required-star">*</span></label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="address">Delivery Address <span className="required-star">*</span></label>
                            <input type="text" id="address" name="address" value={formData.address} onChange={handleInputChange} required />
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="city">City <span className="required-star">*</span></label>
                                <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="state">State <span className="required-star">*</span></label>
                                <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label htmlFor="zip">PIN Code <span className="required-star">*</span></label>
                                <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleInputChange} required />
                            </div>
                        </div>

                        <h2 className="payment-title">Payment Method <span className="required-star">*</span></h2>
                        <div className="payment-options">
                            <label className="payment-option">
                                <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleInputChange} />
                                <div className="payment-details">
                                    <strong>Cash on Delivery</strong>
                                    <span>Pay upon arrival</span>
                                </div>
                            </label>
                            <label className="payment-option">
                                <input type="radio" name="paymentMethod" value="online" checked={formData.paymentMethod === 'online'} onChange={handleInputChange} />
                                <div className="payment-details">
                                    <strong>Pay Online</strong>
                                    <span>UPI, Cards, Netbanking</span>
                                </div>
                            </label>
                        </div>

                        <button type="submit" className="place-order-button">Place Order</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default CheckoutPage;
