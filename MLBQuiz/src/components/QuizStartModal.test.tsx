import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { QuizStartModal } from './QuizStartModal';

describe('QuizStartModal', () => {
  it('renders modal with mode choices, whitespace, and Cancel button', () => {
    const html = renderToString(
      <QuizStartModal
        isOpen={true}
        onClose={() => {}}
        onStart={() => {}}
      />
    );

    expect(html).toContain('Choose Quiz Mode');
    expect(html).toContain('quiz-mode-container');
    expect(html).toContain('Franchise Map Challenge');
    expect(html).toContain('Ballparks Challenge');
    expect(html).toContain('Leagues &amp; Divisions');
    expect(html).toContain('Multiple Choice Quiz');
    expect(html).toContain('Mixed Pro Mode');
    expect(html).toContain('Cancel');
    expect(html).toContain('Start Quiz Challenge');
    expect(html).toContain('space-y-3');
  });

  it('does not render when isOpen is false', () => {
    const html = renderToString(
      <QuizStartModal
        isOpen={false}
        onClose={() => {}}
        onStart={() => {}}
      />
    );

    expect(html).toBe('');
  });
});
