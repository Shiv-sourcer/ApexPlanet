import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessModal.css';

/**
 * A modal component to show a success message after placing an order.
 * @param {Object} props - The component's props.
 * @param {function} props.onClose - Function to call when the modal is closed.
 */
const SuccessModal = ({ onClose }) => {
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <div className="modal-icon">✓</div>
                <h2 className="modal-title">Order Placed Successfully!</h2>
                <p className="modal-message">
                    Thank you for your purchase. You will receive an email confirmation shortly.
                </p>
                <Link to="/products" onClick={onClose} className="modal-button">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default SuccessModal;
