import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { FilteredTeamsList } from './FilteredTeamsList';
import { PREMIER_LEAGUE_CLUBS } from '../data/premierLeagueTeamsData';

describe('FilteredTeamsList', () => {
  it('renders region header and all clubs in region with badges', () => {
    const londonClubs = PREMIER_LEAGUE_CLUBS.filter((c) => c.region === 'Greater London');
    const html = renderToString(
      <FilteredTeamsList
        filter="Greater London"
        teams={londonClubs}
        exploredTeams={new Set(['ARS'])}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('Greater London Clubs');
    expect(html).toContain('7 clubs');
    expect(html).toContain('Arsenal');
    expect(html).toContain('Chelsea');
    expect(html).toContain('Tottenham Hotspur');
    expect(html).toContain('Emirates Stadium');
    expect(html).toContain('Explored: 1/7');
  });

  it('renders all clubs in compact layout with scrollbar', () => {
    const html = renderToString(
      <FilteredTeamsList
        filter="All"
        teams={PREMIER_LEAGUE_CLUBS}
        exploredTeams={new Set()}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('All Premier League Clubs');
    expect(html).toContain('20 clubs');
    expect(html).toContain('custom-scrollbar');
    expect(html).toContain('Manchester City');
    expect(html).toContain('Liverpool');
  });
});
