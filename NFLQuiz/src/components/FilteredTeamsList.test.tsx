import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { FilteredTeamsList } from './FilteredTeamsList';
import { NFL_TEAMS } from '../data/nflTeamsData';

describe('FilteredTeamsList', () => {
  it('renders division header and all teams in division with state badges without abbreviations or chevron', () => {
    const afcWestTeams = NFL_TEAMS.filter((t) => t.division === 'AFC West');
    const html = renderToString(
      <FilteredTeamsList
        filter="AFC West"
        teams={afcWestTeams}
        exploredTeams={new Set(['KC'])}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('AFC West Teams');
    expect(html).toContain('4 teams');
    expect(html).toContain('Kansas City Chiefs');
    expect(html).toContain('Denver Broncos');
    expect(html).toContain('Las Vegas Raiders');
    expect(html).toContain('Los Angeles Chargers');
    expect(html).toContain('GEHA Field at Arrowhead Stadium');
    expect(html).toContain('MO');
    expect(html).toContain('CO');
    expect(html).toContain('NV');
    expect(html).toContain('CA');
    expect(html).toContain('Explored: 1/4');

    // Confirm team abbreviations and chevron bracket were removed from team buttons
    expect(html).not.toContain('font-mono font-bold text-slate-500');
    expect(html).not.toContain('lucide-chevron-right');
  });

  it('renders conference teams in compact layout with scrollbar', () => {
    const afcTeams = NFL_TEAMS.filter((t) => t.conference === 'AFC');
    const html = renderToString(
      <FilteredTeamsList
        filter="AFC"
        teams={afcTeams}
        exploredTeams={new Set()}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('AFC Teams');
    expect(html).toContain('16 teams');
    expect(html).toContain('custom-scrollbar');
    expect(html).toContain('Buffalo Bills');
    expect(html).toContain('Miami Dolphins');

    // Confirm team abbreviations and chevron bracket were removed from compact items
    expect(html).not.toContain('font-mono font-bold text-slate-400');
    expect(html).not.toContain('lucide-chevron-right');
  });
});
