import React, { useState, useMemo } from 'react';
import { SWEDEN_COUNTIES, SwedenCounty } from '../data/swedenMapData';
import {
  SHL_CLUBS,
  SHLClub,
  SwedenRegion,
} from '../data/shlTeamsData';
import { FilterOption } from './DivisionFilter';

interface SwedenMapProps {
  selectedTeam: SHLClub | null;
  onSelectTeam: (team: SHLClub) => void;
  activeFilter?: FilterOption;
  exploredTeams?: Set<string>;
  isQuizMode?: boolean;
  targetHighlightTeamId?: string | null;
  disableMapSelection?: boolean;
  quizFeedback?: { teamId: string; status: 'correct' | 'incorrect' | 'revealed' } | null;
  hintDivision?: string | null;
  hintState?: string | null;
  correctTeamIds?: Set<string>;
  revealedTeamIds?: Set<string>;
}

function getMarkerRingColor(
  team: SHLClub,
  feedback: { teamId: string; status: 'correct' | 'incorrect' | 'revealed' } | null,
  isCorrect: boolean,
  isRevealed: boolean,
  isSelected: boolean,
  isTarget: boolean
): string {
  if (feedback?.teamId === team.id) {
    if (feedback.status === 'correct') return '#10b981';
    if (feedback.status === 'revealed') return '#f59e0b';
    return '#ef4444';
  }
  if (isCorrect) return '#10b981';
  if (isRevealed) return '#f59e0b';
  if (isTarget || isSelected) return '#f43f5e';
  return team.primaryColor || '#94a3b8';
}

function getRegionCountyFill(region: SwedenRegion, filter: FilterOption): string {
  if (filter === 'All') {
    if (region === 'Götaland') return '#f0f9ff';
    if (region === 'Svealand') return '#fffbeb';
    return '#f0fdf4';
  }
  if (filter === region) {
    if (region === 'Götaland') return '#dbeafe';
    if (region === 'Svealand') return '#fef3c7';
    return '#dcfce7';
  }
  return '#f8fafc';
}

function getCountyFill(
  county: SwedenCounty,
  activeFilter: FilterOption,
  hintState: string | null,
  selectedTeam: SHLClub | null
): string {
  if (hintState && (county.id === hintState || county.name === hintState)) {
    return '#fde047';
  }
  if (selectedTeam && (selectedTeam.state === county.id || selectedTeam.county === county.name)) {
    return '#fde68a';
  }
  return getRegionCountyFill(county.region, activeFilter);
}

function getCountyBorder(county: SwedenCounty, activeFilter: FilterOption, hintState?: string | null): string {
  if (hintState && (county.id === hintState || county.name === hintState)) {
    return '#e11d48';
  }
  if (activeFilter === county.region) {
    if (county.region === 'Götaland') return '#38bdf8';
    if (county.region === 'Svealand') return '#f59e0b';
    return '#4ade80';
  }
  return '#cbd5e1';
}

const PinBadge: React.FC<{ isCorrect: boolean; isRevealed: boolean }> = ({ isCorrect, isRevealed }) => {
  if (isCorrect) {
    return (
      <g transform="translate(10, -10)">
        <circle r={7} fill="#10b981" stroke="#ffffff" strokeWidth={1.5} />
        <path
          d="M-3 0 L-1 2 L3 -2"
          fill="none"
          stroke="#ffffff"
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    );
  }
  if (isRevealed) {
    return (
      <g transform="translate(10, -10)">
        <circle r={7} fill="#f59e0b" stroke="#ffffff" strokeWidth={1.5} />
        <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">?</text>
      </g>
    );
  }
  return null;
};

const TargetBeacon: React.FC = () => (
  <circle r={20} fill="#f43f5e" fillOpacity={0.25} stroke="#f43f5e" strokeWidth={2.5} />
);

const ClubPin: React.FC<{
  team: SHLClub;
  isSelected: boolean;
  isHovered: boolean;
  isCorrect: boolean;
  isRevealed: boolean;
  isTarget: boolean;
  feedback: { teamId: string; status: 'correct' | 'incorrect' | 'revealed' } | null;
  onSelect: (team: SHLClub) => void;
  onHover: (team: SHLClub | null) => void;
}> = ({ team, isSelected, isHovered, isCorrect, isRevealed, isTarget, feedback, onSelect, onHover }) => {
  const ringColor = getMarkerRingColor(team, feedback, isCorrect, isRevealed, isSelected, isTarget);
  const scale = isHovered || isSelected || isTarget ? 1.45 : 1;

  return (
    <g
      transform={`translate(${team.coordinates.x}, ${team.coordinates.y}) scale(${scale})`}
      className="cursor-pointer transition-all duration-200"
      onClick={() => onSelect(team)}
      onMouseEnter={() => onHover(team)}
      onMouseLeave={() => onHover(null)}
    >
      {isTarget && <TargetBeacon />}
      <circle
        r={16}
        fill="#ffffff"
        stroke={ringColor}
        strokeWidth={isSelected || isHovered || isCorrect || isTarget ? 3.5 : 2}
        className="filter drop-shadow-md"
      />
      <image
        href={team.logo}
        x="-11"
        y="-11"
        width="22"
        height="22"
        preserveAspectRatio="xMidYMid meet"
        pointerEvents="none"
      />
      <PinBadge isCorrect={isCorrect} isRevealed={isRevealed} />
    </g>
  );
};

const ClubHoverTooltip: React.FC<{ team: SHLClub }> = ({ team }) => (
  <div
    className="absolute pointer-events-none z-20 transition-all duration-150"
    style={{
      left: `${(team.coordinates.x / 500) * 100}%`,
      top: `${(team.coordinates.y / 900) * 100}%`,
      transform: 'translate(-50%, -135%)',
    }}
  >
    <div
      style={{
        background: '#0f172a',
        padding: '6px 12px',
        borderRadius: '10px',
        boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        border: '1px solid #334155',
        whiteSpace: 'nowrap',
        textAlign: 'center',
      }}
    >
      <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }} className="truncate">
        {team.name}
      </div>
      <div style={{ fontSize: '9px', color: '#cbd5e1', lineHeight: 1.2 }} className="truncate">
        {team.stadium} • {team.city}
      </div>
    </div>
  </div>
);

export const SwedenMap: React.FC<SwedenMapProps> = ({
  selectedTeam,
  onSelectTeam,
  activeFilter = 'All',
  isQuizMode = false,
  targetHighlightTeamId = null,
  disableMapSelection = false,
  quizFeedback = null,
  hintDivision = null,
  hintState = null,
  correctTeamIds,
  revealedTeamIds,
}) => {
  const [hoveredTeam, setHoveredTeam] = useState<SHLClub | null>(null);

  const effectiveFilter: FilterOption = isQuizMode ? 'All' : activeFilter;
  const effectiveSelectedTeam = isQuizMode ? null : selectedTeam;

  const isClubFilteredOut = (club: SHLClub): boolean => {
    if (isQuizMode) {
      if (hintDivision && club.region !== hintDivision) return true;
      return false;
    }
    if (effectiveFilter === 'All') return false;
    return club.region !== effectiveFilter;
  };

  const orderedClubs = useMemo(() => {
    if (!targetHighlightTeamId) return SHL_CLUBS;
    return [...SHL_CLUBS].sort((a, b) => {
      if (a.id === targetHighlightTeamId) return 1;
      if (b.id === targetHighlightTeamId) return -1;
      return 0;
    });
  }, [targetHighlightTeamId]);

  return (
    <div className="relative w-full aspect-[500/900] max-h-[820px] mx-auto bg-sky-50/20 rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden p-2 flex items-center justify-center">
      <svg
        viewBox="0 0 500 900"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="counties">
          {SWEDEN_COUNTIES.map((county) => (
            <path
              key={county.id}
              d={county.d}
              fill={getCountyFill(county, effectiveFilter, hintState, effectiveSelectedTeam)}
              stroke={getCountyBorder(county, effectiveFilter, hintState)}
              strokeWidth="0.9"
              className="transition-colors duration-150"
            />
          ))}
        </g>

        <g id="shl-clubs">
          {orderedClubs.map((club) => {
            if (!isQuizMode && isClubFilteredOut(club)) return null;

            return (
              <ClubPin
                key={club.id}
                team={club}
                isSelected={selectedTeam?.id === club.id}
                isHovered={hoveredTeam?.id === club.id}
                isCorrect={Boolean(correctTeamIds?.has(club.id))}
                isRevealed={Boolean(revealedTeamIds?.has(club.id))}
                isTarget={targetHighlightTeamId === club.id}
                feedback={quizFeedback}
                onSelect={(c) => {
                  if (!disableMapSelection) onSelectTeam(c);
                }}
                onHover={(c) => {
                  if (!isQuizMode) setHoveredTeam(c);
                }}
              />
            );
          })}
        </g>
      </svg>

      {!isQuizMode && hoveredTeam && <ClubHoverTooltip team={hoveredTeam} />}
    </div>
  );
};

export const USMap = SwedenMap;
