import React from 'react';
import { NBATeam } from '../data/nbaTeamsData';
import { CheckCircle2, AlertCircle, Eye } from 'lucide-react';

export interface QuizToastProps {
  status: 'idle' | 'correct' | 'incorrect' | 'revealed';
  targetTeamName?: string;
  lastAnsweredTeam?: NBATeam | null;
}

const renderToastBody = (
  status: 'correct' | 'incorrect' | 'revealed',
  targetTeamName?: string,
  lastAnsweredTeam?: NBATeam | null
) => {
  if (status === 'correct') {
    return (
      <div className="quiz-toast quiz-toast-correct">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        <span>{`Swish! That is the ${targetTeamName}! (+1 pt)`}</span>
      </div>
    );
  }
  if (status === 'revealed') {
    return (
      <div className="quiz-toast quiz-toast-revealed">
        <Eye className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <span>{`Here is the ${targetTeamName}!`}</span>
      </div>
    );
  }
  return (
    <div className="quiz-toast quiz-toast-incorrect">
      <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
      <span>{`Airball! That was the ${lastAnsweredTeam?.name ?? 'incorrect team'}! Try again!`}</span>
    </div>
  );
};

export const QuizToast: React.FC<QuizToastProps> = ({
  status,
  targetTeamName,
  lastAnsweredTeam,
}) => {
  if (status === 'idle') return null;
  if (status === 'incorrect' && !lastAnsweredTeam) return null;

  return (
    <div className="quiz-toast-container" role="status" aria-live="polite">
      {renderToastBody(status, targetTeamName, lastAnsweredTeam)}
    </div>
  );
};
