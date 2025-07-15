// src/App.jsx
import React, { useState } from "react";
import productsData from "./data/products";
import ProductCard from "./components/ProductCard";
import FilterSortBar from "./components/FilterSortBar";

const App = () => {
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  let filteredProducts = [...productsData];

  if (filter !== "All") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === filter
    );
  }

  if (sortBy === "price-asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="container">
      <h1 className="main-heading">MART</h1>
      <FilterSortBar
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default App;
