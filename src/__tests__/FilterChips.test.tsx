import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FilterChips, FilterChip } from '../FilterChips';

// Mock data for testing
const mockData = [
  { id: 1, name: 'John', category: 'Developer', skills: ['React', 'TypeScript'] },
  { id: 2, name: 'Jane', category: 'Designer', skills: ['Figma', 'Sketch'] },
  { id: 3, name: 'Bob', category: 'Developer', skills: ['Vue', 'JavaScript'] },
];

const mockChips: FilterChip[] = [
  { id: 'dev', label: 'Developers', value: 'Developer' },
  { id: 'design', label: 'Designers', value: 'Designer' },
  { id: 'react', label: 'React', value: 'React' },
];

describe('FilterChips', () => {
  const mockOnChipClick = jest.fn();

  beforeEach(() => {
    mockOnChipClick.mockClear();
  });

  it('renders chips correctly', () => {
    render(
      <FilterChips
        chips={mockChips}
        onChipClick={mockOnChipClick}
        data={mockData}
        filterKey="category"
      />
    );

    expect(screen.getByText('Developers')).toBeInTheDocument();
    expect(screen.getByText('Designers')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('calls onChipClick when a chip is clicked', () => {
    render(
      <FilterChips
        chips={mockChips}
        onChipClick={mockOnChipClick}
        data={mockData}
        filterKey="category"
      />
    );

    const developerChip = screen.getByText('Developers');
    fireEvent.click(developerChip);

    expect(mockOnChipClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'dev', label: 'Developers' }),
      expect.arrayContaining([
        expect.objectContaining({ name: 'John' }),
        expect.objectContaining({ name: 'Bob' })
      ])
    );
  });

  it('filters data correctly for single select', () => {
    render(
      <FilterChips
        chips={mockChips}
        onChipClick={mockOnChipClick}
        data={mockData}
        filterKey="category"
        multiSelect={false}
      />
    );

    const designerChip = screen.getByText('Designers');
    fireEvent.click(designerChip);

    expect(mockOnChipClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'design' }),
      expect.arrayContaining([
        expect.objectContaining({ name: 'Jane' })
      ])
    );
  });

  it('filters data correctly for multi select', () => {
    render(
      <FilterChips
        chips={mockChips}
        onChipClick={mockOnChipClick}
        data={mockData}
        filterKey="skills"
        multiSelect={true}
      />
    );

    const reactChip = screen.getByText('React');
    fireEvent.click(reactChip);

    expect(mockOnChipClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'react' }),
      expect.arrayContaining([
        expect.objectContaining({ name: 'John' })
      ])
    );
  });

  it('shows clear all button when chips are active', () => {
    render(
      <FilterChips
        chips={mockChips}
        onChipClick={mockOnChipClick}
        data={mockData}
        filterKey="category"
        showClearAll={true}
      />
    );

    const developerChip = screen.getByText('Developers');
    fireEvent.click(developerChip);

    expect(screen.getByText('Clear All')).toBeInTheDocument();
  });

  it('clears all active chips when clear all is clicked', () => {
    render(
      <FilterChips
        chips={mockChips}
        onChipClick={mockOnChipClick}
        data={mockData}
        filterKey="category"
        showClearAll={true}
      />
    );

    const developerChip = screen.getByText('Developers');
    fireEvent.click(developerChip);

    const clearAllButton = screen.getByText('Clear All');
    fireEvent.click(clearAllButton);

    expect(mockOnChipClick).toHaveBeenCalledWith(
      expect.objectContaining({}),
      mockData
    );
  });

  it('shows search input when searchable is true', () => {
    render(
      <FilterChips
        chips={mockChips}
        onChipClick={mockOnChipClick}
        data={mockData}
        filterKey="category"
        searchable={true}
        searchPlaceholder="Search chips..."
      />
    );

    expect(screen.getByPlaceholderText('Search chips...')).toBeInTheDocument();
  });

  it('filters chips based on search term', () => {
    render(
      <FilterChips
        chips={mockChips}
        onChipClick={mockOnChipClick}
        data={mockData}
        filterKey="category"
        searchable={true}
      />
    );

    const searchInput = screen.getByPlaceholderText('Search chips...');
    fireEvent.change(searchInput, { target: { value: 'dev' } });

    expect(screen.getByText('Developers')).toBeInTheDocument();
    expect(screen.queryByText('Designers')).not.toBeInTheDocument();
  });

  it('shows show more/less when maxChips is set', () => {
    const manyChips = [
      { id: '1', label: 'Chip 1', value: '1' },
      { id: '2', label: 'Chip 2', value: '2' },
      { id: '3', label: 'Chip 3', value: '3' },
      { id: '4', label: 'Chip 4', value: '4' },
    ];

    render(
      <FilterChips
        chips={manyChips}
        onChipClick={mockOnChipClick}
        data={mockData}
        filterKey="category"
        maxChips={2}
      />
    );

    expect(screen.getByText('Show More')).toBeInTheDocument();
    expect(screen.getByText('Chip 1')).toBeInTheDocument();
    expect(screen.getByText('Chip 2')).toBeInTheDocument();
    expect(screen.queryByText('Chip 3')).not.toBeInTheDocument();
  });

  it('shows loading state when loading is true', () => {
    render(
      <FilterChips
        chips={mockChips}
        onChipClick={mockOnChipClick}
        data={mockData}
        filterKey="category"
        loading={true}
        loadingText="Loading chips..."
      />
    );

    expect(screen.getByText('Loading chips...')).toBeInTheDocument();
    expect(screen.queryByText('Developers')).not.toBeInTheDocument();
  });

  it('shows no results message when no chips match search', () => {
    render(
      <FilterChips
        chips={mockChips}
        onChipClick={mockOnChipClick}
        data={mockData}
        filterKey="category"
        searchable={true}
        noResultsText="No chips found"
      />
    );

    const searchInput = screen.getByPlaceholderText('Search chips...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });

    expect(screen.getByText('No chips found')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <FilterChips
        chips={mockChips}
        onChipClick={mockOnChipClick}
        data={mockData}
        filterKey="category"
        className="custom-container"
      />
    );

    expect(container.firstChild).toHaveClass('custom-container');
  });

  it('handles disabled chips correctly', () => {
    const chipsWithDisabled = [
      { id: 'dev', label: 'Developers', value: 'Developer' },
      { id: 'design', label: 'Designers', value: 'Designer', disabled: true },
    ];

    render(
      <FilterChips
        chips={chipsWithDisabled}
        onChipClick={mockOnChipClick}
        data={mockData}
        filterKey="category"
      />
    );

    const designerChip = screen.getByText('Designers');
    expect(designerChip).toBeDisabled();

    fireEvent.click(designerChip);
    expect(mockOnChipClick).not.toHaveBeenCalled();
  });

  it('handles array filter keys correctly', () => {
    render(
      <FilterChips
        chips={mockChips}
        onChipClick={mockOnChipClick}
        data={mockData}
        filterKey={['category', 'skills']}
        multiSelect={true}
      />
    );

    const reactChip = screen.getByText('React');
    fireEvent.click(reactChip);

    expect(mockOnChipClick).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'react' }),
      expect.arrayContaining([
        expect.objectContaining({ name: 'John' })
      ])
    );
  });
});
