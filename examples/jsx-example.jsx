import React, { useState } from 'react';
import { FilterChips } from '../dist/index.esm.js';
import '../dist/index.css';

// Sample data for JSX example
const sampleData = [
  { id: 1, name: 'Apple iPhone 15', category: 'Electronics', price: 999, brand: 'Apple' },
  { id: 2, name: 'Samsung Galaxy S24', category: 'Electronics', price: 899, brand: 'Samsung' },
  { id: 3, name: 'MacBook Pro', category: 'Computers', price: 1999, brand: 'Apple' },
  { id: 4, name: 'Dell XPS 13', category: 'Computers', price: 1299, brand: 'Dell' },
  { id: 5, name: 'AirPods Pro', category: 'Electronics', price: 249, brand: 'Apple' },
  { id: 6, name: 'Sony WH-1000XM5', category: 'Electronics', price: 399, brand: 'Sony' },
];

// Filter chips configuration
const categoryChips = [
  { id: 'electronics', label: 'Electronics', value: 'Electronics' },
  { id: 'computers', label: 'Computers', value: 'Computers' },
];

const brandChips = [
  { id: 'apple', label: 'Apple', value: 'Apple' },
  { id: 'samsung', label: 'Samsung', value: 'Samsung' },
  { id: 'dell', label: 'Dell', value: 'Dell' },
  { id: 'sony', label: 'Sony', value: 'Sony' },
];

const priceChips = [
  { 
    id: 'budget', 
    label: 'Under $500', 
    value: (price) => price < 500,
    backgroundColor: '#d4edda',
    color: '#155724'
  },
  { 
    id: 'mid-range', 
    label: '$500 - $1000', 
    value: (price) => price >= 500 && price <= 1000,
    backgroundColor: '#fff3cd',
    color: '#856404'
  },
  { 
    id: 'premium', 
    label: 'Over $1000', 
    value: (price) => price > 1000,
    backgroundColor: '#f8d7da',
    color: '#721c24'
  },
];

function JSXExample() {
  const [filteredData, setFilteredData] = useState(sampleData);
  const [activeFilters, setActiveFilters] = useState({
    category: [],
    brand: [],
    price: []
  });

  const handleCategoryClick = (chip, filtered) => {
    console.log('Category chip clicked:', chip.label, 'Filtered data:', filtered);
    setFilteredData(filtered);
    setActiveFilters(prev => ({
      ...prev,
      category: prev.category.includes(chip.id) 
        ? prev.category.filter(id => id !== chip.id)
        : [...prev.category, chip.id]
    }));
  };

  const handleBrandClick = (chip, filtered) => {
    console.log('Brand chip clicked:', chip.label, 'Filtered data:', filtered);
    setFilteredData(filtered);
    setActiveFilters(prev => ({
      ...prev,
      brand: prev.brand.includes(chip.id) 
        ? prev.brand.filter(id => id !== chip.id)
        : [...prev.brand, chip.id]
    }));
  };

  const handlePriceClick = (chip, filtered) => {
    console.log('Price chip clicked:', chip.label, 'Filtered data:', filtered);
    setFilteredData(filtered);
    setActiveFilters(prev => ({
      ...prev,
      price: prev.price.includes(chip.id) 
        ? prev.price.filter(id => id !== chip.id)
        : [...prev.price, chip.id]
    }));
  };

  const clearAllFilters = () => {
    setFilteredData(sampleData);
    setActiveFilters({ category: [], brand: [], price: [] });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>React Filter Chips - JSX Example</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Product Filtering Demo</h2>
        <p>This example shows how to use the FilterChips component in a plain JSX application</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Filter by Category</h3>
        <FilterChips
          chips={categoryChips}
          onChipClick={handleCategoryClick}
          data={sampleData}
          filterKey="category"
          multiSelect={true}
          showClearAll={true}
          clearAllText="Clear Categories"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Filter by Brand</h3>
        <FilterChips
          chips={brandChips}
          onChipClick={handleBrandClick}
          data={sampleData}
          filterKey="brand"
          multiSelect={true}
          maxChips={2}
          showMoreText="Show More Brands"
          showLessText="Show Less"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Filter by Price Range</h3>
        <FilterChips
          chips={priceChips}
          onChipClick={handlePriceClick}
          data={sampleData}
          filterKey="price"
          multiSelect={true}
          searchable={true}
          searchPlaceholder="Search price ranges..."
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={clearAllFilters}
          style={{
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          Clear All Filters
        </button>
        
        <div style={{ marginTop: '10px', fontSize: '14px', color: '#6c757d' }}>
          <strong>Active Filters:</strong>
          <div style={{ marginTop: '5px' }}>
            Categories: {activeFilters.category.length > 0 ? activeFilters.category.join(', ') : 'None'}
          </div>
          <div>
            Brands: {activeFilters.brand.length > 0 ? activeFilters.brand.join(', ') : 'None'}
          </div>
          <div>
            Price Ranges: {activeFilters.price.length > 0 ? activeFilters.price.join(', ') : 'None'}
          </div>
        </div>
      </div>

      <div>
        <h2>Filtered Products ({filteredData.length} items)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredData.map((product) => (
            <div
              key={product.id}
              style={{
                padding: '20px',
                border: '1px solid #e1e5e9',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <h3 style={{ margin: '0 0 12px 0', color: '#333' }}>{product.name}</h3>
              <div style={{ marginBottom: '8px' }}>
                <span style={{
                  backgroundColor: '#e3f2fd',
                  color: '#1565c0',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {product.category}
                </span>
              </div>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Brand:</strong> {product.brand}
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Price:</strong> ${product.price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default JSXExample;
