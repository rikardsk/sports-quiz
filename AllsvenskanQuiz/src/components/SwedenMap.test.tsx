import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { SwedenMap } from './SwedenMap';

describe('SwedenMap', () => {
  it('renders Sweden vector map svg with counties and clubs', () => {
    const html = renderToString(
      <SwedenMap
        selectedTeam={null}
        onSelectTeam={() => {}}
        activeFilter="All"
        correctTeamIds={new Set()}
        revealedTeamIds={new Set()}
      />
    );

    expect(html).toContain('viewBox="0 0 500 900"');
    expect(html).toContain('id="counties"');
    expect(html).toContain('id="allsvenskan-clubs"');
  });

  it('correctly colors counties in Götaland when filter is active', () => {
    const html = renderToString(
      <SwedenMap
        selectedTeam={null}
        onSelectTeam={() => {}}
        activeFilter="Götaland"
        correctTeamIds={new Set()}
        revealedTeamIds={new Set()}
      />
    );

    expect(html).toContain('fill="#dbeafe"');
  });

  it('renders hint overlay with yellow fill and red stroke when hintState is provided', () => {
    const html = renderToString(
      <SwedenMap
        selectedTeam={null}
        onSelectTeam={() => {}}
        activeFilter="All"
        isQuizMode={true}
        hintState="Skåne"
        correctTeamIds={new Set()}
        revealedTeamIds={new Set()}
      />
    );

    expect(html).toContain('fill="#fde047"');
    expect(html).toContain('stroke="#e11d48"');
  });

  it('renders green checkmark badge for solved clubs', () => {
    const html = renderToString(
      <SwedenMap
        selectedTeam={null}
        onSelectTeam={() => {}}
        activeFilter="All"
        isQuizMode={true}
        correctTeamIds={new Set(['malmo-ff'])}
        revealedTeamIds={new Set()}
      />
    );

    expect(html).toContain('fill="#10b981"');
  });

  it('renders TargetBeacon when targetHighlightTeamId is provided', () => {
    const html = renderToString(
      <SwedenMap
        selectedTeam={null}
        onSelectTeam={() => {}}
        activeFilter="All"
        isQuizMode={true}
        targetHighlightTeamId="malmo-ff"
        correctTeamIds={new Set()}
        revealedTeamIds={new Set()}
      />
    );

    expect(html).toContain('r="20"');
    expect(html).toContain('stroke="#f43f5e"');
    expect(html).not.toContain('animate-ping');
  });
});
