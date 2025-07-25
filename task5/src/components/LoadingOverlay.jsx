import React from 'react';
import './LoadingOverlay.css';

/**
 * A full-screen overlay with a loading bar at the top.
 */
const LoadingOverlay = () => {
    return (
        <div className="loading-overlay">
            <div className="loader-line-container">
                <div className="loader-line"></div>
            </div>
        </div>
    );
};

export default LoadingOverlay;
