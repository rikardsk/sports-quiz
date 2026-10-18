import React from 'react';
import { PremierLeagueClub, REGION_THEMES, getClubWebsite } from '../data/premierLeagueTeamsData';
import { MapPin, Trophy, Sparkles, CheckCircle2, ChevronRight, ChevronLeft, X, Shield, ExternalLink, Users } from 'lucide-react';

export interface TeamCardProps {
  team: PremierLeagueClub | null;
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
      Click on any stadium or club pin on the map to explore ground details, capacity, records, and history.
    </p>
  </div>
);

const TeamCardHeader: React.FC<{ team: PremierLeagueClub; onClose?: () => void }> = ({ team, onClose }) => {
  const regionTheme = REGION_THEMES[team.region] || { badge: 'bg-purple-100 text-purple-800 border-purple-300' };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2">
        <span
          className="w-3.5 h-3.5 rounded-full inline-block shadow-sm"
          style={{ backgroundColor: team.primaryColor }}
        />
        <span className={`text-xs font-bold tracking-wider uppercase px-2.5 py-1 rounded-md border ${regionTheme.badge}`}>
          {team.region}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-mono font-bold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
          {team.id}
        </span>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close Club Details"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

const TeamTitleSection: React.FC<{ team: PremierLeagueClub; isExplored: boolean }> = ({ team, isExplored }) => {
  const website = getClubWebsite(team);

  return (
    <div className="mb-4">
      <div className="flex items-center gap-3">
        <a
          href={website}
          target="_blank"
          rel="noopener noreferrer"
          title={`Visit official ${team.name} website`}
          className="cursor-pointer hover:opacity-85 transition-opacity flex-shrink-0"
        >
          <img
            src={team.logoUrl}
            alt={team.name}
            className="w-12 h-12 object-contain filter drop-shadow-md"
            style={{ width: '48px', height: '48px', objectFit: 'contain' }}
          />
        </a>
        <div className="min-w-0">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <a
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              title={`Visit official ${team.name} website`}
              className="hover:text-purple-700 transition-colors"
            >
              {team.name}
            </a>
            {isExplored && (
              <span title="Explored">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              </span>
            )}
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5 font-medium">
            <MapPin className="w-3.5 h-3.5 text-purple-700 flex-shrink-0" />
            {team.city} • <span className="text-slate-700 font-semibold">{team.nickname}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

const TeamStatsGrid: React.FC<{ team: PremierLeagueClub }> = ({ team }) => (
  <div className="grid grid-cols-2 gap-2.5 mb-4">
    <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3">
      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
        Home Stadium
      </span>
      <span className="text-xs sm:text-sm font-bold text-slate-800 line-clamp-1">{team.stadium}</span>
      <span className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
        <Users className="w-3 h-3 text-slate-400" />
        {team.capacity.toLocaleString()} cap
      </span>
    </div>
    <div className="bg-slate-50 border border-slate-200/70 rounded-xl p-3">
      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mb-0.5">
        League Titles
      </span>
      <span className="text-xs sm:text-sm font-bold text-amber-600 flex items-center gap-1.5">
        <Trophy className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
        {team.leagueTitles > 0 ? `${team.leagueTitles} Titles` : 'None yet'}
      </span>
      <span className="text-[11px] text-slate-400 mt-0.5 block">
        Founded {team.established}
      </span>
    </div>
  </div>
);

const TeamWebsiteButton: React.FC<{ team: PremierLeagueClub }> = ({ team }) => (
  <a
    href={getClubWebsite(team)}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full py-2 px-3 mb-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 hover:text-purple-700 text-xs font-bold inline-flex items-center justify-center gap-1.5 transition-all shadow-sm"
  >
    <span>Visit Official Club Website</span>
    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
  </a>
);

const TeamTriviaBox: React.FC<{ team: PremierLeagueClub }> = ({ team }) => (
  <div className="mb-3 bg-amber-50/70 border border-amber-200/80 rounded-2xl p-3.5">
    <span className="text-xs font-bold text-amber-800 flex items-center gap-1.5 mb-1.5">
      <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
      Club History & Trivia (Est. {team.established})
    </span>
    <p className="text-xs text-slate-700 leading-relaxed">{team.funFact}</p>
  </div>
);

const TeamCardNav: React.FC<{
  onPrev: () => void;
  onNext: () => void;
}> = ({ onPrev, onNext }) => (
  <div className="flex items-center justify-between pt-3 mt-auto border-t border-slate-100 shrink-0">
    <button
      onClick={onPrev}
      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3 py-1.5 rounded-xl transition-all select-none cursor-pointer"
    >
      <ChevronLeft className="w-4 h-4 shrink-0" />
      <span className="leading-none pt-[1px]">Previous Club</span>
    </button>
    <button
      onClick={onNext}
      className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 px-3 py-1.5 rounded-xl transition-all select-none cursor-pointer"
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
        <TeamWebsiteButton team={team} />
        <TeamTriviaBox team={team} />
      </div>
      <TeamCardNav onPrev={onPrevTeam} onNext={onNextTeam} />
    </div>
  );
};

export const ClubCard = TeamCard;
