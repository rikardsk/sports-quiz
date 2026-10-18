import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { QuizBottomProgressBar } from './QuizBottomProgressBar';

describe('QuizBottomProgressBar', () => {
  it('renders remaining clubs count and progress track correctly', () => {
    const html = renderToString(
      <QuizBottomProgressBar solvedCount={10} revealedCount={0} totalTeams={20} />
    );
    expect(html).toContain('10');
    expect(html).toContain('50%');
    expect(html).toContain('width:50%');
  });
});
