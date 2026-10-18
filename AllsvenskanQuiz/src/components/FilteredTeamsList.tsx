import React from 'react';
import { AllsvenskanClub, REGION_THEMES, REGION_COLORS } from '../data/allsvenskanTeamsData';
import { FilterOption } from './DivisionFilter';
import { CheckCircle2, Shield, MapPin } from 'lucide-react';

export interface FilteredTeamsListProps {
  filter: FilterOption;
  teams: AllsvenskanClub[];
  exploredTeams: Set<string>;
  onSelectTeam: (team: AllsvenskanClub) => void;
}

function getFilterBadge(filter: FilterOption) {
  if (filter === 'All') return null;
  const theme = REGION_THEMES[filter as 'Götaland' | 'Svealand' | 'Norrland'];
  if (theme) {
    return <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${theme.badge}`}>{filter}</span>;
  }
  const colorInfo = REGION_COLORS[filter as string];
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded border"
      style={{ backgroundColor: colorInfo?.bg, borderColor: colorInfo?.border }}
    >
      {filter}
    </span>
  );
}

const FilteredTeamsHeader: React.FC<{ filter: FilterOption; count: number }> = ({ filter, count }) => (
  <div className="flex items-center justify-between pb-3 mb-2 border-b border-slate-100 shrink-0">
    <div className="flex items-center gap-2">
      <Shield className="w-4 h-4 text-emerald-600" />
      <div>
        <h3 className="text-base font-extrabold text-slate-900 leading-tight">
          {filter === 'All' ? 'All Allsvenskan Clubs' : `${filter} Clubs`}
        </h3>
        <span className="text-[11px] text-slate-500">
          {`${count} ${count === 1 ? 'club' : 'clubs'} • Select to view details`}
        </span>
      </div>
    </div>
    {getFilterBadge(filter)}
  </div>
);

const DivisionTeamItem: React.FC<{
  team: AllsvenskanClub;
  isExplored: boolean;
  onSelect: (team: AllsvenskanClub) => void;
}> = ({ team, isExplored, onSelect }) => (
  <button
    onClick={() => onSelect(team)}
    className="w-full p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-3 text-left group shadow-xs"
  >
    <img
      src={team.logo}
      alt={team.name}
      className="w-10 h-10 object-contain shrink-0 group-hover:scale-105 transition-transform"
      style={{ width: '40px', height: '40px', objectFit: 'contain' }}
    />
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-1.5">
        <span className="font-bold text-sm text-slate-900 truncate">{team.name}</span>
        {isExplored && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-1 min-w-0">
        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
        <span className="truncate">{team.city}</span>
        <span className="text-slate-300">•</span>
        <span className="font-semibold text-slate-700 shrink-0 bg-slate-100 border border-slate-200/80 px-1.5 py-0.2 rounded text-[11px]">
          {team.county}
        </span>
      </div>
      <div className="text-[11px] text-slate-400 truncate mt-0.5">{team.stadium}</div>
    </div>
  </button>
);

const CompactTeamItem: React.FC<{
  team: AllsvenskanClub;
  isExplored: boolean;
  onSelect: (team: AllsvenskanClub) => void;
}> = ({ team, isExplored, onSelect }) => (
  <button
    onClick={() => onSelect(team)}
    className="w-full px-2.5 py-2 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center gap-2.5 text-left group shadow-xs"
  >
    <img
      src={team.logo}
      alt={team.name}
      className="w-7 h-7 object-contain shrink-0 group-hover:scale-105 transition-transform"
      style={{ width: '28px', height: '28px', objectFit: 'contain' }}
    />
    <div className="min-w-0 flex-1">
      <div className="flex items-center gap-1.5">
        <span className="font-bold text-xs text-slate-900 truncate">{team.name}</span>
        {isExplored && <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />}
      </div>
      <p className="text-[11px] text-slate-500 truncate flex items-center gap-1 mt-0.5">
        <span>{team.stadium}</span>
        <span className="text-slate-300">•</span>
        <span className="text-slate-600 font-medium">{team.city}</span>
      </p>
    </div>
  </button>
);

export const FilteredTeamsList: React.FC<FilteredTeamsListProps> = ({
  filter,
  teams,
  exploredTeams,
  onSelectTeam,
}) => {
  const isAllFilter = filter === 'All';

  return (
    <div className="team-card h-full max-h-full flex flex-col min-h-0">
      <FilteredTeamsHeader filter={filter} count={teams.length} />
      <div className="flex-1 overflow-y-auto pr-0.5 custom-scrollbar min-h-0 space-y-2">
        {teams.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-xs">
            Inga klubbar i denna region i årets Allsvenskan.
          </div>
        ) : (
          teams.map((team) =>
            isAllFilter ? (
              <CompactTeamItem
                key={team.id}
                team={team}
                isExplored={exploredTeams.has(team.id)}
                onSelect={onSelectTeam}
              />
            ) : (
              <DivisionTeamItem
                key={team.id}
                team={team}
                isExplored={exploredTeams.has(team.id)}
                onSelect={onSelectTeam}
              />
            )
          )
        )}
      </div>
    </div>
  );
};
