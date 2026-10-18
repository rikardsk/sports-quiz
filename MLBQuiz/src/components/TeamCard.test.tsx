import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { TeamCard } from './TeamCard';
import { MLB_TEAMS } from '../data/mlbTeamsData';

describe('TeamCard', () => {
  it('renders empty state when no team is selected', () => {
    const html = renderToString(
      <TeamCard team={null} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={false} />
    );
    expect(html).toContain('Select Any Team');
  });

  it('renders team name, ballpark, and trivia when team is selected', () => {
    const dodgers = MLB_TEAMS.find((t) => t.id === 'LAD')!;
    const html = renderToString(
      <TeamCard team={dodgers} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={true} />
    );
    expect(html).toContain('Los Angeles Dodgers');
    expect(html).toContain('Dodger Stadium');
    expect(html).toContain('NL West');
    expect(html).toContain('8 Titles');
  });

  it('renders close button when onClose handler is passed', () => {
    const dodgers = MLB_TEAMS.find((t) => t.id === 'LAD')!;
    const html = renderToString(
      <TeamCard
        team={dodgers}
        onNextTeam={() => {}}
        onPrevTeam={() => {}}
        isExplored={true}
        onClose={() => {}}
      />
    );
    expect(html).toContain('aria-label="Close Team Details"');
  });

  it('renders official homepage link and website button', () => {
    const redsox = MLB_TEAMS.find((t) => t.id === 'BOS')!;
    const html = renderToString(
      <TeamCard team={redsox} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={false} />
    );
    expect(html).toContain('href="https://www.mlb.com/redsox"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('Visit Official Website');
  });
});
