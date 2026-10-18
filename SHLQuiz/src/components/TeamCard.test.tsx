import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { TeamCard } from './TeamCard';
import { SHL_CLUBS } from '../data/shlTeamsData';

describe('TeamCard', () => {
  it('renders empty state when no club is selected', () => {
    const html = renderToString(
      <TeamCard team={null} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={false} />
    );
    expect(html).toContain('Select Any Club');
  });

  it('renders club name, arena, and trivia when club is selected', () => {
    const fhc = SHL_CLUBS.find((t) => t.id === 'frolunda-hc')!;
    const html = renderToString(
      <TeamCard team={fhc} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={true} />
    );
    expect(html).toContain('Frölunda HC');
    expect(html).toContain('Scandinavium');
    expect(html).toContain('Götaland Region');
    expect(html).toContain('5 SM-Guld');
  });

  it('renders close button when onClose handler is passed', () => {
    const fhc = SHL_CLUBS.find((t) => t.id === 'frolunda-hc')!;
    const html = renderToString(
      <TeamCard
        team={fhc}
        onNextTeam={() => {}}
        onPrevTeam={() => {}}
        isExplored={true}
        onClose={() => {}}
      />
    );
    expect(html).toContain('aria-label="Close Team Details"');
  });
});
