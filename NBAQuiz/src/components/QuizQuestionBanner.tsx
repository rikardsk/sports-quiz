import React from 'react';
import { QuizQuestion } from '../utils/quizUtils';
import { NBATeam } from '../data/nbaTeamsData';

export interface QuizQuestionBannerProps {
  currentQuestion: QuizQuestion | null;
  hintUsed: boolean;
  isComplete?: boolean;
}

export interface QuizMultipleChoicePanelProps {
  choices: NBATeam[];
  targetTeamId?: string;
  isRevealing?: boolean;
  onSelectChoice: (choice: NBATeam) => void;
  disabled?: boolean;
}

const BADGE_CLASSES = [
  'quiz-mc-badge quiz-mc-badge-a',
  'quiz-mc-badge quiz-mc-badge-b',
  'quiz-mc-badge quiz-mc-badge-c',
  'quiz-mc-badge quiz-mc-badge-d',
];

const ChoiceButton: React.FC<{
  choice: NBATeam;
  index: number;
  onSelect: (choice: NBATeam) => void;
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
      <span className="quiz-mc-region">{choice.division}</span>
    </button>
  );
};

const MultipleChoiceOptions: React.FC<{
  choices: NBATeam[];
  targetTeamId?: string;
  isRevealing?: boolean;
  onSelect: (choice: NBATeam) => void;
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
      🏆 Championship! All 30 NBA Teams Identified!
    </h2>
    <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1">
      You've conquered the entire NBA map. Check your Hall of Fame ranking!
    </p>
  </div>
);

export const QuizQuestionBanner: React.FC<QuizQuestionBannerProps> = ({
  currentQuestion,
  hintUsed,
  isComplete,
}) => {
  if (isComplete) return <CompletionBanner />;
  if (!currentQuestion) return null;

  return (
    <div className="quiz-question-banner">
      <h2 className="quiz-question-text">{currentQuestion.prompt}</h2>
      {hintUsed && (
        <p className="text-xs font-bold text-rose-600 mt-0.5 animate-fade-in flex items-center justify-center gap-1">
          <span>💡</span> Look inside the {currentQuestion.targetTeam.division} in {currentQuestion.targetTeam.stateName}!
        </p>
      )}
    </div>
  );
};
