import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { FilteredTeamsList } from './FilteredTeamsList';
import { MLB_TEAMS } from '../data/mlbTeamsData';

describe('FilteredTeamsList', () => {
  it('renders division header and all teams in division with state badges without abbreviations or chevron', () => {
    const nlWestTeams = MLB_TEAMS.filter((t) => t.division === 'NL West');
    const html = renderToString(
      <FilteredTeamsList
        filter="NL West"
        teams={nlWestTeams}
        exploredTeams={new Set(['LAD'])}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('NL West Teams');
    expect(html).toContain('5 teams');
    expect(html).toContain('Los Angeles Dodgers');
    expect(html).toContain('San Francisco Giants');
    expect(html).toContain('San Diego Padres');
    expect(html).toContain('Arizona Diamondbacks');
    expect(html).toContain('Colorado Rockies');
    expect(html).toContain('Dodger Stadium');
    expect(html).toContain('CA');
    expect(html).toContain('AZ');
    expect(html).toContain('CO');
    expect(html).toContain('Explored: 1/5');

    // Confirm team abbreviations and chevron bracket were removed from team buttons
    expect(html).not.toContain('font-mono font-bold text-slate-500');
    expect(html).not.toContain('lucide-chevron-right');
  });

  it('renders league teams in compact layout with scrollbar', () => {
    const alTeams = MLB_TEAMS.filter((t) => t.conference === 'AL');
    const html = renderToString(
      <FilteredTeamsList
        filter="AL"
        teams={alTeams}
        exploredTeams={new Set()}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('AL Teams');
    expect(html).toContain('15 teams');
    expect(html).toContain('custom-scrollbar');
    expect(html).toContain('New York Yankees');
    expect(html).toContain('Boston Red Sox');

    // Confirm team abbreviations and chevron bracket were removed from compact items
    expect(html).not.toContain('font-mono font-bold text-slate-400');
    expect(html).not.toContain('lucide-chevron-right');
  });
});
