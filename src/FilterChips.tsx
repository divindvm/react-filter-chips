import React, { useState, useCallback, useMemo, createContext, useContext } from 'react';
import { FilterChipsProps, FilterChip, FilterChipsState, FilterChipsContextType } from './types';
import './FilterChips.css';

const FilterChipsContext = createContext<FilterChipsContextType | null>(null);

const useFilterChipsContext = () => {
  const context = useContext(FilterChipsContext);
  if (!context) {
    throw new Error('useFilterChipsContext must be used within FilterChipsProvider');
  }
  return context;
};

const defaultFilterFunction = (data: any[], filterKey: string | string[], chipValue: any): any[] => {
  if (!data || data.length === 0) return [];
  
  return data.filter((item) => {
    if (Array.isArray(filterKey)) {
      return filterKey.some(key => {
        const value = item[key];
        if (Array.isArray(value)) {
          return value.includes(chipValue);
        }
        return value === chipValue;
      });
    } else {
      const value = item[filterKey];
      if (Array.isArray(value)) {
        return value.includes(chipValue);
      }
      return value === chipValue;
    }
  });
};

export const FilterChips: React.FC<FilterChipsProps> = ({
  chips,
  onChipClick,
  data,
  filterKey,
  multiSelect = false,
  className = '',
  chipClassName = '',
  activeChipClassName = '',
  disabledChipClassName = '',
  style,
  chipStyle,
  showClearAll = true,
  clearAllText = 'Clear All',
  clearAllClassName = '',
  maxChips,
  showMoreText = 'Show More',
  showLessText = 'Show Less',
  searchable = false,
  searchPlaceholder = 'Search chips...',
  searchClassName = '',
  noResultsText = 'No chips found',
  loading = false,
  loadingText = 'Loading...',
}) => {
  const [state, setState] = useState<FilterChipsState>({
    activeChips: chips.filter(chip => chip.active).map(chip => chip.id),
    searchTerm: '',
    showAll: false,
  });

  const filteredChips = useMemo(() => {
    let filtered = chips;
    
    if (searchable && state.searchTerm) {
      filtered = chips.filter(chip =>
        chip.label.toLowerCase().includes(state.searchTerm.toLowerCase())
      );
    }
    
    if (maxChips && !state.showAll) {
      filtered = filtered.slice(0, maxChips);
    }
    
    return filtered;
  }, [chips, state.searchTerm, state.showAll, maxChips, searchable]);

  const toggleChip = useCallback((chipId: string) => {
    setState(prevState => {
      let newActiveChips: string[];
      
      if (multiSelect) {
        newActiveChips = prevState.activeChips.includes(chipId)
          ? prevState.activeChips.filter(id => id !== chipId)
          : [...prevState.activeChips, chipId];
      } else {
        newActiveChips = prevState.activeChips.includes(chipId)
          ? []
          : [chipId];
      }
      
      // Get filtered data based on active chips
      const activeChipObjects = chips.filter(chip => newActiveChips.includes(chip.id));
      let filteredData = data;
      
      if (activeChipObjects.length > 0) {
        if (multiSelect) {
          // For multi-select, combine all active chip filters
          filteredData = activeChipObjects.reduce((acc, chip) => {
            const chipFiltered = defaultFilterFunction(acc, filterKey, chip.value);
            return chipFiltered;
          }, data);
        } else {
          // For single select, use the last selected chip
          const lastChip = activeChipObjects[activeChipObjects.length - 1];
          filteredData = defaultFilterFunction(data, filterKey, lastChip.value);
        }
      }
      
      // Call the onChipClick callback
      const clickedChip = chips.find(chip => chip.id === chipId);
      if (clickedChip) {
        onChipClick(clickedChip, filteredData);
      }
      
      return {
        ...prevState,
        activeChips: newActiveChips,
      };
    });
  }, [chips, data, filterKey, multiSelect, onChipClick]);

  const clearAll = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      activeChips: [],
    }));
    onChipClick({} as FilterChip, data);
  }, [data, onChipClick]);

  const isActive = useCallback((chipId: string) => {
    return state.activeChips.includes(chipId);
  }, [state.activeChips]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setState(prevState => ({
      ...prevState,
      searchTerm: e.target.value,
    }));
  }, []);

  const toggleShowAll = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      showAll: !prevState.showAll,
    }));
  }, []);

  const contextValue: FilterChipsContextType = {
    activeChips: state.activeChips,
    toggleChip,
    clearAll,
    isActive,
  };

  if (loading) {
    return (
      <div className={`filter-chips-container ${className}`} style={style}>
        <div className="filter-chips-loading">
          {loadingText}
        </div>
      </div>
    );
  }

  return (
    <FilterChipsContext.Provider value={contextValue}>
      <div className={`filter-chips-container ${className}`} style={style}>
        {searchable && (
          <div className="filter-chips-search">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={state.searchTerm}
              onChange={handleSearchChange}
              className={`filter-chips-search-input ${searchClassName}`}
            />
          </div>
        )}
        
        <div className="filter-chips-wrapper">
          {filteredChips.length === 0 ? (
            <div className="filter-chips-no-results">
              {noResultsText}
            </div>
          ) : (
            <>
              <div className="filter-chips-list">
                {filteredChips.map((chip) => (
                  <Chip
                    key={chip.id}
                    chip={chip}
                    isActive={isActive(chip.id)}
                    onClick={() => !chip.disabled && toggleChip(chip.id)}
                    className={chipClassName}
                    activeClassName={activeChipClassName}
                    disabledClassName={disabledChipClassName}
                    style={chipStyle}
                  />
                ))}
              </div>
              
              {maxChips && chips.length > maxChips && (
                <button
                  type="button"
                  onClick={toggleShowAll}
                  className="filter-chips-toggle"
                >
                  {state.showAll ? showLessText : showMoreText}
                </button>
              )}
            </>
          )}
        </div>
        
        {showClearAll && state.activeChips.length > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className={`filter-chips-clear-all ${clearAllClassName}`}
          >
            {clearAllText}
          </button>
        )}
      </div>
    </FilterChipsContext.Provider>
  );
};

interface ChipProps {
  chip: FilterChip;
  isActive: boolean;
  onClick: () => void;
  className?: string;
  activeClassName?: string;
  disabledClassName?: string;
  style?: React.CSSProperties;
}

const Chip: React.FC<ChipProps> = ({
  chip,
  isActive,
  onClick,
  className = '',
  activeClassName = '',
  disabledClassName = '',
  style,
}) => {
  const chipStyles: React.CSSProperties = {
    ...style,
    ...(chip.color && { color: chip.color }),
    ...(chip.backgroundColor && { backgroundColor: chip.backgroundColor }),
    ...(chip.borderColor && { borderColor: chip.borderColor }),
  };

  const chipClasses = [
    'filter-chip',
    className,
    isActive ? `filter-chip-active ${activeClassName}` : '',
    chip.disabled ? `filter-chip-disabled ${disabledClassName}` : '',
  ].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={chipClasses}
      style={chipStyles}
      onClick={onClick}
      disabled={chip.disabled}
      aria-pressed={isActive}
      aria-label={`Filter by ${chip.label}`}
    >
      {chip.label}
    </button>
  );
};

export default FilterChips;
