import React from 'react';
import { AllsvenskanClub } from '../data/allsvenskanTeamsData';
import { CheckCircle2, AlertCircle, Eye } from 'lucide-react';

export interface QuizToastProps {
  status: 'idle' | 'correct' | 'incorrect' | 'revealed';
  targetTeamName?: string;
  lastAnsweredTeam?: AllsvenskanClub | null;
}

const renderToastBody = (
  status: 'correct' | 'incorrect' | 'revealed',
  targetTeamName?: string,
  lastAnsweredTeam?: AllsvenskanClub | null
) => {
  if (status === 'correct') {
    return (
      <div className="quiz-toast quiz-toast-correct">
        <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
        <span>{`Mål! Det är ${targetTeamName}! (+1 p)`}</span>
      </div>
    );
  }
  if (status === 'revealed') {
    return (
      <div className="quiz-toast quiz-toast-revealed">
        <Eye className="w-5 h-5 text-amber-600 flex-shrink-0" />
        <span>{`Här är ${targetTeamName}!`}</span>
      </div>
    );
  }
  return (
    <div className="quiz-toast quiz-toast-incorrect">
      <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
      <span>{`Utanför! Det var ${lastAnsweredTeam?.name ?? 'fel klubb'}! Försök igen!`}</span>
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
