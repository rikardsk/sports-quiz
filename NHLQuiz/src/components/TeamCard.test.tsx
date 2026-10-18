import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { TeamCard } from './TeamCard';
import { NHL_TEAMS } from '../data/nhlTeamsData';

describe('TeamCard', () => {
  it('renders empty state when no team is selected', () => {
    const html = renderToString(
      <TeamCard team={null} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={false} />
    );
    expect(html).toContain('Select Any Team');
  });

  it('renders team name, arena, and trivia when team is selected', () => {
    const canadiens = NHL_TEAMS.find((t) => t.id === 'MTL')!;
    const html = renderToString(
      <TeamCard team={canadiens} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={true} />
    );
    expect(html).toContain('Montreal Canadiens');
    expect(html).toContain('Bell Centre');
    expect(html).toContain('Atlantic');
    expect(html).toContain('24 Cups');
  });

  it('renders close button when onClose handler is passed', () => {
    const canadiens = NHL_TEAMS.find((t) => t.id === 'MTL')!;
    const html = renderToString(
      <TeamCard
        team={canadiens}
        onNextTeam={() => {}}
        onPrevTeam={() => {}}
        isExplored={true}
        onClose={() => {}}
      />
    );
    expect(html).toContain('aria-label="Close Team Details"');
  });

  it('renders official homepage link and website button', () => {
    const bruins = NHL_TEAMS.find((t) => t.id === 'BOS')!;
    const html = renderToString(
      <TeamCard team={bruins} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={false} />
    );
    expect(html).toContain('href="https://www.nhl.com/bruins"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('Visit Official Website');
  });
});
