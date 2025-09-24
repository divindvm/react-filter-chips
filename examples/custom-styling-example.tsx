import React, { useState } from 'react';
import { FilterChips, FilterChip } from '../src';

// Sample data for custom styling demo
const sampleData = [
  { id: 1, name: 'Project Alpha', status: 'active', priority: 'high', type: 'feature' },
  { id: 2, name: 'Project Beta', status: 'completed', priority: 'medium', type: 'bugfix' },
  { id: 3, name: 'Project Gamma', status: 'pending', priority: 'low', type: 'feature' },
  { id: 4, name: 'Project Delta', status: 'active', priority: 'high', type: 'enhancement' },
  { id: 5, name: 'Project Epsilon', status: 'cancelled', priority: 'medium', type: 'bugfix' },
];

const CustomStylingExample: React.FC = () => {
  const [filteredData, setFilteredData] = useState(sampleData);

  // Custom styled chips with different themes
  const statusChips: FilterChip[] = [
    { 
      id: 'active', 
      label: 'Active', 
      value: 'active',
      backgroundColor: '#d4edda',
      borderColor: '#c3e6cb',
      color: '#155724'
    },
    { 
      id: 'completed', 
      label: 'Completed', 
      value: 'completed',
      backgroundColor: '#cce5ff',
      borderColor: '#99d6ff',
      color: '#004085'
    },
    { 
      id: 'pending', 
      label: 'Pending', 
      value: 'pending',
      backgroundColor: '#fff3cd',
      borderColor: '#ffeaa7',
      color: '#856404'
    },
    { 
      id: 'cancelled', 
      label: 'Cancelled', 
      value: 'cancelled',
      backgroundColor: '#f8d7da',
      borderColor: '#f5c6cb',
      color: '#721c24'
    },
  ];

  const priorityChips: FilterChip[] = [
    { 
      id: 'high', 
      label: '🔥 High Priority', 
      value: 'high',
      backgroundColor: '#ff6b6b',
      color: '#ffffff'
    },
    { 
      id: 'medium', 
      label: '⚡ Medium Priority', 
      value: 'medium',
      backgroundColor: '#ffa726',
      color: '#ffffff'
    },
    { 
      id: 'low', 
      label: '📋 Low Priority', 
      value: 'low',
      backgroundColor: '#66bb6a',
      color: '#ffffff'
    },
  ];

  const typeChips: FilterChip[] = [
    { 
      id: 'feature', 
      label: 'Feature', 
      value: 'feature',
      backgroundColor: '#e1f5fe',
      borderColor: '#b3e5fc',
      color: '#01579b'
    },
    { 
      id: 'bugfix', 
      label: 'Bug Fix', 
      value: 'bugfix',
      backgroundColor: '#fce4ec',
      borderColor: '#f8bbd9',
      color: '#880e4f'
    },
    { 
      id: 'enhancement', 
      label: 'Enhancement', 
      value: 'enhancement',
      backgroundColor: '#f3e5f5',
      borderColor: '#e1bee7',
      color: '#4a148c'
    },
  ];

  const handleChipClick = (chip: FilterChip, filtered: any[]) => {
    setFilteredData(filtered);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h1>React Filter Chips - Custom Styling Example</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Project Management Dashboard</h2>
        <p>Custom styled chips with different themes and colors</p>
      </div>

      <div style={{ marginBottom: '25px' }}>
        <h3>Filter by Status</h3>
        <FilterChips
          chips={statusChips}
          onChipClick={handleChipClick}
          data={sampleData}
          filterKey="status"
          multiSelect={true}
          className="custom-status-chips"
          chipClassName="custom-chip"
          activeChipClassName="custom-active-chip"
        />
      </div>

      <div style={{ marginBottom: '25px' }}>
        <h3>Filter by Priority</h3>
        <FilterChips
          chips={priorityChips}
          onChipClick={handleChipClick}
          data={sampleData}
          filterKey="priority"
          multiSelect={false}
          className="custom-priority-chips"
          chipClassName="custom-priority-chip"
          activeChipClassName="custom-priority-active"
        />
      </div>

      <div style={{ marginBottom: '25px' }}>
        <h3>Filter by Type</h3>
        <FilterChips
          chips={typeChips}
          onChipClick={handleChipClick}
          data={sampleData}
          filterKey="type"
          multiSelect={true}
          className="custom-type-chips"
          chipClassName="custom-type-chip"
          activeChipClassName="custom-type-active"
        />
      </div>

      <div>
        <h2>Filtered Projects ({filteredData.length} items)</h2>
        <div style={{ display: 'grid', gap: '15px' }}>
          {filteredData.map((project) => (
            <div
              key={project.id}
              style={{
                padding: '20px',
                border: '1px solid #e1e5e9',
                borderRadius: '8px',
                backgroundColor: '#ffffff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ margin: '0', color: '#333' }}>{project.name}</h3>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: project.status === 'active' ? '#d4edda' : 
                                   project.status === 'completed' ? '#cce5ff' :
                                   project.status === 'pending' ? '#fff3cd' : '#f8d7da',
                    color: project.status === 'active' ? '#155724' : 
                           project.status === 'completed' ? '#004085' :
                           project.status === 'pending' ? '#856404' : '#721c24'
                  }}>
                    {project.status}
                  </span>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: project.priority === 'high' ? '#ff6b6b' :
                                   project.priority === 'medium' ? '#ffa726' : '#66bb6a',
                    color: '#ffffff'
                  }}>
                    {project.priority}
                  </span>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500',
                    backgroundColor: project.type === 'feature' ? '#e1f5fe' :
                                   project.type === 'bugfix' ? '#fce4ec' : '#f3e5f5',
                    color: project.type === 'feature' ? '#01579b' :
                           project.type === 'bugfix' ? '#880e4f' : '#4a148c'
                  }}>
                    {project.type}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .custom-status-chips .custom-chip {
          border-radius: 25px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.3s ease;
        }
        
        .custom-status-chips .custom-active-chip {
          transform: scale(1.05);
          box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        
        .custom-priority-chips .custom-priority-chip {
          border-radius: 15px;
          font-weight: 700;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        }
        
        .custom-priority-chips .custom-priority-active {
          transform: scale(1.1);
          box-shadow: 0 6px 12px rgba(0,0,0,0.3);
        }
        
        .custom-type-chips .custom-type-chip {
          border-radius: 20px;
          font-weight: 500;
          border-width: 2px;
        }
        
        .custom-type-chips .custom-type-active {
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0,0,0,0.15);
        }
      `}</style>
    </div>
  );
};

export default CustomStylingExample;
