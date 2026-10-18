import React from 'react';
import { SHLClub, REGION_THEMES } from '../data/shlTeamsData';
import { formatCapacity } from '../utils/shlUtils';
import { MapPin, Trophy, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, X, Shield, Users } from 'lucide-react';

export interface TeamCardProps {
  team: SHLClub | null;
  onNextTeam: () => void;
  onPrevTeam: () => void;
  isExplored: boolean;
  onClose?: () => void;
}

const TeamCardEmpty: React.FC = () => (
  <div className="state-card-empty team-card">
    <Shield className="w-12 h-12 text-slate-300 mb-3 animate-bounce" />
    <h3 className="text-lg font-semibold text-slate-700">Select Any Club</h3>
    <p className="text-sm text-slate-500 max-w-xs text-center mt-2 leading-relaxed">
      Click on any arena or club pin on the map of Sweden to explore club details, venues, and history.
    </p>
  </div>
);

const TeamCardHeader: React.FC<{ team: SHLClub; onClose?: () => void }> = ({ team, onClose }) => {
  const theme = REGION_THEMES[team.region] || REGION_THEMES['Svealand'];

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span
          className="w-3.5 h-3.5 rounded-full inline-block shadow-sm"
          style={{ backgroundColor: team.primaryColor }}
        />
        <span className={`text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border ${theme.badge}`}>
          {`${team.region} Region`}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
          {team.county}
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close Team Details"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

const TeamTitleSection: React.FC<{ team: SHLClub; isExplored: boolean }> = ({ team, isExplored }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <img
          src={team.logo}
          alt={team.name}
          className="w-11 h-11 object-contain filter drop-shadow-md flex-shrink-0"
          style={{ width: '44px', height: '44px', objectFit: 'contain' }}
        />
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{team.name}</span>
            {isExplored && (
              <span title="Explored">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
            {team.city}, {team.county} län
          </p>
        </div>
      </div>
    </div>
  );
};

const TeamStatsGrid: React.FC<{ team: SHLClub }> = ({ team }) => (
  <div className="grid grid-cols-2 gap-2.5 mb-4">
    <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3">
      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
        Hemmaarena
      </span>
      <span className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-2">{team.stadium}</span>
      <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
        <Users className="w-3 h-3" /> Cap: {formatCapacity(team.capacity)}
      </span>
    </div>
    <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3">
      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
        SM-Guld (Titles)
      </span>
      <span className="text-xs sm:text-sm font-bold text-amber-600 flex items-center gap-1.5">
        <Trophy className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
        {team.titles > 0 ? `${team.titles} SM-Guld` : 'Inga SM-guld än'}
      </span>
      <span className="text-[10px] text-slate-400 mt-0.5 block">Grundad {team.founded}</span>
    </div>
  </div>
);

const TeamTriviaBox: React.FC<{ team: SHLClub }> = ({ team }) => (
  <div className="mb-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5">
    <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-1.5">
      <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
      Klubbfakta (Grundad {team.founded})
    </span>
    <p className="text-xs text-slate-700 leading-relaxed">{team.trivia}</p>
  </div>
);

const TeamCardNav: React.FC<{
  onPrev: () => void;
  onNext: () => void;
}> = ({ onPrev, onNext }) => (
  <div className="flex items-center justify-between pt-3 mt-auto border-t border-slate-100 shrink-0">
    <button
      onClick={onPrev}
      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3 py-1.5 rounded-xl transition-all select-none"
    >
      <ChevronLeft className="w-4 h-4 shrink-0" />
      <span className="leading-none pt-[1px]">Previous Club</span>
    </button>
    <button
      onClick={onNext}
      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3 py-1.5 rounded-xl transition-all select-none"
    >
      <span className="leading-none pt-[1px]">Next Club</span>
      <ChevronRight className="w-4 h-4 shrink-0" />
    </button>
  </div>
);

export const TeamCard: React.FC<TeamCardProps> = ({
  team,
  onNextTeam,
  onPrevTeam,
  isExplored,
  onClose,
}) => {
  if (!team) return <TeamCardEmpty />;

  return (
    <div className="team-card h-full max-h-full">
      <div className="flex-1 overflow-y-auto pr-0.5 custom-scrollbar min-h-0 mb-2">
        <TeamCardHeader team={team} onClose={onClose} />
        <TeamTitleSection team={team} isExplored={isExplored} />
        <TeamStatsGrid team={team} />
        <TeamTriviaBox team={team} />
      </div>
      <TeamCardNav onPrev={onPrevTeam} onNext={onNextTeam} />
    </div>
  );
};
