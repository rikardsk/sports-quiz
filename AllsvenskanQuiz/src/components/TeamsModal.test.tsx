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
    expect(html).toContain('Alla 16 Allsvenskan-klubbar');
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

  it('renders Allsvenskan clubs in modal list', () => {
    const html = renderToString(
      <TeamsModal
        isOpen={true}
        onClose={() => {}}
        onSelectTeam={() => {}}
        exploredTeams={new Set()}
      />
    );

    expect(html).toContain('Malmö FF');
    expect(html).toContain('AIK');
    expect(html).toContain('Djurgårdens IF');
    expect(html).toContain('IFK Göteborg');
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

    expect(html).toContain('href="https://allsvenskan.se/tabell"');
    expect(html).toContain('Tabell');
  });
});
