import React from 'react';
import { REGION_THEMES } from '../data/premierLeagueTeamsData';

export type FilterOption =
  | 'All'
  | 'Greater London'
  | 'North West'
  | 'West Midlands'
  | 'East Midlands'
  | 'South East'
  | 'South West'
  | 'North East'
  | 'East of England';

interface RegionFilterProps {
  currentFilter: FilterOption;
  onSelectFilter: (filter: FilterOption) => void;
}

const FILTER_GROUPS: FilterOption[] = [
  'All',
  'Greater London',
  'North West',
  'West Midlands',
  'East Midlands',
  'South East',
  'South West',
  'North East',
  'East of England',
];

function getFilterColor(filter: FilterOption): { bg: string; border: string } | null {
  if (filter === 'All') return null;
  const theme = REGION_THEMES[filter];
  if (theme) return { bg: theme.bg, border: theme.border };
  return null;
}

function getFilterButtonStyle(
  color: { bg: string; border: string } | null,
  isActive: boolean
): React.CSSProperties {
  if (isActive) {
    return {
      backgroundColor: color ? color.bg : '#0f172a',
      borderColor: '#0f172a',
      borderWidth: '2px',
      borderStyle: 'solid',
      boxShadow: '0 0 0 2px #0f172a, 0 2px 4px rgba(0, 0, 0, 0.08)',
    };
  }
  return {
    backgroundColor: color ? color.bg : '#ffffff',
    borderColor: color ? color.border : '#cbd5e1',
    borderWidth: '1.5px',
    borderStyle: 'solid',
    boxShadow: 'none',
  };
}

interface FilterButtonProps {
  filter: FilterOption;
  isActive: boolean;
  dimmed: boolean;
  onClick: () => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({
  filter,
  isActive,
  dimmed,
  onClick,
}) => {
  const color = getFilterColor(filter);

  const activeClasses = color
    ? 'font-extrabold text-slate-950 opacity-100 scale-[1.02]'
    : 'bg-slate-900 text-white font-extrabold opacity-100 scale-[1.02]';

  const inactiveClasses = color
    ? `${dimmed ? 'opacity-70' : 'opacity-100'} text-slate-800 font-medium hover:brightness-95 hover:opacity-100 hover:shadow-xs`
    : 'bg-white text-slate-700 hover:bg-slate-100/70';

  const label = filter === 'Greater London' ? 'London' : filter;

  return (
    <button
      onClick={onClick}
      style={getFilterButtonStyle(color, isActive)}
      className={`px-3 py-1.5 rounded-xl text-xs whitespace-nowrap transition-all duration-150 cursor-pointer ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      {label}
    </button>
  );
};

export const RegionFilter: React.FC<RegionFilterProps> = ({
  currentFilter,
  onSelectFilter,
}) => {
  const isFiltered = currentFilter !== 'All';

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2.5 px-1.5 max-w-full custom-scrollbar">
      {FILTER_GROUPS.map((filter) => (
        <FilterButton
          key={filter}
          filter={filter}
          isActive={currentFilter === filter}
          dimmed={isFiltered && currentFilter !== filter}
          onClick={() => onSelectFilter(filter)}
        />
      ))}
    </div>
  );
};

export const DivisionFilter = RegionFilter;
