import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { FilteredTeamsList } from './FilteredTeamsList';
import { NHL_TEAMS } from '../data/nhlTeamsData';

describe('FilteredTeamsList', () => {
  it('renders division header and all teams in division with state/province badges without abbreviations or chevron', () => {
    const pacificTeams = NHL_TEAMS.filter((t) => t.division === 'Pacific');
    const html = renderToString(
      <FilteredTeamsList
        filter="Pacific"
        teams={pacificTeams}
        exploredTeams={new Set(['LAK'])}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('Pacific Teams');
    expect(html).toContain('8 teams');
    expect(html).toContain('Anaheim Ducks');
    expect(html).toContain('Los Angeles Kings');
    expect(html).toContain('San Jose Sharks');
    expect(html).toContain('Seattle Kraken');
    expect(html).toContain('Vancouver Canucks');
    expect(html).toContain('Vegas Golden Knights');
    expect(html).toContain('Calgary Flames');
    expect(html).toContain('Edmonton Oilers');
    expect(html).toContain('Crypto.com Arena');
    expect(html).toContain('CA');
    expect(html).toContain('BC');
    expect(html).toContain('AB');
    expect(html).toContain('Explored: 1/8');

    expect(html).not.toContain('lucide-chevron-right');
  });

  it('renders conference teams in compact layout with scrollbar', () => {
    const westTeams = NHL_TEAMS.filter((t) => t.conference === 'Western');
    const html = renderToString(
      <FilteredTeamsList
        filter="Western"
        teams={westTeams}
        exploredTeams={new Set()}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('Western Teams');
    expect(html).toContain('16 teams');
    expect(html).toContain('custom-scrollbar');
    expect(html).toContain('Edmonton Oilers');
    expect(html).toContain('Colorado Avalanche');

    expect(html).not.toContain('lucide-chevron-right');
  });
});
