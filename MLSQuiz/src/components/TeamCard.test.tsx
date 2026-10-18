import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { TeamCard } from './TeamCard';
import { MLS_TEAMS } from '../data/mlsTeamsData';

describe('TeamCard', () => {
  it('renders empty state when no team is selected', () => {
    const html = renderToString(
      <TeamCard team={null} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={false} />
    );
    expect(html).toContain('Select Any Team');
  });

  it('renders team name, stadium, and trivia when team is selected', () => {
    const galaxy = MLS_TEAMS.find((t) => t.id === 'LA')!;
    const html = renderToString(
      <TeamCard team={galaxy} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={true} />
    );
    expect(html).toContain('LA Galaxy');
    expect(html).toContain('Dignity Health Sports Park');
    expect(html).toContain('Western Conference');
    expect(html).toContain('5 Titles');
  });

  it('renders close button when onClose handler is passed', () => {
    const galaxy = MLS_TEAMS.find((t) => t.id === 'LA')!;
    const html = renderToString(
      <TeamCard
        team={galaxy}
        onNextTeam={() => {}}
        onPrevTeam={() => {}}
        isExplored={true}
        onClose={() => {}}
      />
    );
    expect(html).toContain('aria-label="Close Team Details"');
  });

  it('renders official homepage link and website button', () => {
    const atl = MLS_TEAMS.find((t) => t.id === 'ATL')!;
    const html = renderToString(
      <TeamCard team={atl} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={false} />
    );
    expect(html).toContain('href="https://www.atlutd.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('Visit Official Website');
  });
});
