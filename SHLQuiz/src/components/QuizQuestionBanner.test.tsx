import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { QuizQuestionBanner, QuizMultipleChoicePanel, getLocalizedPrompt } from './QuizQuestionBanner';
import { SHL_CLUBS } from '../data/shlTeamsData';
import { QuizQuestion } from '../utils/quizUtils';

describe('QuizQuestionBanner', () => {
  it('renders question prompt banner in Swedish', () => {
    const question: QuizQuestion = {
      questionType: 'team-name',
      prompt: 'Hitta Frölunda HC på kartan',
      targetTeam: SHL_CLUBS[0],
    };

    const html = renderToString(
      <QuizQuestionBanner currentQuestion={question} hintUsed={false} />
    );

    expect(html).toContain('Hitta Frölunda HC på kartan');
    expect(html).toContain('quiz-question-banner');
  });

  it('translates legacy English prompts like Which club plays at Scandinavium? to Swedish', () => {
    expect(getLocalizedPrompt('Which club plays at Scandinavium?')).toBe('Vilken klubb spelar i Scandinavium?');
    expect(getLocalizedPrompt('Find Frölunda HC on the map')).toBe('Hitta Frölunda HC på kartan');
    expect(getLocalizedPrompt('Which club plays in Götaland?')).toBe('Vilken klubb spelar i Götaland?');

    const question: QuizQuestion = {
      questionType: 'stadium',
      prompt: 'Which club plays at Scandinavium?',
      targetTeam: SHL_CLUBS.find((t) => t.id === 'frolunda-hc')!,
    };

    const html = renderToString(
      <QuizQuestionBanner currentQuestion={question} hintUsed={false} />
    );

    expect(html).toContain('Vilken klubb spelar i Scandinavium?');
    expect(html).not.toContain('Which club plays at');
  });

  it('renders completion banner when quiz is complete', () => {
    const html = renderToString(
      <QuizQuestionBanner currentQuestion={null} hintUsed={false} isComplete={true} />
    );

    expect(html).toContain('SM-Guld! Alla 14 SHL-klubbar identifierade!');
  });
});

describe('QuizMultipleChoicePanel', () => {
  it('renders 4 choice buttons with letters A, B, C, D', () => {
    const choices = SHL_CLUBS.slice(0, 4);
    const html = renderToString(
      <QuizMultipleChoicePanel
        choices={choices}
        targetTeamId={choices[0].id}
        onSelectChoice={() => {}}
      />
    );

    expect(html).toContain('quiz-mc-banner');
    expect(html).toContain('quiz-mc-badge-a');
    expect(html).toContain('quiz-mc-badge-b');
    expect(html).toContain('quiz-mc-badge-c');
    expect(html).toContain('quiz-mc-badge-d');
    expect(html).toContain(choices[0].name);
    expect(html).not.toContain('<img');
  });
});
