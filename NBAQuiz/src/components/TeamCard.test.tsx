import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { TeamCard } from './TeamCard';
import { NBA_TEAMS } from '../data/nbaTeamsData';

describe('TeamCard', () => {
  it('renders empty state when no team is selected', () => {
    const html = renderToString(
      <TeamCard team={null} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={false} />
    );
    expect(html).toContain('Select Any Team');
  });

  it('renders team name, arena, and trivia when team is selected', () => {
    const lakers = NBA_TEAMS.find((t) => t.id === 'LAL')!;
    const html = renderToString(
      <TeamCard team={lakers} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={true} />
    );
    expect(html).toContain('Los Angeles Lakers');
    expect(html).toContain('Crypto.com Arena');
    expect(html).toContain('Pacific');
    expect(html).toContain('17 Titles');
  });

  it('renders close button when onClose handler is passed', () => {
    const lakers = NBA_TEAMS.find((t) => t.id === 'LAL')!;
    const html = renderToString(
      <TeamCard
        team={lakers}
        onNextTeam={() => {}}
        onPrevTeam={() => {}}
        isExplored={true}
        onClose={() => {}}
      />
    );
    expect(html).toContain('aria-label="Close Team Details"');
  });

  it('renders official homepage link and website button', () => {
    const celtics = NBA_TEAMS.find((t) => t.id === 'BOS')!;
    const html = renderToString(
      <TeamCard team={celtics} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={false} />
    );
    expect(html).toContain('href="https://www.nba.com/celtics"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('Visit Official Website');
  });
});
