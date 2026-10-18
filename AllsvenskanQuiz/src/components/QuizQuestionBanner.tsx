import React from 'react';
import { QuizQuestion } from '../utils/quizUtils';
import { AllsvenskanClub } from '../data/allsvenskanTeamsData';

export interface QuizQuestionBannerProps {
  currentQuestion: QuizQuestion | null;
  hintUsed: boolean;
  isComplete?: boolean;
}

export interface QuizMultipleChoicePanelProps {
  choices: AllsvenskanClub[];
  targetTeamId?: string;
  isRevealing?: boolean;
  onSelectChoice: (choice: AllsvenskanClub) => void;
  disabled?: boolean;
}

const BADGE_CLASSES = [
  'quiz-mc-badge quiz-mc-badge-a',
  'quiz-mc-badge quiz-mc-badge-b',
  'quiz-mc-badge quiz-mc-badge-c',
  'quiz-mc-badge quiz-mc-badge-d',
];

const ChoiceButton: React.FC<{
  choice: AllsvenskanClub;
  index: number;
  onSelect: (choice: AllsvenskanClub) => void;
  disabled?: boolean;
  isFlashing?: boolean;
}> = ({ choice, index, onSelect, disabled, isFlashing }) => {
  const badgeClass = BADGE_CLASSES[index] ?? 'quiz-mc-badge';
  const buttonClass = `quiz-mc-button ${isFlashing ? 'quiz-mc-button-flash' : ''}`;

  return (
    <button onClick={() => onSelect(choice)} disabled={disabled} className={buttonClass}>
      <div className="quiz-mc-left">
        <span className={badgeClass}>{['A', 'B', 'C', 'D'][index]}</span>
        <span className="quiz-mc-name">{choice.name}</span>
      </div>
      <span className="quiz-mc-region">{choice.region}</span>
    </button>
  );
};

const MultipleChoiceOptions: React.FC<{
  choices: AllsvenskanClub[];
  targetTeamId?: string;
  isRevealing?: boolean;
  onSelect: (choice: AllsvenskanClub) => void;
  disabled?: boolean;
}> = ({ choices, targetTeamId, isRevealing, onSelect, disabled }) => (
  <div className="quiz-mc-grid">
    {choices.map((choice, idx) => (
      <ChoiceButton
        key={choice.id}
        choice={choice}
        index={idx}
        onSelect={onSelect}
        disabled={disabled}
        isFlashing={Boolean(isRevealing && choice.id === targetTeamId)}
      />
    ))}
  </div>
);

export const QuizMultipleChoicePanel: React.FC<QuizMultipleChoicePanelProps> = ({
  choices,
  targetTeamId,
  isRevealing,
  onSelectChoice,
  disabled,
}) => {
  if (!choices || choices.length === 0) return null;

  return (
    <div className="quiz-mc-banner">
      <MultipleChoiceOptions
        choices={choices}
        targetTeamId={targetTeamId}
        isRevealing={isRevealing}
        onSelect={onSelectChoice}
        disabled={disabled}
      />
    </div>
  );
};

const CompletionBanner: React.FC = () => (
  <div className="quiz-question-banner">
    <h2 className="quiz-question-text text-emerald-600">
      🏆 SM-Guld! Alla 16 Allsvenskan-klubbar identifierade!
    </h2>
    <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
      Du har bemästrat hela Allsvenskan-kartan. Se ditt slutresultat!
    </p>
  </div>
);

export function getLocalizedPrompt(prompt: string): string {
  if (!prompt) return '';
  if (prompt.startsWith('Which club plays at ')) {
    const venue = prompt.slice('Which club plays at '.length).replace(/\?$/, '');
    return `Vilken klubb spelar på ${venue}?`;
  }
  if (prompt.startsWith('Which club plays in ')) {
    const region = prompt.slice('Which club plays in '.length).replace(/\?$/, '');
    return `Vilken klubb spelar i ${region}?`;
  }
  if (prompt.startsWith('Which club is based in ')) {
    const city = prompt.slice('Which club is based in '.length).replace(/\?$/, '');
    return `Vilken klubb hör hemma i ${city}?`;
  }
  if (prompt.startsWith('Find ') && prompt.endsWith(' on the map')) {
    const team = prompt.slice('Find '.length, prompt.length - ' on the map'.length);
    return `Hitta ${team} på kartan`;
  }
  if (prompt === 'Which club is highlighted on the map?') {
    return 'Vilken klubb är markerad på kartan?';
  }
  return prompt;
}

export const QuizQuestionBanner: React.FC<QuizQuestionBannerProps> = ({
  currentQuestion,
  hintUsed,
  isComplete = false,
}) => {
  if (isComplete) return <CompletionBanner />;
  if (!currentQuestion) return null;

  return (
    <div className="quiz-question-banner">
      <h2 className="quiz-question-text">
        {getLocalizedPrompt(currentQuestion.prompt)}
      </h2>
      {hintUsed && (
        <p className="text-xs text-amber-600 font-medium mt-1">
          💡 Ledtråd: Regionen är markerad på kartan!
        </p>
      )}
    </div>
  );
};
