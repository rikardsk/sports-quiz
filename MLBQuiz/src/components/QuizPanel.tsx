import React from 'react';
import { QuestionType, calculateQuizRank } from '../utils/quizUtils';
import { Flame, Lightbulb, SkipForward, RotateCcw, Trophy, Eye, X } from 'lucide-react';

export interface QuizPanelProps {
  score: number;
  totalAnswered: number;
  streak: number;
  bestStreak: number;
  hintUsed: boolean;
  questionTypeMode: 'mixed' | QuestionType;
  currentQuestionType?: QuestionType;
  isComplete?: boolean;
  isRevealing?: boolean;
  onViewWinModal?: () => void;
  onOpenModeModal: () => void;
  onOpenTiersModal: () => void;
  onUseHint: () => void;
  onShowAnswer: () => void;
  onSkipQuestion: () => void;
  onRestartQuiz: () => void;
  onClose?: () => void;
}

const getModeLabel = (mode: 'mixed' | QuestionType): string => {
  if (mode === 'team-name') return 'Map Only';
  if (mode === 'ballpark' || mode === 'arena' || mode === 'stadium') return 'Ballparks';
  if (mode === 'division') return 'Divisions';
  if (mode === 'city') return 'Host Cities';
  if (mode === 'multiple-choice') return 'Multiple Choice';
  return 'Mixed Mode';
};

const QuizModeHeader: React.FC<{
  mode: 'mixed' | QuestionType;
  onOpen: () => void;
  onOpenTiers: () => void;
  onClose?: () => void;
}> = ({ mode, onOpen, onOpenTiers, onClose }) => {
  const label = getModeLabel(mode);

  return (
    <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100">
      <div className="flex items-center gap-1.5">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Quiz Mode</span>
        <button
          onClick={onOpenTiers}
          className="text-[10px] font-extrabold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-1.5 py-0.5 rounded transition-colors"
          title="View score ranking tiers"
        >
          Tiers 🏆
        </button>
      </div>
      <div className="flex items-center gap-1.5">
        <button
          onClick={onOpen}
          className="text-xs font-bold text-slate-900 hover:text-black bg-rose-50 hover:bg-rose-100 border border-rose-200/80 px-2 py-0.5 rounded-md transition-colors"
          title="Switch quiz mode"
        >
          {label}
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Hide Scoring Panel"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

const QuizStatsBar: React.FC<{
  score: number;
  totalAnswered: number;
  streak: number;
  bestStreak: number;
  accuracy: number;
}> = ({ score, totalAnswered, streak, bestStreak, accuracy }) => (
  <div className="grid grid-cols-3 gap-2 mb-4 text-center">
    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5">
      <span className="text-[11px] font-medium text-slate-500">Score</span>
      <p className="text-lg font-bold text-slate-900">{`${score} / ${totalAnswered}`}</p>
    </div>
    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5">
      <span className="text-[11px] font-medium text-slate-500 flex items-center justify-center gap-0.5">
        <Flame className="w-3 h-3 text-amber-500" /> Streak
      </span>
      <p className="text-lg font-bold text-amber-600">
        {`${streak} `}
        <span className="text-xs text-slate-400">{`(${bestStreak})`}</span>
      </p>
    </div>
    <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5">
      <span className="text-[11px] font-medium text-slate-500">Accuracy</span>
      <p className="text-lg font-bold text-slate-900">{`${accuracy}%`}</p>
    </div>
  </div>
);

const HintButton: React.FC<{
  hintUsed: boolean;
  disabled?: boolean;
  onClick: () => void;
}> = ({ hintUsed, disabled, onClick }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={
      hintUsed
        ? { backgroundColor: '#f1f5f9', borderColor: '#cbd5e1', color: '#94a3b8' }
        : { backgroundColor: '#fef3c7', borderColor: '#fcd34d', color: '#92400e' }
    }
    className={`w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
      hintUsed ? 'cursor-not-allowed' : 'hover:brightness-95 shadow-xs'
    }`}
  >
    <Lightbulb className={`w-3.5 h-3.5 ${hintUsed ? 'text-slate-400' : 'text-amber-600 fill-amber-400'}`} />
    {hintUsed ? 'Hint Used' : 'Need a Hint'}
  </button>
);

const QuizActions: React.FC<{
  hintUsed: boolean;
  isRevealing?: boolean;
  onUseHint: () => void;
  onShowAnswer: () => void;
  onSkipQuestion: () => void;
  onRestartQuiz: () => void;
}> = ({ hintUsed, isRevealing, onUseHint, onShowAnswer, onSkipQuestion, onRestartQuiz }) => (
  <div className="space-y-2 pt-2 border-t border-slate-100 mt-auto shrink-0">
    <div className="grid grid-cols-2 gap-2">
      <HintButton hintUsed={hintUsed} disabled={hintUsed || isRevealing} onClick={onUseHint} />
      <button
        onClick={onShowAnswer}
        disabled={isRevealing}
        className="w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all"
      >
        <Eye className="w-3.5 h-3.5" />
        Reveal Team
      </button>
    </div>

    <div className="grid grid-cols-2 gap-2">
      <button
        onClick={onSkipQuestion}
        disabled={isRevealing}
        className="w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all"
      >
        <SkipForward className="w-3.5 h-3.5" />
        Skip Team
      </button>
      <button
        onClick={onRestartQuiz}
        className="w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Restart
      </button>
    </div>
  </div>
);

const QuizRankBadge: React.FC<{ rank: ReturnType<typeof calculateQuizRank> }> = ({ rank }) => (
  <div className="mb-4 p-3 bg-slate-50 border border-slate-200/70 rounded-xl flex items-center justify-between">
    <span className="text-xs font-medium text-slate-600 flex items-center gap-1.5">
      <Trophy className="w-3.5 h-3.5 text-amber-500" /> Current Rank:
    </span>
    <span
      className="text-xs font-extrabold px-2.5 py-0.5 rounded-full text-white shadow-sm flex items-center gap-1"
      style={{ backgroundColor: rank.color }}
    >
      <span>{rank.badgeEmoji}</span>
      <span>{rank.title}</span>
    </span>
  </div>
);

export const QuizPanel: React.FC<QuizPanelProps> = ({
  score,
  totalAnswered,
  streak,
  bestStreak,
  hintUsed,
  questionTypeMode,
  isComplete,
  isRevealing,
  onViewWinModal,
  onOpenModeModal,
  onOpenTiersModal,
  onUseHint,
  onShowAnswer,
  onSkipQuestion,
  onRestartQuiz,
  onClose,
}) => {
  const accuracy = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;
  const currentRank = calculateQuizRank(score, totalAnswered);

  return (
    <div className="quiz-panel-card h-full max-h-full">
      <div className="flex flex-col">
        <QuizModeHeader
          mode={questionTypeMode}
          onOpen={onOpenModeModal}
          onOpenTiers={onOpenTiersModal}
          onClose={onClose}
        />
        <QuizStatsBar
          score={score}
          totalAnswered={totalAnswered}
          streak={streak}
          bestStreak={bestStreak}
          accuracy={accuracy}
        />
        <QuizRankBadge rank={currentRank} />
        {isComplete && onViewWinModal && (
          <button
            onClick={onViewWinModal}
            className="w-full mb-3 py-2.5 px-4 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-sm flex items-center justify-center gap-2 transition-all"
          >
            <Trophy className="w-4 h-4" /> View Hall of Fame Summary
          </button>
        )}
      </div>

      <QuizActions
        hintUsed={hintUsed}
        isRevealing={isRevealing}
        onUseHint={onUseHint}
        onShowAnswer={onShowAnswer}
        onSkipQuestion={onSkipQuestion}
        onRestartQuiz={onRestartQuiz}
      />
    </div>
  );
};
