import React from 'react';
import { Conference, FullDivision, DIVISION_COLORS } from '../data/mlsTeamsData';

export type FilterOption = 'All' | Conference | FullDivision;

interface DivisionFilterProps {
  currentFilter: FilterOption;
  onSelectFilter: (filter: FilterOption) => void;
}

const FILTER_GROUPS: FilterOption[] = [
  'All',
  'Eastern',
  'Western',
  'Canada',
];

function getFilterColor(filter: FilterOption): { bg: string; border: string } | null {
  if (filter === 'All') return null;
  if (filter === 'Eastern') return { bg: '#dbeafe', border: '#93c5fd' };
  if (filter === 'Western') return { bg: '#fee2e2', border: '#fca5a5' };
  const div = DIVISION_COLORS[filter as string];
  if (div) return { bg: div.bg, border: div.border };
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
      boxShadow: '0 0 0 2px #ffffff, 0 0 0 4px #0f172a, 0 2px 5px rgba(0, 0, 0, 0.15)',
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
  const isEastern = filter === 'Eastern';
  const isWestern = filter === 'Western';
  const isCanada = filter === 'Canada';

  const activeClasses = color
    ? 'font-extrabold text-slate-950 opacity-100 scale-[1.02]'
    : 'bg-slate-900 text-white font-extrabold opacity-100 scale-[1.02]';

  const inactiveClasses = color
    ? `${dimmed ? 'opacity-70' : 'opacity-100'} text-slate-800 font-medium hover:brightness-95 hover:opacity-100 hover:shadow-xs`
    : 'bg-white text-slate-700 hover:bg-slate-100/70';

  return (
    <button
      onClick={onClick}
      style={getFilterButtonStyle(color, isActive)}
      className={`px-2.5 py-1 rounded-lg text-xs transition-all flex items-center gap-1.5 ${
        isActive ? activeClasses : inactiveClasses
      }`}
    >
      {isEastern && <span className="w-2 h-2 rounded-full bg-blue-500 inline-block shrink-0" />}
      {isWestern && <span className="w-2 h-2 rounded-full bg-red-500 inline-block shrink-0" />}
      {isCanada && <span className="w-2 h-2 rounded-full bg-amber-500 inline-block shrink-0" />}
      {filter}
    </button>
  );
};

export const DivisionFilter: React.FC<DivisionFilterProps> = ({
  currentFilter,
  onSelectFilter,
}) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="text-xs font-semibold text-slate-500 mr-1">Filter:</span>
      {FILTER_GROUPS.map((filter) => (
        <FilterButton
          key={filter}
          filter={filter}
          isActive={currentFilter === filter}
          dimmed={currentFilter !== 'All' && currentFilter !== filter}
          onClick={() => onSelectFilter(filter)}
        />
      ))}
    </div>
  );
};
