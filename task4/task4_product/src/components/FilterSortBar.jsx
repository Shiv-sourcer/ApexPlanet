// src/components/FilterSortBar.jsx
import React from "react";

const FilterSortBar = ({ filter, setFilter, sortBy, setSortBy }) => {
  return (
    <div className="filter-bar">
      <select className="filter-curser" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="All">All Categories</option>
        <option value="Books">Books</option>
        <option value="Electronics">Electronics</option>
        <option value="Clothing">Clothing</option>
      </select>

      <select className="filter-curser" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="default">Sort by</option>
        <option value="price-asc">Price (Low to High)</option>
        <option value="price-desc">Price (High to Low)</option>
      </select>
    </div>
  );
};

export default FilterSortBar;
