import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { TeamCard } from './TeamCard';
import { PREMIER_LEAGUE_CLUBS } from '../data/premierLeagueTeamsData';

describe('TeamCard', () => {
  it('renders empty state when no club is selected', () => {
    const html = renderToString(
      <TeamCard team={null} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={false} />
    );
    expect(html).toContain('Select Any Club');
  });

  it('renders club name, stadium, and trivia when club is selected', () => {
    const arsenal = PREMIER_LEAGUE_CLUBS.find((c) => c.id === 'ARS')!;
    const html = renderToString(
      <TeamCard team={arsenal} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={true} />
    );
    expect(html).toContain('Arsenal');
    expect(html).toContain('Emirates Stadium');
    expect(html).toContain('Greater London');
    expect(html).toContain('13 Titles');
  });

  it('renders close button when onClose handler is passed', () => {
    const arsenal = PREMIER_LEAGUE_CLUBS.find((c) => c.id === 'ARS')!;
    const html = renderToString(
      <TeamCard
        team={arsenal}
        onNextTeam={() => {}}
        onPrevTeam={() => {}}
        isExplored={true}
        onClose={() => {}}
      />
    );
    expect(html).toContain('aria-label="Close Club Details"');
  });

  it('renders official homepage link and website button', () => {
    const liverpool = PREMIER_LEAGUE_CLUBS.find((c) => c.id === 'LIV')!;
    const html = renderToString(
      <TeamCard team={liverpool} onNextTeam={() => {}} onPrevTeam={() => {}} isExplored={false} />
    );
    expect(html).toContain('href="https://www.liverpoolfc.com"');
    expect(html).toContain('target="_blank"');
    expect(html).toContain('Visit Official Club Website');
  });
});
