export interface FilterChip {
    id: string;
    label: string;
    value: any;
    active?: boolean;
    disabled?: boolean;
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
}
export interface FilterChipsProps {
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
export interface FilterChipsState {
    activeChips: string[];
    searchTerm: string;
    showAll: boolean;
}
export type FilterFunction = (data: any[], filterKey: string | string[], chipValue: any) => any[];
export interface FilterChipsContextType {
    activeChips: string[];
    toggleChip: (chipId: string) => void;
    clearAll: () => void;
    isActive: (chipId: string) => boolean;
}
//# sourceMappingURL=types.d.ts.map