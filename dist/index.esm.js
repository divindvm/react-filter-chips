import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { createContext, useState, useMemo, useCallback } from 'react';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol, Iterator */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var FilterChipsContext = createContext(null);
var defaultFilterFunction = function (data, filterKey, chipValue) {
    if (!data || data.length === 0)
        return [];
    return data.filter(function (item) {
        if (Array.isArray(filterKey)) {
            return filterKey.some(function (key) {
                var value = item[key];
                if (Array.isArray(value)) {
                    return value.includes(chipValue);
                }
                return value === chipValue;
            });
        }
        else {
            var value = item[filterKey];
            if (Array.isArray(value)) {
                return value.includes(chipValue);
            }
            return value === chipValue;
        }
    });
};
var FilterChips = function (_a) {
    var chips = _a.chips, onChipClick = _a.onChipClick, data = _a.data, filterKey = _a.filterKey, _b = _a.multiSelect, multiSelect = _b === void 0 ? false : _b, _c = _a.className, className = _c === void 0 ? '' : _c, _d = _a.chipClassName, chipClassName = _d === void 0 ? '' : _d, _e = _a.activeChipClassName, activeChipClassName = _e === void 0 ? '' : _e, _f = _a.disabledChipClassName, disabledChipClassName = _f === void 0 ? '' : _f, style = _a.style, chipStyle = _a.chipStyle, _g = _a.showClearAll, showClearAll = _g === void 0 ? true : _g, _h = _a.clearAllText, clearAllText = _h === void 0 ? 'Clear All' : _h, _j = _a.clearAllClassName, clearAllClassName = _j === void 0 ? '' : _j, maxChips = _a.maxChips, _k = _a.showMoreText, showMoreText = _k === void 0 ? 'Show More' : _k, _l = _a.showLessText, showLessText = _l === void 0 ? 'Show Less' : _l, _m = _a.searchable, searchable = _m === void 0 ? false : _m, _o = _a.searchPlaceholder, searchPlaceholder = _o === void 0 ? 'Search chips...' : _o, _p = _a.searchClassName, searchClassName = _p === void 0 ? '' : _p, _q = _a.noResultsText, noResultsText = _q === void 0 ? 'No chips found' : _q, _r = _a.loading, loading = _r === void 0 ? false : _r, _s = _a.loadingText, loadingText = _s === void 0 ? 'Loading...' : _s;
    var _t = useState({
        activeChips: chips.filter(function (chip) { return chip.active; }).map(function (chip) { return chip.id; }),
        searchTerm: '',
        showAll: false,
    }), state = _t[0], setState = _t[1];
    var filteredChips = useMemo(function () {
        var filtered = chips;
        if (searchable && state.searchTerm) {
            filtered = chips.filter(function (chip) {
                return chip.label.toLowerCase().includes(state.searchTerm.toLowerCase());
            });
        }
        if (maxChips && !state.showAll) {
            filtered = filtered.slice(0, maxChips);
        }
        return filtered;
    }, [chips, state.searchTerm, state.showAll, maxChips, searchable]);
    var toggleChip = useCallback(function (chipId) {
        setState(function (prevState) {
            var newActiveChips;
            if (multiSelect) {
                newActiveChips = prevState.activeChips.includes(chipId)
                    ? prevState.activeChips.filter(function (id) { return id !== chipId; })
                    : __spreadArray(__spreadArray([], prevState.activeChips, true), [chipId], false);
            }
            else {
                newActiveChips = prevState.activeChips.includes(chipId)
                    ? []
                    : [chipId];
            }
            // Get filtered data based on active chips
            var activeChipObjects = chips.filter(function (chip) { return newActiveChips.includes(chip.id); });
            var filteredData = data;
            if (activeChipObjects.length > 0) {
                if (multiSelect) {
                    // For multi-select, combine all active chip filters
                    filteredData = activeChipObjects.reduce(function (acc, chip) {
                        var chipFiltered = defaultFilterFunction(acc, filterKey, chip.value);
                        return chipFiltered;
                    }, data);
                }
                else {
                    // For single select, use the last selected chip
                    var lastChip = activeChipObjects[activeChipObjects.length - 1];
                    filteredData = defaultFilterFunction(data, filterKey, lastChip.value);
                }
            }
            // Call the onChipClick callback
            var clickedChip = chips.find(function (chip) { return chip.id === chipId; });
            if (clickedChip) {
                onChipClick(clickedChip, filteredData);
            }
            return __assign(__assign({}, prevState), { activeChips: newActiveChips });
        });
    }, [chips, data, filterKey, multiSelect, onChipClick]);
    var clearAll = useCallback(function () {
        setState(function (prevState) { return (__assign(__assign({}, prevState), { activeChips: [] })); });
        onChipClick({}, data);
    }, [data, onChipClick]);
    var isActive = useCallback(function (chipId) {
        return state.activeChips.includes(chipId);
    }, [state.activeChips]);
    var handleSearchChange = useCallback(function (e) {
        setState(function (prevState) { return (__assign(__assign({}, prevState), { searchTerm: e.target.value })); });
    }, []);
    var toggleShowAll = useCallback(function () {
        setState(function (prevState) { return (__assign(__assign({}, prevState), { showAll: !prevState.showAll })); });
    }, []);
    var contextValue = {
        activeChips: state.activeChips,
        toggleChip: toggleChip,
        clearAll: clearAll,
        isActive: isActive,
    };
    if (loading) {
        return (jsx("div", { className: "filter-chips-container ".concat(className), style: style, children: jsx("div", { className: "filter-chips-loading", children: loadingText }) }));
    }
    return (jsx(FilterChipsContext.Provider, { value: contextValue, children: jsxs("div", { className: "filter-chips-container ".concat(className), style: style, children: [searchable && (jsx("div", { className: "filter-chips-search", children: jsx("input", { type: "text", placeholder: searchPlaceholder, value: state.searchTerm, onChange: handleSearchChange, className: "filter-chips-search-input ".concat(searchClassName) }) })), jsx("div", { className: "filter-chips-wrapper", children: filteredChips.length === 0 ? (jsx("div", { className: "filter-chips-no-results", children: noResultsText })) : (jsxs(Fragment, { children: [jsx("div", { className: "filter-chips-list", children: filteredChips.map(function (chip) { return (jsx(Chip, { chip: chip, isActive: isActive(chip.id), onClick: function () { return !chip.disabled && toggleChip(chip.id); }, className: chipClassName, activeClassName: activeChipClassName, disabledClassName: disabledChipClassName, style: chipStyle }, chip.id)); }) }), maxChips && chips.length > maxChips && (jsx("button", { type: "button", onClick: toggleShowAll, className: "filter-chips-toggle", children: state.showAll ? showLessText : showMoreText }))] })) }), showClearAll && state.activeChips.length > 0 && (jsx("button", { type: "button", onClick: clearAll, className: "filter-chips-clear-all ".concat(clearAllClassName), children: clearAllText }))] }) }));
};
var Chip = function (_a) {
    var chip = _a.chip, isActive = _a.isActive, onClick = _a.onClick, _b = _a.className, className = _b === void 0 ? '' : _b, _c = _a.activeClassName, activeClassName = _c === void 0 ? '' : _c, _d = _a.disabledClassName, disabledClassName = _d === void 0 ? '' : _d, style = _a.style;
    var chipStyles = __assign(__assign(__assign(__assign({}, style), (chip.color && { color: chip.color })), (chip.backgroundColor && { backgroundColor: chip.backgroundColor })), (chip.borderColor && { borderColor: chip.borderColor }));
    var chipClasses = [
        'filter-chip',
        className,
        isActive ? "filter-chip-active ".concat(activeClassName) : '',
        chip.disabled ? "filter-chip-disabled ".concat(disabledClassName) : '',
    ].filter(Boolean).join(' ');
    return (jsx("button", { type: "button", className: chipClasses, style: chipStyles, onClick: onClick, disabled: chip.disabled, "aria-pressed": isActive, "aria-label": "Filter by ".concat(chip.label), children: chip.label }));
};

export { FilterChips, FilterChips as default };
//# sourceMappingURL=index.esm.js.map
