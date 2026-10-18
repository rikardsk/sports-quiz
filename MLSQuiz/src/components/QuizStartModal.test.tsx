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

    expect(html).toContain('Select MLS Quiz Mode');
    expect(html).toContain('Club Map Challenge');
    expect(html).toContain('Stadiums Challenge');
    expect(html).toContain('Conferences Challenge');
    expect(html).toContain('Multiple Choice Quiz');
    expect(html).toContain('Mixed Pro Mode');
    expect(html).toContain('Cancel');
    expect(html).toContain('Start Quiz');
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

    // Selected quiz item has red background (bg-rose-500), border-rose-500, and white text
    expect(html).toContain('bg-rose-500 text-white');
    expect(html).toContain('border-rose-500');
    expect(html).toContain('bg-rose-50/70');
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
