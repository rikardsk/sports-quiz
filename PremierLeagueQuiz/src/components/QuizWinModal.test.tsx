import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { QuizWinModal } from './QuizWinModal';

describe('QuizWinModal', () => {
  it('renders Play Again button and correct styling', () => {
    const html = renderToString(
      <QuizWinModal
        isOpen={true}
        score={20}
        totalAnswered={20}
        bestStreak={15}
        mode="team-name"
        onPlayAgain={() => {}}
        onReviewMap={() => {}}
        onOpenTiersModal={() => {}}
      />
    );

    expect(html).toContain('Play Again');
    expect(html).toContain('bg-purple-100');
  });

  it('does not render when isOpen is false', () => {
    const html = renderToString(
      <QuizWinModal
        isOpen={false}
        score={20}
        totalAnswered={20}
        bestStreak={15}
        mode="team-name"
        onPlayAgain={() => {}}
        onReviewMap={() => {}}
        onOpenTiersModal={() => {}}
      />
    );

    expect(html).toBe('');
  });
});
