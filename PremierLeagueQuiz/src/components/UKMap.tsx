import React, { useState } from 'react';
import {
  UK_REGIONS,
  UKRegion,
  BACKGROUND_LANDMASSES,
  SHETLAND_INSET
} from '../data/ukMapData';
import { PremierLeagueClub, PREMIER_LEAGUE_CLUBS, REGION_THEMES } from '../data/premierLeagueTeamsData';
import { ZoomIn, ZoomOut, Check, HelpCircle } from 'lucide-react';

export interface UKMapProps {
  selectedTeam?: PremierLeagueClub | null;
  selectedClub?: PremierLeagueClub | null;
  onSelectTeam?: (club: PremierLeagueClub) => void;
  onSelectClub?: (club: PremierLeagueClub) => void;
  activeFilter?: string;
  activeRegion?: string;
  exploredTeams?: Set<string>;
  isQuizMode?: boolean;
  targetHighlightTeamId?: string | null;
  targetHighlightClubId?: string | null;
  disableMapSelection?: boolean;
  quizFeedback?: { teamId?: string; clubId?: string; status: 'correct' | 'incorrect' | 'revealed' } | null;
  hintRegion?: string | null;
  hintState?: string | null;
  correctTeamIds?: Set<string>;
  revealedTeamIds?: Set<string>;
  correctClubIds?: Set<string>;
  revealedClubIds?: Set<string>;
}

function getMarkerRingColor(
  club: PremierLeagueClub,
  feedback: { teamId?: string; clubId?: string; status: 'correct' | 'incorrect' | 'revealed' } | null,
  isCorrect: boolean,
  isRevealed: boolean,
  isSelected: boolean,
  isTarget: boolean
): string {
  const matchId = feedback?.teamId || feedback?.clubId;
  if (matchId === club.id) {
    if (feedback?.status === 'correct') return '#10b981';
    if (feedback?.status === 'revealed') return '#f59e0b';
    return '#ef4444';
  }
  if (isCorrect) return '#10b981';
  if (isRevealed) return '#f59e0b';
  if (isTarget || isSelected) return '#7c3aed';
  return club.primaryColor || '#94a3b8';
}

function getRegionFill(region: UKRegion, activeFilter?: string, hintRegion?: string | null): string {
  if (hintRegion && (region.name === hintRegion || region.id === hintRegion)) {
    return '#fef08a'; // bright yellow highlight
  }
  if (activeFilter && activeFilter !== 'All' && region.name === activeFilter) {
    const theme = REGION_THEMES[region.name];
    return theme ? theme.bg : '#ede9fe';
  }
  if (region.area !== 'England') return '#f1f5f9';
  return region.color || '#f8fafc';
}

const LONDON_VIEWBOX = '502 674 48 40';

export const UKMap: React.FC<UKMapProps> = ({
  selectedTeam,
  selectedClub,
  onSelectTeam,
  onSelectClub,
  activeFilter = 'All',
  activeRegion,
  exploredTeams = new Set(),
  isQuizMode = false,
  targetHighlightTeamId = null,
  targetHighlightClubId = null,
  disableMapSelection = false,
  quizFeedback = null,
  hintRegion = null,
  hintState = null,
  correctTeamIds,
  revealedTeamIds,
  correctClubIds,
  revealedClubIds,
}) => {
  const currentSelected = selectedTeam !== undefined ? selectedTeam : (selectedClub || null);
  const handleSelect = onSelectTeam || onSelectClub || (() => {});
  const effectiveFilter = activeRegion !== undefined ? activeRegion : activeFilter;
  const effectiveTarget = targetHighlightTeamId || targetHighlightClubId;
  const effectiveCorrect = correctTeamIds || correctClubIds || new Set<string>();
  const effectiveRevealed = revealedTeamIds || revealedClubIds || new Set<string>();
  const [hoveredClub, setHoveredClub] = useState<PremierLeagueClub | null>(null);
  const [isLondonFocus, setIsLondonFocus] = useState<boolean>(false);

  const effectiveHint = hintRegion || hintState;
  const viewBox = isLondonFocus ? LONDON_VIEWBOX : '0 0 720 900';

  const visibleClubs = PREMIER_LEAGUE_CLUBS.filter((c) => {
    if (isQuizMode) return true;
    if (effectiveFilter === 'All') return true;
    return c.region === effectiveFilter;
  });

  return (
    <div className="relative w-full aspect-[720/900] bg-slate-50 border border-slate-200 rounded-2xl shadow-sm overflow-hidden p-2 select-none">
      {/* Zoom / London Focus Button */}
      <button
        onClick={() => setIsLondonFocus((prev) => !prev)}
        className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-white text-slate-700 hover:text-purple-700 hover:bg-slate-50 border border-slate-300 shadow-sm transition-all duration-200 cursor-pointer"
        title="Toggle zoom on London clubs"
      >
        {isLondonFocus ? <ZoomOut size={14} /> : <ZoomIn size={14} />}
        <span>{isLondonFocus ? 'View Whole UK' : 'Focus London (7 Clubs)'}</span>
      </button>

      <svg viewBox={viewBox} className="w-full h-full transition-all duration-500 ease-out">
        {/* Background Landmasses (Republic of Ireland, Isle of Man) */}
        <g id="uk-background-landmasses" className="pointer-events-none">
          {BACKGROUND_LANDMASSES.map((b) => (
            <path
              key={b.id}
              d={b.d}
              fill="#f1f5f9"
              stroke="#cbd5e1"
              strokeWidth={isLondonFocus ? '0.08' : '1'}
              strokeDasharray={b.id === 'IE' ? '3 3' : undefined}
              className="transition-colors duration-200"
            />
          ))}
        </g>

        {/* Shetland Inset Frame */}
        {!isLondonFocus && (
          <g id="shetland-inset" className="pointer-events-none">
            <path
              d={SHETLAND_INSET.box}
              fill="#f8fafc"
              stroke="#cbd5e1"
              strokeWidth="1"
              strokeDasharray="3 3"
              opacity={0.8}
            />
            <text
              x={SHETLAND_INSET.labelCoord.x}
              y={SHETLAND_INSET.labelCoord.y}
              textAnchor="middle"
              fontSize="9"
              fill="#94a3b8"
              fontWeight="600"
              fontFamily="sans-serif"
            >
              Shetland Is.
            </text>
          </g>
        )}

        {/* UK Regions */}
        <g id="uk-regions">
          {UK_REGIONS.map((region) => (
            <path
              key={region.id}
              d={region.d}
              fill={getRegionFill(region, effectiveFilter, effectiveHint)}
              stroke="#cbd5e1"
              strokeWidth={isLondonFocus ? '0.08' : '1.2'}
              strokeLinejoin="round"
              className="transition-colors duration-200 cursor-default pointer-events-none"
            />
          ))}
        </g>

        {/* London Focus Region & River Labels */}
        {isLondonFocus && (
          <g id="london-focus-labels" className="pointer-events-none select-none">
            {/* North: East of England */}
            <text
              x="524"
              y="677.5"
              textAnchor="middle"
              fontSize="1.3"
              fontWeight="700"
              fill="#9a3412"
              opacity={0.65}
            >
              East of England (Home Counties)
            </text>

            {/* Central: Greater London */}
            <text
              x="543"
              y="691"
              textAnchor="middle"
              fontSize="1.5"
              fontWeight="800"
              fill="#9d174d"
              opacity={0.7}
            >
              Greater London
            </text>

            {/* River Thames Water Ribbon Label */}
            <text
              x="533"
              y="697.5"
              textAnchor="middle"
              fontSize="1.05"
              fontWeight="700"
              fontStyle="italic"
              fill="#0369a1"
              opacity={0.7}
            >
              River Thames ~
            </text>

            {/* South: South East */}
            <text
              x="526"
              y="712.5"
              textAnchor="middle"
              fontSize="1.3"
              fontWeight="700"
              fill="#3730a3"
              opacity={0.65}
            >
              South East (Surrey & Kent)
            </text>
          </g>
        )}

        {/* Subtle Region Name Labels */}
        {!isLondonFocus && (
          <g id="uk-region-labels" className="pointer-events-none select-none">
            {UK_REGIONS.map((region) => {
              if (region.id === 'LDN') return null;
              return (
                <text
                  key={`label-${region.id}`}
                  x={region.labelCoord.x}
                  y={region.labelCoord.y}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="#64748b"
                  opacity={0.65}
                  className="transition-opacity duration-200"
                >
                  {region.name}
                </text>
              );
            })}
          </g>
        )}

        {/* Club Markers */}
        <g id="pl-clubs">
          {visibleClubs.map((club) => {
            const isSelected = currentSelected?.id === club.id;
            const isHovered = hoveredClub?.id === club.id;
            const isTarget = effectiveTarget === club.id;
            const isCorrect = effectiveCorrect.has(club.id);
            const isRevealed = effectiveRevealed.has(club.id);
            const isExplored = exploredTeams.has(club.id);

            const ringColor = getMarkerRingColor(club, quizFeedback, isCorrect, isRevealed, isSelected, isTarget);
            const baseScale = isLondonFocus ? 0.09 : 1;
            const scale = isLondonFocus
              ? (isSelected ? 1.4 * baseScale : baseScale)
              : (isHovered || isSelected || isTarget ? 1.25 : 1) * baseScale;
            const coords = club.coordinates;

            const strokeW = isLondonFocus
              ? (isSelected ? 0.8 : isHovered || isTarget ? 0.4 : 0.2)
              : (isSelected ? 4 : isHovered || isTarget ? 3.5 : 2);

            return (
              <g
                key={club.id}
                transform={`translate(${coords.x}, ${coords.y}) scale(${scale})`}
                className={`cursor-pointer transition-transform duration-200 ${
                  disableMapSelection ? 'pointer-events-none' : ''
                }`}
                onClick={() => !disableMapSelection && handleSelect(club)}
                onMouseEnter={() => setHoveredClub(club)}
                onMouseLeave={() => setHoveredClub(null)}
              >

                {/* Target highlight ring in quiz mode */}
                {isTarget && !isSelected && (
                  <circle
                    r={22}
                    fill="none"
                    stroke={ringColor}
                    strokeWidth={isLondonFocus ? 1.5 : 2}
                    strokeDasharray={isLondonFocus ? '2 1' : '4 2'}
                    opacity={0.8}
                  />
                )}

                {/* White Marker Base */}
                <circle
                  r={15}
                  fill="#ffffff"
                  stroke={isSelected ? '#7c3aed' : ringColor}
                  strokeWidth={strokeW}
                  className="filter drop-shadow-md"
                />

                {/* Team Crest Logo */}
                <image
                  href={club.logoUrl}
                  x="-11"
                  y="-11"
                  width="22"
                  height="22"
                  preserveAspectRatio="xMidYMid meet"
                  pointerEvents="none"
                />

                {/* Status Badges */}
                {isCorrect && (
                  <g transform="translate(9, -9)">
                    <circle r={5.5} fill="#10b981" stroke="#ffffff" strokeWidth={isLondonFocus ? 0.2 : 1.5} />
                    <Check size={7} color="#ffffff" strokeWidth={3} x={-3.5} y={-3.5} />
                  </g>
                )}
                {isRevealed && !isCorrect && (
                  <g transform="translate(9, -9)">
                    <circle r={5.5} fill="#f59e0b" stroke="#ffffff" strokeWidth={isLondonFocus ? 0.2 : 1.5} />
                    <HelpCircle size={7} color="#ffffff" strokeWidth={3} x={-3.5} y={-3.5} />
                  </g>
                )}
                {!isQuizMode && isExplored && !isSelected && (
                  <g transform="translate(9, -9)">
                    <circle r={4.5} fill="#10b981" stroke="#ffffff" strokeWidth={isLondonFocus ? 0.15 : 1} />
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>

      {/* Floating Hover Tooltip (shown on main map) */}
      {!isLondonFocus && hoveredClub && (
        <div
          className="absolute z-30 pointer-events-none rounded-xl flex items-center gap-2.5 px-3 py-2 bg-slate-900/95 backdrop-blur-sm text-white shadow-xl border border-slate-700/80 transition-all duration-150"
          style={{
            left: `${(hoveredClub.coordinates.x / 720) * 100}%`,
            top: `${(hoveredClub.coordinates.y / 900) * 100}%`,
            transform: 'translate(-50%, -125%)',
          }}
        >
          <img
            src={hoveredClub.logoUrl}
            alt=""
            className="w-6 h-6 object-contain flex-shrink-0"
            style={{ width: '24px', height: '24px', objectFit: 'contain' }}
          />
          <div className="flex flex-col leading-tight">
            <span className="font-bold text-xs">{hoveredClub.name}</span>
            <span className="text-[10px] text-slate-300">
              {hoveredClub.stadium} • {hoveredClub.city}
            </span>
          </div>
        </div>
      )}

      {/* Docked pill in London focus mode to avoid obscuring the zoomed map */}
      {isLondonFocus && hoveredClub && (
        <div className="absolute bottom-3 left-3 z-30 pointer-events-none rounded-xl flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-sm text-white shadow-md border border-slate-700/80 transition-all duration-150">
          <img
            src={hoveredClub.logoUrl}
            alt=""
            className="w-5 h-5 object-contain flex-shrink-0"
            style={{ width: '20px', height: '20px', objectFit: 'contain' }}
          />
          <span className="font-bold text-xs">{hoveredClub.name}</span>
          <span className="text-[10px] text-slate-300">({hoveredClub.stadium})</span>
        </div>
      )}
    </div>
  );
};
