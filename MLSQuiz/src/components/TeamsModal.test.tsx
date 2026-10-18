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

    const atlantaIndex = html.indexOf('Atlanta United FC');
    const austinIndex = html.indexOf('Austin FC');
    const charlotteIndex = html.indexOf('Charlotte FC');
    const vancouverIndex = html.indexOf('Vancouver Whitecaps FC');

    expect(atlantaIndex).toBeGreaterThan(-1);
    expect(austinIndex).toBeGreaterThan(atlantaIndex);
    expect(charlotteIndex).toBeGreaterThan(austinIndex);
    expect(vancouverIndex).toBeGreaterThan(charlotteIndex);
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

    expect(html).toContain('href="https://www.mlssoccer.com/standings/"');
    expect(html).toContain('Standings');
  });
});
