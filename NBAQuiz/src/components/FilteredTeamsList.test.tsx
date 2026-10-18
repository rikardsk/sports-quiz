import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { FilteredTeamsList } from './FilteredTeamsList';
import { NBA_TEAMS } from '../data/nbaTeamsData';

describe('FilteredTeamsList', () => {
  it('renders division header and all teams in division with state badges without abbreviations or chevron', () => {
    const pacificTeams = NBA_TEAMS.filter((t) => t.division === 'Pacific');
    const html = renderToString(
      <FilteredTeamsList
        filter="Pacific"
        teams={pacificTeams}
        exploredTeams={new Set(['LAL'])}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('Pacific Teams');
    expect(html).toContain('5 teams');
    expect(html).toContain('Golden State Warriors');
    expect(html).toContain('Los Angeles Lakers');
    expect(html).toContain('LA Clippers');
    expect(html).toContain('Phoenix Suns');
    expect(html).toContain('Sacramento Kings');
    expect(html).toContain('Crypto.com Arena');
    expect(html).toContain('CA');
    expect(html).toContain('AZ');
    expect(html).toContain('Explored: 1/5');

    // Confirm team abbreviations and chevron bracket were removed from team buttons
    expect(html).not.toContain('font-mono font-bold text-slate-500');
    expect(html).not.toContain('lucide-chevron-right');
  });

  it('renders conference teams in compact layout with scrollbar', () => {
    const westTeams = NBA_TEAMS.filter((t) => t.conference === 'Western');
    const html = renderToString(
      <FilteredTeamsList
        filter="Western"
        teams={westTeams}
        exploredTeams={new Set()}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('Western Teams');
    expect(html).toContain('15 teams');
    expect(html).toContain('custom-scrollbar');
    expect(html).toContain('Golden State Warriors');
    expect(html).toContain('Denver Nuggets');

    // Confirm team abbreviations and chevron bracket were removed from compact items
    expect(html).not.toContain('font-mono font-bold text-slate-400');
    expect(html).not.toContain('lucide-chevron-right');
  });
});
