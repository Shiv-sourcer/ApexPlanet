import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Remove the CartProvider import and wrapper
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);