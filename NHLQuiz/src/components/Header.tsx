import React from 'react';
import { Search, Compass, X } from 'lucide-react';
import { NHLTeam } from '../data/nhlTeamsData';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectTeamByName: (name: string) => void;
  searchResults: NHLTeam[];
}

const SearchDropdown: React.FC<{
  results: NHLTeam[];
  onSelect: (name: string) => void;
}> = ({ results, onSelect }) => {
  if (results.length === 0) {
    return <div className="p-3 text-xs text-slate-400 text-center">No matching NHL teams found</div>;
  }

  return (
    <>
      {results.map((team) => (
        <button
          key={team.id}
          onClick={() => onSelect(team.name)}
          className="w-full px-4 py-2 text-left text-sm hover:bg-rose-50/60 flex items-center justify-between transition-colors"
        >
          <div className="flex items-center gap-2.5">
            <img
              src={team.logoUrl}
              alt=""
              className="w-5 h-5 object-contain flex-shrink-0"
              style={{ width: '20px', height: '20px', objectFit: 'contain' }}
            />
            <span className="font-semibold text-slate-800">{team.name}</span>
          </div>
          <span className="text-xs text-slate-500">
            {team.arena} • {team.city}, {team.state}
          </span>
        </button>
      ))}
    </>
  );
};

const HeaderTitle: React.FC = () => (
  <div className="pb-4 border-b border-slate-200">
    <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm mb-1">
      <Compass className="w-4 h-4 animate-spin-slow" />
      <span>Interactive NHL Geography</span>
    </div>
    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
      32 NHL Teams & Arenas Explorer
    </h1>
    <p className="text-sm text-slate-500 mt-1">
      Click any team or arena pin on the map or search below to explore franchises, divisions, and stats.
    </p>
  </div>
);

const SearchInputBar: React.FC<{
  query: string;
  onChange: (val: string) => void;
}> = ({ query, onChange }) => (
  <div className="search-bar-wrapper">
    <Search className="search-icon" />
    <input
      type="text"
      placeholder="Search team, arena, city, or division (e.g. Bruins, Bell Centre, Madison Square Garden, Atlantic)..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
      className="search-input"
    />
    {query.length > 0 && (
      <button
        type="button"
        onClick={() => onChange('')}
        className="search-clear-button"
        aria-label="Clear search"
        title="Clear search"
      >
        <X className="w-4 h-4" />
      </button>
    )}
  </div>
);

export const Header: React.FC<HeaderProps> = ({
  searchQuery,
  onSearchChange,
  onSelectTeamByName,
  searchResults,
}) => (
  <header className="w-full max-w-5xl mx-auto mb-6">
    <HeaderTitle />
    <div className="relative mt-4">
      <SearchInputBar query={searchQuery} onChange={onSearchChange} />
      {searchQuery.trim().length > 0 && (
        <div className="absolute z-30 left-0 right-0 mt-1.5 max-h-56 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-xl divide-y divide-slate-100">
          <SearchDropdown
            results={searchResults}
            onSelect={(name) => {
              onSelectTeamByName(name);
              onSearchChange('');
            }}
          />
        </div>
      )}
    </div>
  </header>
);
