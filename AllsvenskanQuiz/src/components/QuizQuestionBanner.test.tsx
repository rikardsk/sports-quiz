import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { QuizQuestionBanner, QuizMultipleChoicePanel, getLocalizedPrompt } from './QuizQuestionBanner';
import { ALLSVENSKAN_CLUBS } from '../data/allsvenskanTeamsData';
import { QuizQuestion } from '../utils/quizUtils';

describe('QuizQuestionBanner', () => {
  it('renders question prompt banner in Swedish', () => {
    const question: QuizQuestion = {
      questionType: 'team-name',
      prompt: 'Hitta Malmö FF på kartan',
      targetTeam: ALLSVENSKAN_CLUBS[0],
    };

    const html = renderToString(
      <QuizQuestionBanner currentQuestion={question} hintUsed={false} />
    );

    expect(html).toContain('Hitta Malmö FF på kartan');
    expect(html).toContain('quiz-question-banner');
  });

  it('translates legacy English prompts like Which club plays at Örjans Vall? to Swedish', () => {
    expect(getLocalizedPrompt('Which club plays at Örjans Vall?')).toBe('Vilken klubb spelar på Örjans Vall?');
    expect(getLocalizedPrompt('Find IFK Göteborg on the map')).toBe('Hitta IFK Göteborg på kartan');
    expect(getLocalizedPrompt('Which club plays in Götaland?')).toBe('Vilken klubb spelar i Götaland?');

    const question: QuizQuestion = {
      questionType: 'stadium',
      prompt: 'Which club plays at Örjans Vall?',
      targetTeam: ALLSVENSKAN_CLUBS.find((t) => t.id === 'halmstads-bk')!,
    };

    const html = renderToString(
      <QuizQuestionBanner currentQuestion={question} hintUsed={false} />
    );

    expect(html).toContain('Vilken klubb spelar på Örjans Vall?');
    expect(html).not.toContain('Which club plays at');
  });

  it('renders completion banner when quiz is complete', () => {
    const html = renderToString(
      <QuizQuestionBanner currentQuestion={null} hintUsed={false} isComplete={true} />
    );

    expect(html).toContain('SM-Guld! Alla 16 Allsvenskan-klubbar identifierade!');
  });
});

describe('QuizMultipleChoicePanel', () => {
  it('renders 4 choice buttons with letters A, B, C, D', () => {
    const choices = ALLSVENSKAN_CLUBS.slice(0, 4);
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
