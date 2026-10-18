import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { QuizStartModal } from './QuizStartModal';

describe('QuizStartModal', () => {
  it('renders modal with mode choices and Cancel button when open', () => {
    const html = renderToString(
      <QuizStartModal
        isOpen={true}
        onClose={() => {}}
        onStart={() => {}}
        initialMode="team-name"
      />
    );

    expect(html).toContain('Välj Allsvenskan Quizläge');
    expect(html).toContain('Klubbkartan');
    expect(html).toContain('Arenautmaning');
    expect(html).not.toContain('Regionutmaning');
    expect(html).toContain('Flervalsquiz');
    expect(html).toContain('Mixat Pro-läge');
    expect(html).toContain('Avbryt');
    expect(html).toContain('Starta Quiz');
  });

  it('renders red icon background for the selected quiz mode', () => {
    const html = renderToString(
      <QuizStartModal
        isOpen={true}
        onClose={() => {}}
        onStart={() => {}}
        initialMode="team-name"
      />
    );

    // Selected quiz item has red icon background (bg-rose-500), border-slate-400, and white icon text
    expect(html).toContain('bg-rose-500 text-white');
    expect(html).toContain('border-slate-400');
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
