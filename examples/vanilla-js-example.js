// Vanilla JavaScript example for React Filter Chips
// This shows how to use the component in a plain JavaScript environment

import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { FilterChips } from '../dist/index.esm.js';
import '../dist/index.css';

// Sample data
const products = [
  { id: 1, name: 'Coffee Maker', category: 'Kitchen', price: 89.99, inStock: true },
  { id: 2, name: 'Blender', category: 'Kitchen', price: 129.99, inStock: true },
  { id: 3, name: 'Toaster', category: 'Kitchen', price: 49.99, inStock: false },
  { id: 4, name: 'Microwave', category: 'Kitchen', price: 199.99, inStock: true },
  { id: 5, name: 'Dishwasher', category: 'Kitchen', price: 599.99, inStock: true },
  { id: 6, name: 'Refrigerator', category: 'Kitchen', price: 899.99, inStock: false },
];

// Filter chips
const categoryChips = [
  { id: 'kitchen', label: 'Kitchen Appliances', value: 'Kitchen' },
];

const stockChips = [
  { 
    id: 'in-stock', 
    label: 'In Stock', 
    value: true,
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
    color: '#155724'
  },
  { 
    id: 'out-of-stock', 
    label: 'Out of Stock', 
    value: false,
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    color: '#721c24'
  },
];

const priceChips = [
  { id: 'under-100', label: 'Under $100', value: (price) => price < 100 },
  { id: '100-500', label: '$100 - $500', value: (price) => price >= 100 && price <= 500 },
  { id: 'over-500', label: 'Over $500', value: (price) => price > 500 },
];

// Main component function
function VanillaJSExample() {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const handleChipClick = (chip, filtered) => {
    console.log('Chip clicked:', chip.label);
    console.log('Filtered products:', filtered);
    
    setFilteredProducts(filtered);
    
    // Update selected filters
    setSelectedFilters(prev => {
      if (prev.includes(chip.id)) {
        return prev.filter(id => id !== chip.id);
      } else {
        return [...prev, chip.id];
      }
    });
  };

  const clearAllFilters = () => {
    setFilteredProducts(products);
    setSelectedFilters([]);
  };

  // Create product card element
  const createProductCard = (product) => {
    return React.createElement('div', {
      key: product.id,
      style: {
        padding: '20px',
        border: '1px solid #e1e5e9',
        borderRadius: '8px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        marginBottom: '15px'
      }
    }, [
      React.createElement('h3', {
        key: 'title',
        style: { margin: '0 0 12px 0', color: '#333' }
      }, product.name),
      
      React.createElement('div', {
        key: 'stock',
        style: { marginBottom: '8px' }
      }, React.createElement('span', {
        style: {
          backgroundColor: product.inStock ? '#d4edda' : '#f8d7da',
          color: product.inStock ? '#155724' : '#721c24',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: '500'
        }
      }, product.inStock ? 'In Stock' : 'Out of Stock')),
      
      React.createElement('p', {
        key: 'category',
        style: { margin: '0 0 8px 0' }
      }, [
        React.createElement('strong', { key: 'label' }, 'Category: '),
        product.category
      ]),
      
      React.createElement('p', {
        key: 'price',
        style: { margin: '0' }
      }, [
        React.createElement('strong', { key: 'label' }, 'Price: $'),
        product.price
      ])
    ]);
  };

  return React.createElement('div', {
    style: { padding: '20px', maxWidth: '800px', margin: '0 auto' }
  }, [
    React.createElement('h1', {
      key: 'title',
      style: { marginBottom: '30px' }
    }, 'React Filter Chips - Vanilla JS Example'),
    
    React.createElement('div', {
      key: 'description',
      style: { marginBottom: '30px' }
    }, [
      React.createElement('h2', { key: 'subtitle' }, 'Kitchen Appliances Store'),
      React.createElement('p', { key: 'desc' }, 'Filter products using interactive chips - built with vanilla JavaScript and React.createElement')
    ]),
    
    React.createElement('div', {
      key: 'category-filters',
      style: { marginBottom: '20px' }
    }, [
      React.createElement('h3', { key: 'title' }, 'Filter by Category'),
      React.createElement(FilterChips, {
        key: 'chips',
        chips: categoryChips,
        onChipClick: handleChipClick,
        data: products,
        filterKey: 'category',
        multiSelect: true,
        showClearAll: true
      })
    ]),
    
    React.createElement('div', {
      key: 'stock-filters',
      style: { marginBottom: '20px' }
    }, [
      React.createElement('h3', { key: 'title' }, 'Filter by Stock Status'),
      React.createElement(FilterChips, {
        key: 'chips',
        chips: stockChips,
        onChipClick: handleChipClick,
        data: products,
        filterKey: 'inStock',
        multiSelect: true
      })
    ]),
    
    React.createElement('div', {
      key: 'price-filters',
      style: { marginBottom: '20px' }
    }, [
      React.createElement('h3', { key: 'title' }, 'Filter by Price Range'),
      React.createElement(FilterChips, {
        key: 'chips',
        chips: priceChips,
        onChipClick: handleChipClick,
        data: products,
        filterKey: 'price',
        multiSelect: true,
        searchable: true,
        searchPlaceholder: 'Search price ranges...'
      })
    ]),
    
    React.createElement('div', {
      key: 'controls',
      style: { marginBottom: '20px' }
    }, [
      React.createElement('button', {
        key: 'clear-btn',
        onClick: clearAllFilters,
        style: {
          padding: '10px 20px',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '10px'
        }
      }, 'Clear All Filters'),
      
      React.createElement('div', {
        key: 'status',
        style: { fontSize: '14px', color: '#6c757d' }
      }, [
        React.createElement('strong', { key: 'label' }, 'Active Filters: '),
        selectedFilters.length > 0 ? selectedFilters.join(', ') : 'None'
      ])
    ]),
    
    React.createElement('div', {
      key: 'results'
    }, [
      React.createElement('h2', {
        key: 'title',
        style: { marginBottom: '20px' }
      }, `Filtered Products (${filteredProducts.length} items)`),
      
      React.createElement('div', {
        key: 'products',
        style: { display: 'grid', gap: '15px' }
      }, filteredProducts.map(createProductCard))
    ])
  ]);
}

// Initialize the app
function initApp() {
  const container = document.getElementById('app');
  if (container) {
    const root = createRoot(container);
    root.render(React.createElement(VanillaJSExample));
  } else {
    console.error('App container not found. Make sure you have a div with id="app" in your HTML.');
  }
}

// Export for use in other files
export default VanillaJSExample;

// Auto-initialize if this script is loaded directly
if (typeof window !== 'undefined') {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }
}
