import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { RegionFilter } from './RegionFilter';
import { REGION_THEMES } from '../data/premierLeagueTeamsData';

describe('RegionFilter', () => {
  it('renders all region filter buttons with their colors', () => {
    const html = renderToString(
      <RegionFilter currentFilter="All" onSelectFilter={() => {}} />
    );

    expect(html).toContain('London');
    expect(html).toContain('North West');
    expect(html).toContain('West Midlands');
    expect(html).toContain('East Midlands');
    expect(html).toContain('South East');
    expect(html).toContain('South West');
    expect(html).toContain('North East');
    expect(html).toContain('East of England');

    const testedRegions = [
      'Greater London',
      'North West',
      'West Midlands',
      'East Midlands',
      'South East',
      'South West',
      'North East',
      'East of England',
    ];

    testedRegions.forEach((reg) => {
      const theme = REGION_THEMES[reg];
      expect(html).toContain(theme.bg);
      expect(html).toContain(theme.border);
    });
  });

  it('applies active border styling to the selected region button', () => {
    const html = renderToString(
      <RegionFilter currentFilter="North West" onSelectFilter={() => {}} />
    );

    expect(html).toContain('border-color:#0f172a');
    expect(html).toContain('box-shadow');
    expect(html).toContain('North West');
  });
});
