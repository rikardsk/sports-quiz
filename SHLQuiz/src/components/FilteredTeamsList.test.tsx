import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { FilteredTeamsList } from './FilteredTeamsList';
import { SHL_CLUBS } from '../data/shlTeamsData';

describe('FilteredTeamsList', () => {
  it('renders Götaland division header and clubs with county badges', () => {
    const gotalandClubs = SHL_CLUBS.filter((t) => t.region === 'Götaland');
    const html = renderToString(
      <FilteredTeamsList
        filter="Götaland"
        teams={gotalandClubs}
        exploredTeams={new Set(['frolunda-hc'])}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('Götaland Clubs');
    expect(html).toContain('6 clubs');
    expect(html).toContain('Frölunda HC');
    expect(html).toContain('Malmö Redhawks');
    expect(html).toContain('Scandinavium');
  });

  it('renders Svealand clubs in compact layout with scrollbar', () => {
    const svealandClubs = SHL_CLUBS.filter((t) => t.region === 'Svealand');
    const html = renderToString(
      <FilteredTeamsList
        filter="Svealand"
        teams={svealandClubs}
        exploredTeams={new Set()}
        onSelectTeam={() => {}}
      />
    );
    expect(html).toContain('Svealand Clubs');
    expect(html).toContain('3 clubs');
    expect(html).toContain('custom-scrollbar');
    expect(html).toContain('Färjestad BK');
    expect(html).toContain('Leksands IF');
  });
});
