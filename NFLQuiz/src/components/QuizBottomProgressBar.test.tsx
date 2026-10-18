import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { QuizBottomProgressBar } from './QuizBottomProgressBar';

describe('QuizBottomProgressBar', () => {
  it('renders remaining teams count and progress track correctly', () => {
    const html = renderToString(
      <QuizBottomProgressBar solvedCount={16} revealedCount={0} totalTeams={32} />
    );
    expect(html).toContain('16');
    expect(html).toContain('50%');
    expect(html).toContain('width:50%');
  });
});
