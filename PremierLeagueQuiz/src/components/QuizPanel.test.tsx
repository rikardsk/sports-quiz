import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { QuizPanel } from './QuizPanel';

describe('QuizPanel', () => {
  it('renders Need a Hint button with amber styling when hint is available', () => {
    const html = renderToString(
      <QuizPanel
        score={0}
        totalAnswered={0}
        streak={0}
        bestStreak={0}
        hintUsed={false}
        questionTypeMode="team-name"
        onOpenModeModal={() => {}}
        onOpenTiersModal={() => {}}
        onUseHint={() => {}}
        onShowAnswer={() => {}}
        onSkipQuestion={() => {}}
        onRestartQuiz={() => {}}
      />
    );

    expect(html).toContain('Need a Hint');
    expect(html).toContain('#fef3c7');
    expect(html).toContain('#92400e');
  });

  it('renders Hint Used when hintUsed is true', () => {
    const html = renderToString(
      <QuizPanel
        score={0}
        totalAnswered={0}
        streak={0}
        bestStreak={0}
        hintUsed={true}
        questionTypeMode="team-name"
        onOpenModeModal={() => {}}
        onOpenTiersModal={() => {}}
        onUseHint={() => {}}
        onShowAnswer={() => {}}
        onSkipQuestion={() => {}}
        onRestartQuiz={() => {}}
      />
    );

    expect(html).toContain('Hint Used');
    expect(html).toContain('disabled');
  });
});
