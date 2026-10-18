import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { FilteredTeamsList } from './FilteredTeamsList';
import { MLS_TEAMS } from '../data/mlsTeamsData';

describe('FilteredTeamsList', () => {
  it('renders Canada division header and Canadian clubs with state badges', () => {
    const canadaTeams = MLS_TEAMS.filter((t) => t.state === 'ON' || t.state === 'QC' || t.state === 'BC');
    const html = renderToString(
      <FilteredTeamsList
        filter="Canada"
        teams={canadaTeams}
        exploredTeams={new Set(['TOR'])}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('Canada Teams');
    expect(html).toContain('3 teams');
    expect(html).toContain('Toronto FC');
    expect(html).toContain('CF Montréal');
    expect(html).toContain('Vancouver Whitecaps FC');
    expect(html).toContain('BMO Field');
    expect(html).toContain('ON');
    expect(html).toContain('QC');
    expect(html).toContain('BC');
    expect(html).toContain('Explored: 1/3');
  });

  it('renders conference teams in compact layout with scrollbar', () => {
    const westTeams = MLS_TEAMS.filter((t) => t.conference === 'Western');
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
    expect(html).toContain('LA Galaxy');
    expect(html).toContain('Seattle Sounders FC');
  });
});
