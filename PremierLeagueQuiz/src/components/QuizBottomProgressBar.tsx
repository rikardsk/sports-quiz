import React from 'react';
import { Target } from 'lucide-react';
import { calculateQuizProgress } from '../utils/quizUtils';

export interface QuizBottomProgressBarProps {
  solvedCount: number;
  revealedCount: number;
  totalTeams: number;
  className?: string;
}

export const QuizBottomProgressBar: React.FC<QuizBottomProgressBarProps> = ({
  solvedCount,
  revealedCount,
  totalTeams,
  className = 'w-full max-w-5xl mx-auto',
}) => {
  const { identifiedCount, remainingCount, percentage } = calculateQuizProgress(
    solvedCount,
    revealedCount,
    totalTeams
  );

  return (
    <div className={`bg-white border border-slate-200 rounded-2xl p-4 shadow-sm ${className}`}>
      <div className="flex items-center justify-between text-xs font-semibold mb-2">
        <span className="text-slate-700 flex items-center gap-1.5 font-bold">
          <Target className="w-4 h-4 text-purple-700 flex-shrink-0" />
          <span>Clubs Remaining to Identify</span>
        </span>
        <span className="text-slate-900 font-bold">
          <span className="text-purple-700 font-extrabold text-sm">{remainingCount}</span>
          <span className="text-slate-500 font-medium ml-1">left</span>
          <span className="text-slate-400 font-normal ml-1.5">
            {`(${identifiedCount} / ${totalTeams} • ${percentage}%)`}
          </span>
        </span>
      </div>
      <div className="progress-bar-track">
        <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
      </div>
    </div>
  );
};
