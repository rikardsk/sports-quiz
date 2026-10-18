import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { USMap } from './USMap';

describe('USMap', () => {
  it('renders US & Canada map svg without text legends under the map', () => {
    const html = renderToString(
      <USMap
        selectedTeam={null}
        onSelectTeam={() => {}}
        activeFilter="All"
        correctTeamIds={new Set()}
        revealedTeamIds={new Set()}
      />
    );

    expect(html).toContain('viewBox="0 -70 959 663"');
    expect(html).toContain('id="states"');
    expect(html).toContain('id="mls-teams"');
  });

  it('correctly colors Florida in Eastern filter for Inter Miami and Orlando City', () => {
    const html = renderToString(
      <USMap
        selectedTeam={null}
        onSelectTeam={() => {}}
        activeFilter="Eastern"
        correctTeamIds={new Set()}
        revealedTeamIds={new Set()}
      />
    );

    // Florida path should be filled with Eastern light blue color (#dbeafe)
    expect(html).toContain('fill="#dbeafe"');
  });

  it('renders prominent HintedStateOverlay when hintState is provided', () => {
    const html = renderToString(
      <USMap
        selectedTeam={null}
        onSelectTeam={() => {}}
        activeFilter="All"
        isQuizMode={true}
        hintState="CA"
        correctTeamIds={new Set()}
        revealedTeamIds={new Set()}
      />
    );

    expect(html).toContain('fill="#fde047"');
    expect(html).toContain('stroke="#e11d48"');
  });

  it('renders green checkmark badge for solved teams', () => {
    const html = renderToString(
      <USMap
        selectedTeam={null}
        onSelectTeam={() => {}}
        activeFilter="All"
        isQuizMode={true}
        correctTeamIds={new Set(['ATL'])}
        revealedTeamIds={new Set()}
      />
    );

    // Green checkmark badge fill
    expect(html).toContain('fill="#10b981"');
  });

  it('renders TargetBeacon when targetHighlightTeamId is provided without pulse or bounce', () => {
    const html = renderToString(
      <USMap
        selectedTeam={null}
        onSelectTeam={() => {}}
        activeFilter="All"
        isQuizMode={true}
        targetHighlightTeamId="ATL"
        correctTeamIds={new Set()}
        revealedTeamIds={new Set()}
      />
    );

    // TargetBeacon steady ring
    expect(html).toContain('r="22"');
    expect(html).toContain('stroke="#f43f5e"');
    expect(html).not.toContain('animate-ping');
    expect(html).not.toContain('animate-bounce');
  });
});
