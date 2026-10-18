import React, { useState, useMemo } from 'react';
import { US_STATES, BORDER_PATHS, SEPARATOR_PATH, USState } from '../data/usMapData';
import {
  MLB_TEAMS,
  MLBTeam,
  FullDivision,
  STATE_CONFERENCE_MAP,
  STATE_DIVISION_MAP,
  DIVISION_COLORS,
} from '../data/mlbTeamsData';
import { FilterOption } from './DivisionFilter';

interface USMapProps {
  selectedTeam: MLBTeam | null;
  onSelectTeam: (team: MLBTeam) => void;
  activeFilter?: FilterOption;
  exploredTeams?: Set<string>;
  isQuizMode?: boolean;
  targetHighlightTeamId?: string | null;
  disableMapSelection?: boolean;
  quizFeedback?: { teamId: string; status: 'correct' | 'incorrect' | 'revealed' } | null;
  hintDivision?: FullDivision | null;
  hintState?: string | null;
  correctTeamIds?: Set<string>;
  revealedTeamIds?: Set<string>;
}

function getMarkerRingColor(
  team: MLBTeam,
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

function getConferenceStateFill(stateId: string, filter: 'AL' | 'NL'): string {
  const aff = STATE_CONFERENCE_MAP[stateId] || 'None';
  if (aff === 'None') return '#f8fafc';
  if (aff === filter || aff === 'Both') {
    return filter === 'AL' ? '#fee2e2' : '#dbeafe';
  }
  return '#f1f5f9';
}

function getDivisionStateFill(stateId: string, activeFilter: FilterOption): string {
  const divs = STATE_DIVISION_MAP[stateId];
  if (!divs || divs.length === 0) return '#f8fafc';

  if (activeFilter !== 'All' && activeFilter !== 'AL' && activeFilter !== 'NL') {
    if (divs.includes(activeFilter as FullDivision)) {
      return DIVISION_COLORS[activeFilter as FullDivision]?.bg || '#f1f5f9';
    }
    return '#f1f5f9';
  }

  const primaryDiv = divs[0];
  return DIVISION_COLORS[primaryDiv]?.bg || '#f1f5f9';
}

function getStateFill(
  state: USState,
  activeFilter: FilterOption,
  hintState: string | null,
  selectedTeam: MLBTeam | null
): string {
  if (hintState && state.id === hintState) return '#fde047';
  if (selectedTeam && selectedTeam.state === state.id) return '#fde68a';

  if (activeFilter === 'AL' || activeFilter === 'NL') {
    return getConferenceStateFill(state.id, activeFilter);
  }

  return getDivisionStateFill(state.id, activeFilter);
}

function getStateBorder(state: USState, activeFilter: FilterOption, hintState?: string | null): string {
  if (hintState && state.id === hintState) return '#e11d48';
  if (activeFilter === 'AL') {
    const aff = STATE_CONFERENCE_MAP[state.id];
    return aff === 'AL' || aff === 'Both' ? '#fca5a5' : '#cbd5e1';
  }
  if (activeFilter === 'NL') {
    const aff = STATE_CONFERENCE_MAP[state.id];
    return aff === 'NL' || aff === 'Both' ? '#93c5fd' : '#cbd5e1';
  }

  const divs = STATE_DIVISION_MAP[state.id];
  if (!divs || divs.length === 0) return '#cbd5e1';
  return '#94a3b8';
}

const PinBadge: React.FC<{ isCorrect: boolean; isRevealed: boolean }> = ({ isCorrect, isRevealed }) => {
  if (isCorrect) {
    return (
      <g transform="translate(11, -11)">
        <circle r={7.5} fill="#10b981" stroke="#ffffff" strokeWidth={1.5} />
        <path
          d="M-3.5 0 L-1 2.5 L3.5 -2"
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
      <g transform="translate(11, -11)">
        <circle r={7.5} fill="#f59e0b" stroke="#ffffff" strokeWidth={1.5} />
        <text x="0" y="3" textAnchor="middle" fill="#ffffff" fontSize="9" fontWeight="bold">?</text>
      </g>
    );
  }
  return null;
};

const TargetBeacon: React.FC = () => (
  <circle
    r={22}
    fill="#f43f5e"
    fillOpacity={0.2}
    stroke="#f43f5e"
    strokeWidth={2.5}
  />
);

const TeamPin: React.FC<{
  team: MLBTeam;
  isSelected: boolean;
  isHovered: boolean;
  isCorrect: boolean;
  isRevealed: boolean;
  isTarget: boolean;
  feedback: { teamId: string; status: 'correct' | 'incorrect' | 'revealed' } | null;
  onSelect: (team: MLBTeam) => void;
  onHover: (team: MLBTeam | null) => void;
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
        r={17}
        fill="#ffffff"
        stroke={ringColor}
        strokeWidth={isSelected || isHovered || isCorrect || isTarget ? 3.5 : 2}
        className="filter drop-shadow-md"
      />
      <image
        href={team.logoUrl}
        x="-12"
        y="-12"
        width="24"
        height="24"
        preserveAspectRatio="xMidYMid meet"
        pointerEvents="none"
      />
      <PinBadge isCorrect={isCorrect} isRevealed={isRevealed} />
    </g>
  );
};

const TeamHoverTooltip: React.FC<{ team: MLBTeam }> = ({ team }) => (
  <div
    className="absolute z-30 pointer-events-none rounded-lg flex items-center gap-2"
    style={{
      left: `${(team.coordinates.x / 959) * 100}%`,
      top: `${(team.coordinates.y / 593) * 100}%`,
      transform: 'translate(-50%, -125%)',
      padding: '5px 8px',
      maxWidth: '200px',
      backgroundColor: '#0f172a',
      border: '1px solid #334155',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.4)',
    }}
  >
    <img
      src={team.logoUrl}
      alt=""
      style={{ width: '20px', height: '20px', objectFit: 'contain', flexShrink: 0 }}
    />
    <div className="min-w-0">
      <div style={{ fontSize: '11px', fontWeight: 700, color: '#ffffff', lineHeight: 1.2 }} className="truncate">
        {team.name}
      </div>
      <div style={{ fontSize: '9px', color: '#cbd5e1', lineHeight: 1.2 }} className="truncate">
        {team.ballpark}
      </div>
    </div>
  </div>
);

const HintedStateOverlay: React.FC<{ hintState: string | null }> = ({ hintState }) => {
  if (!hintState) return null;
  const state = US_STATES.find((s) => s.id === hintState);
  if (!state) return null;

  return (
    <path
      d={state.d}
      fill="#fde047"
      stroke="#e11d48"
      strokeWidth={2.5}
      pointerEvents="none"
    />
  );
};

export const USMap: React.FC<USMapProps> = ({
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
  const [hoveredTeam, setHoveredTeam] = useState<MLBTeam | null>(null);

  const effectiveFilter: FilterOption = isQuizMode ? 'All' : activeFilter;
  const effectiveSelectedTeam = isQuizMode ? null : selectedTeam;

  const isTeamFilteredOut = (team: MLBTeam): boolean => {
    if (isQuizMode) {
      if (hintDivision && team.division !== hintDivision) return true;
      return false;
    }
    if (hintDivision && team.division !== hintDivision) return true;
    if (activeFilter === 'All') return false;
    if (activeFilter === 'AL' || activeFilter === 'NL') return team.conference !== activeFilter;
    return team.division !== activeFilter;
  };

  const orderedTeams = useMemo(() => {
    if (!targetHighlightTeamId) return MLB_TEAMS;
    return [...MLB_TEAMS].sort((a, b) => {
      if (a.id === targetHighlightTeamId) return 1;
      if (b.id === targetHighlightTeamId) return -1;
      return 0;
    });
  }, [targetHighlightTeamId]);

  return (
    <div className="relative w-full aspect-[959/593] bg-sky-50/20 rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden p-2">
      <svg
        viewBox="0 0 959 593"
        className="w-full h-full select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="states">
          {US_STATES.map((state) => (
            <path
              key={state.id}
              d={state.d}
              fill={getStateFill(state, effectiveFilter, hintState, effectiveSelectedTeam)}
              stroke={getStateBorder(state, effectiveFilter, hintState)}
              strokeWidth="0.8"
              className="transition-colors duration-150"
            />
          ))}
        </g>

        <HintedStateOverlay hintState={hintState} />

        <g id="borders" pointerEvents="none">
          {BORDER_PATHS.map((b) => (
            <path key={b.id} d={b.d} fill="none" stroke="#94a3b8" strokeWidth="0.8" />
          ))}
          <path d={SEPARATOR_PATH} fill="none" stroke="#cbd5e1" strokeWidth="1.5" />
        </g>

        <g id="mlb-teams">
          {orderedTeams.map((team) => {
            if (!isQuizMode && isTeamFilteredOut(team)) return null;

            return (
              <TeamPin
                key={team.id}
                team={team}
                isSelected={selectedTeam?.id === team.id}
                isHovered={hoveredTeam?.id === team.id}
                isCorrect={Boolean(correctTeamIds?.has(team.id))}
                isRevealed={Boolean(revealedTeamIds?.has(team.id))}
                isTarget={targetHighlightTeamId === team.id}
                feedback={quizFeedback}
                onSelect={(t) => {
                  if (!disableMapSelection) onSelectTeam(t);
                }}
                onHover={(t) => {
                  if (!isQuizMode) setHoveredTeam(t);
                }}
              />
            );
          })}
        </g>
      </svg>

      {!isQuizMode && hoveredTeam && <TeamHoverTooltip team={hoveredTeam} />}
    </div>
  );
};
