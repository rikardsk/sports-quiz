import React, { useState, useEffect, useMemo } from 'react';
import { MLSTeam, MLS_TEAMS, Conference, FullDivision } from '../data/mlsTeamsData';
import { searchTeams, filterTeamsByDivision, filterTeamsByConference } from '../utils/mlsUtils';
import { MLS_STANDINGS_URL } from '../data/mlsResourcesData';
import { X, Search, CheckCircle2, Trophy, ExternalLink } from 'lucide-react';
import { FilterOption } from './DivisionFilter';

export interface TeamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTeam: (team: MLSTeam) => void;
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
      <h2 className="text-xl font-bold text-slate-900">All 30 MLS Clubs</h2>
      <p className="text-xs text-slate-500">Explore clubs by conference and region</p>
    </div>
    <div className="flex items-center gap-2">
      <a
        href={MLS_STANDINGS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:text-emerald-600 transition-all flex items-center gap-1.5 shadow-2xs"
        title="View Official MLS Standings"
      >
        <Trophy className="w-3.5 h-3.5 text-amber-500" />
        <span className="hidden sm:inline">Standings</span>
        <ExternalLink className="w-3 h-3 text-slate-400" />
      </a>
      <button
        onClick={onClose}
        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
        aria-label="Close modal"
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
        placeholder="Search team, stadium, or city..."
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {search.length > 0 && (
        <button
          type="button"
          onClick={() => onSearchChange('')}
          className="search-clear-button"
          aria-label="Clear search"
          title="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
    <div className="flex items-center gap-1.5">
      {(['All', 'Eastern', 'Western', 'Canada'] as FilterOption[]).map((opt) => (
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

const TeamsModalCard: React.FC<{
  team: MLSTeam;
  isSelected: boolean;
  isExplored: boolean;
  onSelect: () => void;
}> = ({ team, isSelected, isExplored, onSelect }) => (
  <button
    onClick={onSelect}
    style={{ height: '74px' }}
    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
      isSelected
        ? 'border-emerald-500 bg-emerald-50/70 ring-1 ring-emerald-300'
        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
    }`}
  >
    <img
      src={team.logoUrl}
      alt={team.name}
      className="w-9 h-9 object-contain flex-shrink-0"
      style={{ width: '36px', height: '36px', objectFit: 'contain' }}
    />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        <span className="font-bold text-sm text-slate-900 truncate">{team.name}</span>
        {isExplored && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
      </div>
      <p className="text-xs text-slate-500 truncate">{team.stadium || team.arena}</p>
      <span className="text-[10px] text-slate-400 block mt-0.5">{team.conference} Conference</span>
    </div>
  </button>
);

const TeamsModalGrid: React.FC<{
  teams: MLSTeam[];
  selectedTeamId?: string;
  exploredTeams: Set<string>;
  onSelectTeam: (team: MLSTeam) => void;
  onClose: () => void;
}> = ({ teams, selectedTeamId, exploredTeams, onSelectTeam, onClose }) => (
  <div
    className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 custom-scrollbar"
    style={{ alignContent: 'start', gridAutoRows: '74px' }}
  >
    {teams.map((team) => (
      <TeamsModalCard
        key={team.id}
        team={team}
        isSelected={selectedTeamId === team.id}
        isExplored={exploredTeams.has(team.id)}
        onSelect={() => {
          onSelectTeam(team);
          onClose();
        }}
      />
    ))}
  </div>
);

function getFilteredAndSortedTeams(filter: FilterOption, search: string): MLSTeam[] {
  let list = MLS_TEAMS;
  if (filter === 'Eastern' || filter === 'Western') {
    list = filterTeamsByConference(filter as Conference, list);
  } else if (filter !== 'All') {
    list = filterTeamsByDivision(filter as FullDivision, list);
  }
  if (search.trim()) {
    list = searchTeams(search, list);
  }
  return [...list].sort((a, b) => a.name.localeCompare(b.name));
}

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

  const filteredTeams = useMemo(
    () => getFilteredAndSortedTeams(filter, search),
    [search, filter]
  );

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop select-none" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <TeamsModalHeader onClose={onClose} />
        <TeamsModalSearch
          search={search}
          onSearchChange={setSearch}
          filter={filter}
          onFilterChange={setFilter}
        />
        <TeamsModalGrid
          teams={filteredTeams}
          selectedTeamId={selectedTeamId}
          exploredTeams={exploredTeams}
          onSelectTeam={onSelectTeam}
          onClose={onClose}
        />
      </div>
    </div>
  );
};
