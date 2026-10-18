import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { QuizWinModal } from './QuizWinModal';

describe('QuizWinModal', () => {
  it('renders Spela igen button and completed score when open', () => {
    const html = renderToString(
      <QuizWinModal
        isOpen={true}
        score={14}
        totalAnswered={14}
        bestStreak={14}
        mode="team-name"
        onPlayAgain={() => {}}
        onReviewMap={() => {}}
        onOpenTiersModal={() => {}}
      />
    );

    expect(html).toContain('Spela igen');
    expect(html).toContain('bg-rose-500');
    expect(html).toContain('14/14');
  });

  it('does not render when isOpen is false', () => {
    const html = renderToString(
      <QuizWinModal
        isOpen={false}
        score={14}
        totalAnswered={14}
        bestStreak={14}
        mode="team-name"
        onPlayAgain={() => {}}
        onReviewMap={() => {}}
        onOpenTiersModal={() => {}}
      />
    );

    expect(html).toBe('');
  });
});
