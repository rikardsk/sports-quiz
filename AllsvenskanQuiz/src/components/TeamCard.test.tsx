import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { TeamCard } from './TeamCard';
import { ALLSVENSKAN_CLUBS } from '../data/allsvenskanTeamsData';

describe('TeamCard', () => {
  it('renders empty state when no club is selected', () => {
    const html = renderToString(
      <TeamCard team={null} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={false} />
    );
    expect(html).toContain('Select Any Club');
  });

  it('renders club name, stadium, and trivia when club is selected', () => {
    const mff = ALLSVENSKAN_CLUBS.find((t) => t.id === 'malmo-ff')!;
    const html = renderToString(
      <TeamCard team={mff} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={true} />
    );
    expect(html).toContain('Malmö FF');
    expect(html).toContain('Eleda Stadion');
    expect(html).toContain('Götaland Region');
    expect(html).toContain('24 SM-Guld');
  });

  it('renders close button when onClose handler is passed', () => {
    const mff = ALLSVENSKAN_CLUBS.find((t) => t.id === 'malmo-ff')!;
    const html = renderToString(
      <TeamCard
        team={mff}
        onNextTeam={() => {}}
        onPrevTeam={() => {}}
        isExplored={true}
        onClose={() => {}}
      />
    );
    expect(html).toContain('aria-label="Close Team Details"');
  });
});
