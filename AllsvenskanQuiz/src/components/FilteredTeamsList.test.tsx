import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { FilteredTeamsList } from './FilteredTeamsList';
import { ALLSVENSKAN_CLUBS } from '../data/allsvenskanTeamsData';

describe('FilteredTeamsList', () => {
  it('renders Götaland division header and clubs with county badges', () => {
    const gotalandClubs = ALLSVENSKAN_CLUBS.filter((t) => t.region === 'Götaland');
    const html = renderToString(
      <FilteredTeamsList
        filter="Götaland"
        teams={gotalandClubs}
        exploredTeams={new Set(['malmo-ff'])}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('Götaland Clubs');
    expect(html).toContain('10 clubs');
    expect(html).toContain('Malmö FF');
    expect(html).toContain('IFK Göteborg');
    expect(html).toContain('Eleda Stadion');
    expect(html).toContain('Skåne');
  });

  it('renders Svealand clubs in compact layout with scrollbar', () => {
    const svealandClubs = ALLSVENSKAN_CLUBS.filter((t) => t.region === 'Svealand');
    const html = renderToString(
      <FilteredTeamsList
        filter="Svealand"
        teams={svealandClubs}
        exploredTeams={new Set()}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('Svealand Clubs');
    expect(html).toContain('6 clubs');
    expect(html).toContain('custom-scrollbar');
    expect(html).toContain('AIK');
    expect(html).toContain('Hammarby IF');
  });
});
