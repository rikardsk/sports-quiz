import React, { useState, useEffect, useMemo } from 'react';
import { AllsvenskanClub, ALLSVENSKAN_CLUBS } from '../data/allsvenskanTeamsData';
import { searchClubs, filterClubsByRegion } from '../utils/allsvenskanUtils';
import { ALLSVENSKAN_STANDINGS_URL } from '../data/allsvenskanResourcesData';
import { X, Search, CheckCircle2, Trophy, ExternalLink } from 'lucide-react';
import { FilterOption } from './DivisionFilter';

export interface TeamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTeam: (team: AllsvenskanClub) => void;
  selectedTeamId?: string;
  exploredTeams: Set<string>;
}

function useEscapeKey(isOpen: boolean, onClose: () => void): void {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
}

const TeamsModalHeader: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
    <div>
      <h2 className="text-xl font-bold text-slate-900">Alla 16 Allsvenskan-klubbar</h2>
      <p className="text-xs text-slate-500">Utforska klubbar efter region, arena och stad</p>
    </div>
    <div className="flex items-center gap-2">
      <a
        href={ALLSVENSKAN_STANDINGS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:text-emerald-600 transition-all flex items-center gap-1.5 shadow-2xs"
        title="Se officiell Allsvensk tabell"
      >
        <Trophy className="w-3.5 h-3.5 text-amber-500" />
        <span className="hidden sm:inline">Tabell</span>
        <ExternalLink className="w-3 h-3 text-slate-400" />
      </a>
      <button
        onClick={onClose}
        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
        aria-label="Stäng modal"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const TeamsModalSearch: React.FC<{
  search: string;
  onSearchChange: (val: string) => void;
  filter: FilterOption;
  onFilterChange: (opt: FilterOption) => void;
}> = ({ search, onSearchChange, filter, onFilterChange }) => (
  <div className="p-4 border-b border-slate-100">
    <div className="search-bar-wrapper mb-3">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Sök klubb, arena eller stad..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {search.length > 0 && (
        <button
          type="button"
          onClick={() => onSearchChange('')}
          className="search-clear-button"
          aria-label="Rensa sökning"
          title="Rensa sökning"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
    <div className="flex items-center gap-1.5">
      {(['All', 'Götaland', 'Svealand', 'Norrland'] as FilterOption[]).map((opt) => (
        <button
          key={opt}
          onClick={() => onFilterChange(opt)}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
            filter === opt
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const TeamModalRow: React.FC<{
  team: AllsvenskanClub;
  isSelected: boolean;
  isExplored: boolean;
  onSelect: (t: AllsvenskanClub) => void;
}> = ({ team, isSelected, isExplored, onSelect }) => (
  <button
    onClick={() => onSelect(team)}
    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 ${
      isSelected
        ? 'border-emerald-500 bg-emerald-50/70 shadow-xs ring-1 ring-emerald-300'
        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
    }`}
  >
    <div className="flex items-center gap-3 min-w-0">
      <img
        src={team.logo}
        alt=""
        className="w-8 h-8 object-contain flex-shrink-0"
        style={{ width: '32px', height: '32px', objectFit: 'contain' }}
      />
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-bold text-sm text-slate-900 truncate">{team.name}</span>
          {isExplored && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />}
        </div>
        <p className="text-xs text-slate-500 truncate mt-0.5">
          {team.stadium} • {team.city} ({team.county})
        </p>
      </div>
    </div>
    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded flex-shrink-0">
      {team.region}
    </span>
  </button>
);

export const TeamsModal: React.FC<TeamsModalProps> = ({
  isOpen,
  onClose,
  onSelectTeam,
  selectedTeamId,
  exploredTeams,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterOption>('All');

  useEscapeKey(isOpen, onClose);

  const filteredTeams = useMemo(() => {
    let result = ALLSVENSKAN_CLUBS;
    if (filter !== 'All') {
      result = filterClubsByRegion(filter, result);
    }
    if (search.trim()) {
      result = searchClubs(search, result);
    }
    return result;
  }, [filter, search]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop select-none" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <TeamsModalHeader onClose={onClose} />
        <TeamsModalSearch
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
        />
        <div className="flex-1 overflow-y-auto p-4 space-y-2 max-h-[55vh] custom-scrollbar">
          {filteredTeams.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">Inga klubbar matchar din sökning</div>
          ) : (
            filteredTeams.map((team) => (
              <TeamModalRow
                key={team.id}
                team={team}
                isSelected={team.id === selectedTeamId}
                isExplored={exploredTeams.has(team.id)}
                onSelect={(t) => {
                  onSelectTeam(t);
                  onClose();
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
