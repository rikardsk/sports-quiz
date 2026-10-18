import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { USMap } from './USMap';

describe('USMap', () => {
  it('renders US map svg without text legends under the map', () => {
    const html = renderToString(
      <USMap
        selectedTeam={null}
        onSelectTeam={() => {}}
        activeFilter="All"
        correctTeamIds={new Set()}
        revealedTeamIds={new Set()}
      />
    );

    expect(html).toContain('viewBox="0 0 959 593"');
    expect(html).toContain('id="states"');
    expect(html).toContain('id="nfl-teams"');
    expect(html).not.toContain('Stripes = Dual Divisions');
  });

  it('correctly colors Florida in AFC South filter for the Jaguars', () => {
    const html = renderToString(
      <USMap
        selectedTeam={null}
        onSelectTeam={() => {}}
        activeFilter="AFC South"
        correctTeamIds={new Set()}
        revealedTeamIds={new Set()}
      />
    );

    // Florida path should be filled with AFC South yellow color (#fef08a)
    expect(html).toContain('fill="#fef08a"');
  });

  it('ignores activeFilter in quiz mode and displays all states normally', () => {
    const html = renderToString(
      <USMap
        selectedTeam={null}
        onSelectTeam={() => {}}
        activeFilter="AFC South"
        isQuizMode={true}
        correctTeamIds={new Set()}
        revealedTeamIds={new Set()}
      />
    );

    // In quiz mode, Florida should use its multi-team division pattern instead of AFC South filter yellow
    expect(html).toContain('fill="url(#stripes-fl)"');
  });

  it('renders prominent HintedStateOverlay when hintState is provided', () => {
    const html = renderToString(
      <USMap
        selectedTeam={null}
        onSelectTeam={() => {}}
        activeFilter="All"
        isQuizMode={true}
        hintState="MO"
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
        correctTeamIds={new Set(['BUF'])}
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
        targetHighlightTeamId="BUF"
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
