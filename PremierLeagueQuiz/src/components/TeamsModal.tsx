import React, { useState, useEffect, useMemo } from 'react';
import { PremierLeagueClub, PREMIER_LEAGUE_CLUBS } from '../data/premierLeagueTeamsData';
import { searchClubs, filterClubsByRegion } from '../utils/eplUtils';
import { PREMIER_LEAGUE_TABLES_URL } from '../data/premierLeagueResourcesData';
import { X, Search, CheckCircle2, Trophy, ExternalLink } from 'lucide-react';

export interface TeamsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTeam: (club: PremierLeagueClub) => void;
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
      <h2 className="text-xl font-bold text-slate-900">All 20 Premier League Clubs</h2>
      <p className="text-xs text-slate-500">Explore clubs by region, stadium, and history</p>
    </div>
    <div className="flex items-center gap-2">
      <a
        href={PREMIER_LEAGUE_TABLES_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="px-2.5 py-1 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:text-purple-700 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
        title="View Official Premier League Tables"
      >
        <Trophy className="w-3.5 h-3.5 text-amber-500" />
        <span className="hidden sm:inline">Tables</span>
        <ExternalLink className="w-3 h-3 text-slate-400" />
      </a>
      <button
        onClick={onClose}
        className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
        aria-label="Close modal"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  </div>
);

const QUICK_FILTERS = ['All', 'Greater London', 'North West', 'West Midlands', 'East Midlands'];

const TeamsModalSearch: React.FC<{
  search: string;
  onSearchChange: (val: string) => void;
  filter: string;
  onFilterChange: (opt: string) => void;
}> = ({ search, onSearchChange, filter, onFilterChange }) => (
  <div className="p-4 border-b border-slate-100">
    <div className="search-bar-wrapper mb-3">
      <Search className="search-icon" />
      <input
        type="text"
        placeholder="Search club, stadium, or city..."
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
    <div className="flex items-center gap-1.5 overflow-x-auto pb-1 custom-scrollbar">
      {QUICK_FILTERS.map((opt) => (
        <button
          key={opt}
          onClick={() => onFilterChange(opt)}
          className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all cursor-pointer whitespace-nowrap ${
            filter === opt
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          {opt === 'Greater London' ? 'London (7)' : opt}
        </button>
      ))}
    </div>
  </div>
);

const TeamsModalCard: React.FC<{
  team: PremierLeagueClub;
  isSelected: boolean;
  isExplored: boolean;
  onSelect: () => void;
}> = ({ team, isSelected, isExplored, onSelect }) => (
  <button
    onClick={onSelect}
    style={{ height: '74px' }}
    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-3 cursor-pointer ${
      isSelected
        ? 'border-purple-600 bg-purple-50/70 ring-1 ring-purple-300'
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
      <p className="text-xs text-slate-500 truncate">{team.stadium}</p>
      <span className="text-[10px] text-slate-400 block mt-0.5">{team.region}</span>
    </div>
  </button>
);

const TeamsModalGrid: React.FC<{
  teams: PremierLeagueClub[];
  selectedTeamId?: string;
  exploredTeams: Set<string>;
  onSelectTeam: (club: PremierLeagueClub) => void;
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

export const TeamsModal: React.FC<TeamsModalProps> = ({
  isOpen,
  onClose,
  onSelectTeam,
  selectedTeamId,
  exploredTeams,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');

  useEscapeKey(isOpen, onClose);

  const filteredTeams = useMemo(() => {
    let list = PREMIER_LEAGUE_CLUBS;
    if (filter !== 'All') {
      list = filterClubsByRegion(filter);
    }
    if (search.trim()) {
      list = searchClubs(search);
      if (filter !== 'All') {
        list = list.filter((c) => c.region === filter);
      }
    }
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [filter, search]);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop select-none" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container teams-modal-container" onClick={(e) => e.stopPropagation()}>
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

export const ClubsModal = TeamsModal;
