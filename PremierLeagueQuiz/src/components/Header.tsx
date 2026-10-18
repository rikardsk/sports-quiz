import React from 'react';
import { Search, Compass, X } from 'lucide-react';
import { PremierLeagueClub } from '../data/premierLeagueTeamsData';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectTeamByName: (name: string) => void;
  searchResults: PremierLeagueClub[];
}

const SearchDropdown: React.FC<{
  results: PremierLeagueClub[];
  onSelect: (name: string) => void;
}> = ({ results, onSelect }) => {
  if (results.length === 0) {
    return <div className="p-3 text-xs text-slate-400 text-center">No matching Premier League clubs found</div>;
  }

  return (
    <>
      {results.map((club) => (
        <button
          key={club.id}
          onClick={() => onSelect(club.name)}
          className="w-full px-4 py-2 text-left text-sm hover:bg-purple-50/70 flex items-center justify-between transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2.5">
            <img
              src={club.logoUrl}
              alt=""
              className="w-5 h-5 object-contain flex-shrink-0"
              style={{ width: '20px', height: '20px', objectFit: 'contain' }}
            />
            <span className="font-semibold text-slate-800">{club.name}</span>
          </div>
          <span className="text-xs text-slate-500">
            {club.stadium} • {club.city} ({club.region})
          </span>
        </button>
      ))}
    </>
  );
};

const HeaderTitle: React.FC = () => (
  <div className="pb-4 border-b border-slate-200">
    <div className="flex items-center gap-2 text-purple-700 font-semibold text-sm mb-1">
      <Compass className="w-4 h-4 animate-spin-slow" />
      <span>Interactive Premier League Geography</span>
    </div>
    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
      20 Premier League Clubs & Stadiums Explorer
    </h1>
    <p className="text-sm text-slate-500 mt-1">
      Click any club crest or stadium pin on the map or search below to explore clubs, stadiums, capacities, and records.
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
      placeholder="Search club, stadium, city, nickname, or region (e.g. Arsenal, Anfield, Old Trafford, North West)..."
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
