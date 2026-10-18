import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import { QuizQuestionBanner, QuizMultipleChoicePanel } from './QuizQuestionBanner';
import { MLB_TEAMS } from '../data/mlbTeamsData';
import { QuizQuestion } from '../utils/quizUtils';

describe('QuizQuestionBanner', () => {
  it('renders question prompt banner', () => {
    const question: QuizQuestion = {
      questionType: 'team-name',
      prompt: 'Find the Los Angeles Dodgers on the map',
      targetTeam: MLB_TEAMS[0],
    };

    const html = renderToString(
      <QuizQuestionBanner currentQuestion={question} hintUsed={false} />
    );

    expect(html).toContain('Find the Los Angeles Dodgers on the map');
    expect(html).toContain('quiz-question-banner');
  });

  it('renders completion banner when quiz is complete', () => {
    const html = renderToString(
      <QuizQuestionBanner currentQuestion={null} hintUsed={false} isComplete={true} />
    );

    expect(html).toContain('World Series Champions! All 30 MLB Teams Identified!');
  });
});

describe('QuizMultipleChoicePanel', () => {
  it('renders 4 choice buttons with letters A, B, C, D', () => {
    const choices = MLB_TEAMS.slice(0, 4);
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
