# React Filter Chips

A flexible and customizable React component for filtering content using interactive chips. Perfect for creating filter interfaces in e-commerce, dashboards, and data visualization applications.

## Features

- **Flexible Filtering**: Filter data by single or multiple criteria
- **Customizable Styling**: Full control over appearance with CSS classes and inline styles
- **Search Functionality**: Built-in search to find specific chips
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Accessibility**: ARIA labels and keyboard navigation support
- **Dark Mode**: Automatic dark mode support
- **Multi-select Support**: Choose between single or multi-select filtering
- **TypeScript**: Full TypeScript support with comprehensive type definitions
- **Well Tested**: Comprehensive test coverage

## Installation

```bash
npm install react-filter-chips
```

```bash
yarn add react-filter-chips
```

## Framework Support

This package supports multiple React setups:

- **TypeScript (TSX)** - Full TypeScript support with comprehensive type definitions
- **JavaScript (JSX)** - Works with plain JavaScript and JSX
- **Create React App** - Compatible with CRA projects
- **Next.js** - Works with Next.js applications
- **Vite** - Compatible with Vite-based projects
- **Webpack** - Works with custom Webpack configurations
- **ES Modules** - Supports both CommonJS and ES module imports

## Import Methods

### TypeScript/TSX
```tsx
import { FilterChips, FilterChip } from 'react-filter-chips';
import 'react-filter-chips/styles';
```

### JavaScript/JSX
```jsx
import { FilterChips } from 'react-filter-chips';
import 'react-filter-chips/styles';
```

### CommonJS (Node.js)
```javascript
const { FilterChips } = require('react-filter-chips');
require('react-filter-chips/dist/index.css');
```

### ES Modules (Browser)
```javascript
import { FilterChips } from 'react-filter-chips/dist/index.esm.js';
import 'react-filter-chips/dist/index.css';
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { FilterChips, FilterChip } from 'react-filter-chips';

const data = [
  { id: 1, name: 'John Doe', category: 'Developer', skills: ['React', 'TypeScript'] },
  { id: 2, name: 'Jane Smith', category: 'Designer', skills: ['Figma', 'Sketch'] },
  { id: 3, name: 'Bob Johnson', category: 'Developer', skills: ['Vue', 'JavaScript'] },
];

const chips: FilterChip[] = [
  { id: 'dev', label: 'Developers', value: 'Developer' },
  { id: 'design', label: 'Designers', value: 'Designer' },
  { id: 'react', label: 'React', value: 'React' },
];

function App() {
  const [filteredData, setFilteredData] = useState(data);

  const handleChipClick = (chip: FilterChip, filtered: any[]) => {
    setFilteredData(filtered);
  };

  return (
    <div>
      <FilterChips
        chips={chips}
        onChipClick={handleChipClick}
        data={data}
        filterKey="category"
        multiSelect={true}
      />
      
      <div>
        {filteredData.map(item => (
          <div key={item.id}>{item.name}</div>
        ))}
      </div>
    </div>
  );
}
```

## Props

### FilterChipsProps

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `chips` | `FilterChip[]` | **Required** | Array of chip objects to display |
| `onChipClick` | `(chip: FilterChip, filteredData: any[]) => void` | **Required** | Callback fired when a chip is clicked |
| `data` | `any[]` | **Required** | Array of data to filter |
| `filterKey` | `string \| string[]` | **Required** | Key(s) to filter by in the data objects |
| `multiSelect` | `boolean` | `false` | Allow multiple chips to be selected |
| `className` | `string` | `''` | CSS class for the container |
| `chipClassName` | `string` | `''` | CSS class for individual chips |
| `activeChipClassName` | `string` | `''` | CSS class for active chips |
| `disabledChipClassName` | `string` | `''` | CSS class for disabled chips |
| `style` | `React.CSSProperties` | `undefined` | Inline styles for the container |
| `chipStyle` | `React.CSSProperties` | `undefined` | Inline styles for individual chips |
| `showClearAll` | `boolean` | `true` | Show clear all button |
| `clearAllText` | `string` | `'Clear All'` | Text for clear all button |
| `clearAllClassName` | `string` | `''` | CSS class for clear all button |
| `maxChips` | `number` | `undefined` | Maximum number of chips to show initially |
| `showMoreText` | `string` | `'Show More'` | Text for show more button |
| `showLessText` | `string` | `'Show Less'` | Text for show less button |
| `searchable` | `boolean` | `false` | Enable search functionality |
| `searchPlaceholder` | `string` | `'Search chips...'` | Placeholder for search input |
| `searchClassName` | `string` | `''` | CSS class for search input |
| `noResultsText` | `string` | `'No chips found'` | Text when no chips match search |
| `loading` | `boolean` | `false` | Show loading state |
| `loadingText` | `string` | `'Loading...'` | Text for loading state |

### FilterChip

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `id` | `string` | **Required** | Unique identifier for the chip |
| `label` | `string` | **Required** | Display text for the chip |
| `value` | `any` | **Required** | Value to filter by |
| `active` | `boolean` | `false` | Whether the chip is initially active |
| `disabled` | `boolean` | `false` | Whether the chip is disabled |
| `color` | `string` | `undefined` | Text color for the chip |
| `backgroundColor` | `string` | `undefined` | Background color for the chip |
| `borderColor` | `string` | `undefined` | Border color for the chip |

## Advanced Examples

### E-commerce Product Filtering

```tsx
const products = [
  { 
    id: 1, 
    name: 'Wireless Headphones', 
    category: 'Electronics', 
    brand: 'TechSound',
    price: 99.99,
    tags: ['wireless', 'bluetooth']
  },
  // ... more products
];

const categoryChips: FilterChip[] = [
  { id: 'electronics', label: 'Electronics', value: 'Electronics' },
  { id: 'accessories', label: 'Accessories', value: 'Accessories' },
];

const brandChips: FilterChip[] = [
  { id: 'techsound', label: 'TechSound', value: 'TechSound' },
  { id: 'gamepro', label: 'GamePro', value: 'GamePro' },
];

function ProductFilters() {
  const [filteredProducts, setFilteredProducts] = useState(products);

  return (
    <div>
      <h3>Filter by Category</h3>
      <FilterChips
        chips={categoryChips}
        onChipClick={(chip, filtered) => setFilteredProducts(filtered)}
        data={products}
        filterKey="category"
        multiSelect={true}
      />
      
      <h3>Filter by Brand</h3>
      <FilterChips
        chips={brandChips}
        onChipClick={(chip, filtered) => setFilteredProducts(filtered)}
        data={products}
        filterKey="brand"
        multiSelect={true}
        maxChips={3}
        searchable={true}
      />
    </div>
  );
}
```

### Custom Styling

```tsx
const customChips: FilterChip[] = [
  { 
    id: 'high', 
    label: 'High Priority', 
    value: 'high',
    backgroundColor: '#ff6b6b',
    color: '#ffffff'
  },
  { 
    id: 'medium', 
    label: 'Medium Priority', 
    value: 'medium',
    backgroundColor: '#ffa726',
    color: '#ffffff'
  },
];

<FilterChips
  chips={customChips}
  onChipClick={handleChipClick}
  data={data}
  filterKey="priority"
  className="custom-priority-chips"
  chipClassName="custom-chip"
  activeChipClassName="custom-active"
/>
```

### Array Field Filtering

```tsx
const data = [
  { id: 1, name: 'John', skills: ['React', 'TypeScript', 'Node.js'] },
  { id: 2, name: 'Jane', skills: ['Vue', 'JavaScript'] },
  { id: 3, name: 'Bob', skills: ['React', 'Python'] },
];

const skillChips: FilterChip[] = [
  { id: 'react', label: 'React', value: 'React' },
  { id: 'vue', label: 'Vue', value: 'Vue' },
  { id: 'typescript', label: 'TypeScript', value: 'TypeScript' },
];

<FilterChips
  chips={skillChips}
  onChipClick={handleChipClick}
  data={data}
  filterKey="skills" // This will filter arrays
  multiSelect={true}
/>
```

### Multiple Filter Keys

```tsx
<FilterChips
  chips={chips}
  onChipClick={handleChipClick}
  data={data}
  filterKey={['category', 'department']} // Filter by multiple keys
  multiSelect={true}
/>
```

## CSS Customization

The component comes with default styles, but you can easily customize them:

```css
/* Custom container styles */
.custom-filter-container {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
}

/* Custom chip styles */
.custom-chip {
  border-radius: 25px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Custom active chip styles */
.custom-active-chip {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

/* Custom search input styles */
.custom-search-input {
  border: 2px solid #007bff;
  border-radius: 8px;
}
```

## Accessibility

The component includes built-in accessibility features:

- ARIA labels for screen readers
- Keyboard navigation support
- Focus management
- High contrast mode support
- Reduced motion support

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Repository

- **GitHub**: [https://github.com/divindvm/react-filter-chips](https://github.com/divindvm/react-filter-chips)
- **NPM**: [https://www.npmjs.com/package/react-filter-chips](https://www.npmjs.com/package/react-filter-chips)

## Changelog

## Framework-Specific Examples

### Create React App (JSX)
```jsx
// App.js
import React, { useState } from 'react';
import { FilterChips } from 'react-filter-chips';
import 'react-filter-chips/styles';

function App() {
  const [data, setData] = useState([
    { id: 1, name: 'Product 1', category: 'Electronics' },
    { id: 2, name: 'Product 2', category: 'Clothing' },
  ]);

  const chips = [
    { id: 'electronics', label: 'Electronics', value: 'Electronics' },
    { id: 'clothing', label: 'Clothing', value: 'Clothing' },
  ];

  return (
    <FilterChips
      chips={chips}
      onChipClick={(chip, filtered) => setData(filtered)}
      data={data}
      filterKey="category"
    />
  );
}
```

### Next.js (TSX)
```tsx
// pages/index.tsx
import { useState } from 'react';
import { FilterChips, FilterChip } from 'react-filter-chips';
import 'react-filter-chips/styles';

export default function HomePage() {
  const [data, setData] = useState([
    { id: 1, name: 'Product 1', category: 'Electronics' },
  ]);

  const chips: FilterChip[] = [
    { id: 'electronics', label: 'Electronics', value: 'Electronics' },
  ];

  return (
    <FilterChips
      chips={chips}
      onChipClick={(chip, filtered) => setData(filtered)}
      data={data}
      filterKey="category"
    />
  );
}
```

### Vite (TSX)
```tsx
// src/App.tsx
import { useState } from 'react';
import { FilterChips, FilterChip } from 'react-filter-chips';
import 'react-filter-chips/styles';

function App() {
  const [data, setData] = useState([
    { id: 1, name: 'Product 1', category: 'Electronics' },
  ]);

  const chips: FilterChip[] = [
    { id: 'electronics', label: 'Electronics', value: 'Electronics' },
  ];

  return (
    <FilterChips
      chips={chips}
      onChipClick={(chip, filtered) => setData(filtered)}
      data={data}
      filterKey="category"
    />
  );
}
```

## Changelog

### 1.0.0
- Initial release
- Basic filtering functionality
- Custom styling support
- Search functionality
- Multi-select support
- TypeScript definitions
- Comprehensive test coverage
- Support for both JSX and TSX applications
- Multiple import methods (ES modules, CommonJS)
- Framework compatibility (CRA, Next.js, Vite, Webpack)
