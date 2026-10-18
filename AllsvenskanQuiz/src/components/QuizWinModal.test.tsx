import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { QuizWinModal } from './QuizWinModal';

describe('QuizWinModal', () => {
  it('renders Spela igen button and completed score when open', () => {
    const html = renderToString(
      <QuizWinModal
        isOpen={true}
        score={16}
        totalAnswered={16}
        bestStreak={16}
        mode="team-name"
        onPlayAgain={() => {}}
        onReviewMap={() => {}}
        onOpenTiersModal={() => {}}
      />
    );

    expect(html).toContain('Spela igen');
    expect(html).toContain('bg-rose-500');
    expect(html).toContain('16/16');
  });

  it('does not render when isOpen is false', () => {
    const html = renderToString(
      <QuizWinModal
        isOpen={false}
        score={16}
        totalAnswered={16}
        bestStreak={16}
        mode="team-name"
        onPlayAgain={() => {}}
        onReviewMap={() => {}}
        onOpenTiersModal={() => {}}
      />
    );

    expect(html).toBe('');
  });
});
