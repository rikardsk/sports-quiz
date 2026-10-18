import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { QuizWinModal } from './QuizWinModal';

describe('QuizWinModal', () => {
  it('renders Play Again button with black text and correct styling', () => {
    const html = renderToString(
      <QuizWinModal
        isOpen={true}
        score={30}
        totalAnswered={32}
        bestStreak={15}
        mode="team-name"
        onPlayAgain={() => {}}
        onReviewMap={() => {}}
        onOpenTiersModal={() => {}}
      />
    );

    expect(html).toContain('Play Again');
    expect(html).toContain('text-black');
    expect(html).toContain('bg-rose-100');
  });

  it('does not render when isOpen is false', () => {
    const html = renderToString(
      <QuizWinModal
        isOpen={false}
        score={30}
        totalAnswered={32}
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
