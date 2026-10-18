import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { DivisionFilter } from './DivisionFilter';
import { DIVISION_COLORS } from '../data/nflTeamsData';

describe('DivisionFilter', () => {
  it('renders all division filter buttons with their state colors', () => {
    const html = renderToString(
      <DivisionFilter currentFilter="All" onSelectFilter={() => {}} />
    );

    // Verify division colors are applied to button styles
    Object.values(DIVISION_COLORS).forEach((div) => {
      expect(html).toContain(div.bg);
      expect(html).toContain(div.border);
      expect(html).toContain(div.label);
    });

    // Check conference state colors
    expect(html).toContain('#fee2e2');
    expect(html).toContain('#dbeafe');
  });

  it('applies active border styling to the selected division button', () => {
    const html = renderToString(
      <DivisionFilter currentFilter="AFC West" onSelectFilter={() => {}} />
    );

    expect(html).toContain('border-color:#0f172a');
    expect(html).toContain('box-shadow');
    expect(html).toContain('AFC West');
  });
});
