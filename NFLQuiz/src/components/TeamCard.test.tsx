import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { TeamCard } from './TeamCard';
import { NFL_TEAMS } from '../data/nflTeamsData';

describe('TeamCard', () => {
  it('renders empty state when no team is selected', () => {
    const html = renderToString(
      <TeamCard team={null} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={false} />
    );
    expect(html).toContain('Select Any Team');
  });

  it('renders team name, stadium, and trivia when team is selected', () => {
    const chiefs = NFL_TEAMS.find((t) => t.id === 'KC')!;
    const html = renderToString(
      <TeamCard team={chiefs} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={true} />
    );
    expect(html).toContain('Kansas City Chiefs');
    expect(html).toContain('GEHA Field at Arrowhead Stadium');
    expect(html).toContain('AFC West');
    expect(html).toContain('4 Titles');
  });

  it('renders close button when onClose handler is passed', () => {
    const chiefs = NFL_TEAMS.find((t) => t.id === 'KC')!;
    const html = renderToString(
      <TeamCard
        team={chiefs}
        onNextTeam={() => {}}
        onPrevTeam={() => {}}
        isExplored={true}
        onClose={() => {}}
      />
    );
    expect(html).toContain('aria-label="Close Team Details"');
  });

  it('renders official homepage link and website button', () => {
    const bills = NFL_TEAMS.find((t) => t.id === 'BUF')!;
    const html = renderToString(
      <TeamCard team={bills} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={false} />
    );
    expect(html).toContain('href="https://www.buffalobills.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('Visit Official Website');
  });
});
