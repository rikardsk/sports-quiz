import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { UKMap } from './UKMap';

describe('UKMap', () => {
  it('renders UK map SVG with regions and club markers', () => {
    const html = renderToString(
      <UKMap
        selectedClub={null}
        onSelectClub={() => {}}
        activeRegion="All"
      />
    );

    expect(html).toContain('viewBox="0 0 720 900"');
    expect(html).toContain('id="uk-regions"');
    expect(html).toContain('id="pl-clubs"');
  });

  it('renders all 20 Premier League club markers', () => {
    const html = renderToString(
      <UKMap
        selectedClub={null}
        onSelectClub={() => {}}
        activeRegion="All"
      />
    );

    // Checks for official ESPN crests embedded as images
    expect(html).toContain('https://a.espncdn.com/i/teamlogos/soccer/500/359.png'); // Arsenal
    expect(html).toContain('https://a.espncdn.com/i/teamlogos/soccer/500/364.png'); // Liverpool
    expect(html).toContain('https://a.espncdn.com/i/teamlogos/soccer/500/360.png'); // Man United
  });

  it('renders London focus button', () => {
    const html = renderToString(
      <UKMap
        selectedClub={null}
        onSelectClub={() => {}}
        activeRegion="All"
      />
    );

    expect(html).toContain('Focus London (7 Clubs)');
  });
});
