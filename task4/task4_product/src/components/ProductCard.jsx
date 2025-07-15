// src/components/ProductCard.jsx
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <div className="product-card">
      <img
    src={product.image}
    srcSet={product.srcSet}
    alt={product.name}
    className="product-image"
  />


      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <p className="category">{product.category}</p>
    </div>
  );
};

export default ProductCard;
