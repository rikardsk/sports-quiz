import React from 'react';
import { Target } from 'lucide-react';
import { QuestionType, calculateQuizProgress } from '../utils/quizUtils';

interface QuizHeaderProps {
  mode: 'mixed' | QuestionType;
  solvedCount: number;
  revealedCount: number;
  totalTeams: number;
}

function getModeTitle(mode: 'mixed' | QuestionType): string {
  if (mode === 'team-name') return '32 NHL Teams Map Challenge';
  if (mode === 'arena' || mode === 'stadium') return '32 NHL Arenas Challenge';
  if (mode === 'division') return 'NHL Divisions & Conferences Challenge';
  if (mode === 'city') return 'NHL Franchise Host Cities Challenge';
  if (mode === 'multiple-choice') return '32 NHL Teams Multiple Choice';
  return '32 NHL Teams & Arenas Mixed Quiz';
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  mode,
  solvedCount,
  revealedCount,
  totalTeams,
}) => {
  const { identifiedCount, remainingCount, percentage } = calculateQuizProgress(
    solvedCount,
    revealedCount,
    totalTeams
  );

  const title = getModeTitle(mode);

  return (
    <header className="w-full max-w-5xl mx-auto mb-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-semibold text-sm mb-1">
            <Target className="w-4 h-4" />
            <span>Interactive NHL Geography Quiz</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
          <p className="text-sm text-slate-500 mt-1">
            Locate arenas and teams on the map to test your hockey IQ and complete all 32 teams.
          </p>
        </div>

        <div className="progress-badge">
          <div className="progress-badge-header">
            <span className="progress-label">
              <Target className="w-3.5 h-3.5 text-rose-500" />
              Teams Remaining
            </span>
            <span className="progress-value">
              <span className="text-rose-600 font-extrabold">{remainingCount}</span> left ({identifiedCount}/{totalTeams})
            </span>
          </div>
          <div className="progress-bar-track">
            <div className="progress-bar-fill" style={{ width: `${percentage}%` }} />
          </div>
        </div>
      </div>
    </header>
  );
};
