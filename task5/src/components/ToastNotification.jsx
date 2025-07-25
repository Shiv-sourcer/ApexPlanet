import React, { useEffect } from 'react';
import './ToastNotification.css';

/**
 * A notification component that appears and then automatically disappears.
 * @param {Object} props - The component's props.
 * @param {string} props.message - The message to display in the toast.
 * @param {function} props.onClose - The function to call to remove the toast.
 */
const ToastNotification = ({ message, onClose }) => {
    // Set a timer to automatically close the notification after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000); // 3 seconds

        // Cleanup the timer if the component is unmounted early
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="toast-notification">
            <span className="toast-icon">✓</span>
            {message}
        </div>
    );
};

export default ToastNotification;
