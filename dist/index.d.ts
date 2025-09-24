import React$1 from 'react';

interface FilterChip {
    id: string;
    label: string;
    value: any;
    active?: boolean;
    disabled?: boolean;
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
}
interface FilterChipsProps {
    chips: FilterChip[];
    onChipClick: (chip: FilterChip, filteredData: any[]) => void;
    data: any[];
    filterKey: string | string[];
    multiSelect?: boolean;
    className?: string;
    chipClassName?: string;
    activeChipClassName?: string;
    disabledChipClassName?: string;
    style?: React.CSSProperties;
    chipStyle?: React.CSSProperties;
    showClearAll?: boolean;
    clearAllText?: string;
    clearAllClassName?: string;
    maxChips?: number;
    showMoreText?: string;
    showLessText?: string;
    searchable?: boolean;
    searchPlaceholder?: string;
    searchClassName?: string;
    noResultsText?: string;
    loading?: boolean;
    loadingText?: string;
}
interface FilterChipsState {
    activeChips: string[];
    searchTerm: string;
    showAll: boolean;
}
type FilterFunction = (data: any[], filterKey: string | string[], chipValue: any) => any[];
interface FilterChipsContextType {
    activeChips: string[];
    toggleChip: (chipId: string) => void;
    clearAll: () => void;
    isActive: (chipId: string) => boolean;
}

declare const FilterChips: React$1.FC<FilterChipsProps>;

export { FilterChips, FilterChips as default };
export type { FilterChip, FilterChipsContextType, FilterChipsProps, FilterChipsState, FilterFunction };
