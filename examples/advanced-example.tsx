import React, { useState } from 'react';
import { FilterChips, FilterChip } from '../src';

// Sample e-commerce data
const products = [
  { 
    id: 1, 
    name: 'Wireless Headphones', 
    category: 'Electronics', 
    brand: 'TechSound',
    price: 99.99,
    rating: 4.5,
    tags: ['wireless', 'bluetooth', 'noise-cancelling'],
    inStock: true,
    colors: ['black', 'white']
  },
  { 
    id: 2, 
    name: 'Gaming Mouse', 
    category: 'Electronics', 
    brand: 'GamePro',
    price: 79.99,
    rating: 4.8,
    tags: ['gaming', 'rgb', 'wireless'],
    inStock: true,
    colors: ['black', 'red']
  },
  { 
    id: 3, 
    name: 'Mechanical Keyboard', 
    category: 'Electronics', 
    brand: 'KeyMaster',
    price: 149.99,
    rating: 4.7,
    tags: ['mechanical', 'rgb', 'gaming'],
    inStock: false,
    colors: ['black', 'white', 'blue']
  },
  { 
    id: 4, 
    name: 'Laptop Stand', 
    category: 'Accessories', 
    brand: 'ErgoDesk',
    price: 49.99,
    rating: 4.3,
    tags: ['adjustable', 'aluminum'],
    inStock: true,
    colors: ['silver', 'black']
  },
  { 
    id: 5, 
    name: 'USB-C Hub', 
    category: 'Accessories', 
    brand: 'ConnectPro',
    price: 89.99,
    rating: 4.4,
    tags: ['usb-c', 'multi-port', 'compact'],
    inStock: true,
    colors: ['black', 'silver']
  },
];

const AdvancedExample: React.FC = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedChips, setSelectedChips] = useState<string[]>([]);

  // Category chips
  const categoryChips: FilterChip[] = [
    { id: 'electronics', label: 'Electronics', value: 'Electronics', color: '#007bff' },
    { id: 'accessories', label: 'Accessories', value: 'Accessories', color: '#28a745' },
  ];

  // Brand chips
  const brandChips: FilterChip[] = [
    { id: 'techsound', label: 'TechSound', value: 'TechSound' },
    { id: 'gamepro', label: 'GamePro', value: 'GamePro' },
    { id: 'keymaster', label: 'KeyMaster', value: 'KeyMaster' },
    { id: 'ergodesk', label: 'ErgoDesk', value: 'ErgoDesk' },
    { id: 'connectpro', label: 'ConnectPro', value: 'ConnectPro' },
  ];

  // Tag chips with custom styling
  const tagChips: FilterChip[] = [
    { id: 'wireless', label: 'Wireless', value: 'wireless', backgroundColor: '#e3f2fd' },
    { id: 'gaming', label: 'Gaming', value: 'gaming', backgroundColor: '#f3e5f5' },
    { id: 'rgb', label: 'RGB', value: 'rgb', backgroundColor: '#fff3e0' },
    { id: 'bluetooth', label: 'Bluetooth', value: 'bluetooth', backgroundColor: '#e8f5e8' },
    { id: 'mechanical', label: 'Mechanical', value: 'mechanical', backgroundColor: '#fce4ec' },
    { id: 'adjustable', label: 'Adjustable', value: 'adjustable', backgroundColor: '#f1f8e9' },
    { id: 'usb-c', label: 'USB-C', value: 'usb-c', backgroundColor: '#e0f2f1' },
  ];

  // Stock status chips
  const stockChips: FilterChip[] = [
    { id: 'in-stock', label: 'In Stock', value: true, backgroundColor: '#d4edda', borderColor: '#c3e6cb' },
    { id: 'out-of-stock', label: 'Out of Stock', value: false, backgroundColor: '#f8d7da', borderColor: '#f5c6cb' },
  ];

  const handleChipClick = (chip: FilterChip, filtered: any[]) => {
    console.log('Chip clicked:', chip.label, 'Filtered products:', filtered);
    setFilteredProducts(filtered);
    
    // Track selected chips for display
    setSelectedChips(prev => {
      if (prev.includes(chip.id)) {
        return prev.filter(id => id !== chip.id);
      } else {
        return [...prev, chip.id];
      }
    });
  };

  const clearAllFilters = () => {
    setFilteredProducts(products);
    setSelectedChips([]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>React Filter Chips - Advanced Example</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>E-commerce Product Filtering</h2>
        <p>Filter products by category, brand, tags, and stock status</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Filter by Category</h3>
        <FilterChips
          chips={categoryChips}
          onChipClick={handleChipClick}
          data={products}
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
          onChipClick={handleChipClick}
          data={products}
          filterKey="brand"
          multiSelect={true}
          maxChips={3}
          showMoreText="Show More Brands"
          showLessText="Show Less"
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Filter by Tags</h3>
        <FilterChips
          chips={tagChips}
          onChipClick={handleChipClick}
          data={products}
          filterKey="tags"
          multiSelect={true}
          searchable={true}
          searchPlaceholder="Search tags..."
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Filter by Stock Status</h3>
        <FilterChips
          chips={stockChips}
          onChipClick={handleChipClick}
          data={products}
          filterKey="inStock"
          multiSelect={false}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={clearAllFilters}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Clear All Filters
        </button>
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#6c757d' }}>
          Active filters: {selectedChips.length > 0 ? selectedChips.join(', ') : 'None'}
        </p>
      </div>

      <div>
        <h2>Filtered Products ({filteredProducts.length} items)</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {filteredProducts.map((product) => (
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
                  backgroundColor: product.inStock ? '#d4edda' : '#f8d7da',
                  color: product.inStock ? '#155724' : '#721c24',
                  padding: '2px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: '500'
                }}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Brand:</strong> {product.brand}
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Category:</strong> {product.category}
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Price:</strong> ${product.price}
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Rating:</strong> ⭐ {product.rating}/5
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <strong>Tags:</strong> {product.tags.join(', ')}
              </p>
              <p style={{ margin: '0' }}>
                <strong>Colors:</strong> {product.colors.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvancedExample;
