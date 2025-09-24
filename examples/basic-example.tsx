import React, { useState } from 'react';
import { FilterChips, FilterChip } from '../src';

// Sample data
const sampleData = [
  { id: 1, name: 'John Doe', category: 'Developer', skills: ['React', 'TypeScript'], experience: 'Senior' },
  { id: 2, name: 'Jane Smith', category: 'Designer', skills: ['Figma', 'Sketch'], experience: 'Mid' },
  { id: 3, name: 'Bob Johnson', category: 'Developer', skills: ['Vue', 'JavaScript'], experience: 'Junior' },
  { id: 4, name: 'Alice Brown', category: 'Manager', skills: ['Leadership', 'Strategy'], experience: 'Senior' },
  { id: 5, name: 'Charlie Wilson', category: 'Developer', skills: ['React', 'Node.js'], experience: 'Mid' },
  { id: 6, name: 'Diana Lee', category: 'Designer', skills: ['Photoshop', 'Illustrator'], experience: 'Senior' },
];

// Filter chips configuration
const filterChips: FilterChip[] = [
  { id: 'dev', label: 'Developers', value: 'Developer' },
  { id: 'design', label: 'Designers', value: 'Designer' },
  { id: 'manager', label: 'Managers', value: 'Manager' },
  { id: 'senior', label: 'Senior Level', value: 'Senior' },
  { id: 'mid', label: 'Mid Level', value: 'Mid' },
  { id: 'junior', label: 'Junior Level', value: 'Junior' },
  { id: 'react', label: 'React', value: 'React' },
  { id: 'typescript', label: 'TypeScript', value: 'TypeScript' },
];

const BasicExample: React.FC = () => {
  const [filteredData, setFilteredData] = useState(sampleData);

  const handleChipClick = (chip: FilterChip, filtered: any[]) => {
    console.log('Chip clicked:', chip.label, 'Filtered data:', filtered);
    setFilteredData(filtered);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>React Filter Chips - Basic Example</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Filter by Category or Experience</h2>
        <FilterChips
          chips={filterChips}
          onChipClick={handleChipClick}
          data={sampleData}
          filterKey="category"
          multiSelect={true}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h2>Filter by Skills (Array Field)</h2>
        <FilterChips
          chips={filterChips.filter(chip => ['react', 'typescript'].includes(chip.id))}
          onChipClick={handleChipClick}
          data={sampleData}
          filterKey="skills"
          multiSelect={true}
        />
      </div>

      <div>
        <h2>Filtered Results ({filteredData.length} items)</h2>
        <div style={{ display: 'grid', gap: '10px' }}>
          {filteredData.map((item) => (
            <div
              key={item.id}
              style={{
                padding: '15px',
                border: '1px solid #e1e5e9',
                borderRadius: '8px',
                backgroundColor: '#f8f9fa',
              }}
            >
              <h3 style={{ margin: '0 0 8px 0' }}>{item.name}</h3>
              <p style={{ margin: '0 0 4px 0' }}>
                <strong>Category:</strong> {item.category}
              </p>
              <p style={{ margin: '0 0 4px 0' }}>
                <strong>Experience:</strong> {item.experience}
              </p>
              <p style={{ margin: '0' }}>
                <strong>Skills:</strong> {item.skills.join(', ')}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BasicExample;
