import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { TeamsModal } from './TeamsModal';

describe('TeamsModal', () => {
  it('renders search bar with search-icon and search-input classes', () => {
    const html = renderToString(
      <TeamsModal
        isOpen={true}
        onClose={() => {}}
        onSelectTeam={() => {}}
        exploredTeams={new Set()}
      />
    );

    expect(html).toContain('search-bar-wrapper');
    expect(html).toContain('search-icon');
    expect(html).toContain('search-input');
    expect(html).toContain('grid-auto-rows:74px');
    expect(html).toContain('height:74px');
  });

  it('does not render when isOpen is false', () => {
    const html = renderToString(
      <TeamsModal
        isOpen={false}
        onClose={() => {}}
        onSelectTeam={() => {}}
        exploredTeams={new Set()}
      />
    );

    expect(html).toBe('');
  });

  it('renders teams sorted alphabetically by name', () => {
    const html = renderToString(
      <TeamsModal
        isOpen={true}
        onClose={() => {}}
        onSelectTeam={() => {}}
        exploredTeams={new Set()}
      />
    );

    const anaheimIndex = html.indexOf('Anaheim Ducks');
    const bostonIndex = html.indexOf('Boston Bruins');
    const buffaloIndex = html.indexOf('Buffalo Sabres');
    const washingtonIndex = html.indexOf('Washington Capitals');

    expect(anaheimIndex).toBeGreaterThan(-1);
    expect(bostonIndex).toBeGreaterThan(anaheimIndex);
    expect(buffaloIndex).toBeGreaterThan(bostonIndex);
    expect(washingtonIndex).toBeGreaterThan(buffaloIndex);
  });

  it('renders link button to current league standings in header', () => {
    const html = renderToString(
      <TeamsModal
        isOpen={true}
        onClose={() => {}}
        onSelectTeam={() => {}}
        exploredTeams={new Set()}
      />
    );

    expect(html).toContain('href="https://www.nhl.com/standings"');
    expect(html).toContain('Standings');
  });
});
