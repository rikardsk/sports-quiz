import React from 'react';
import { Target } from 'lucide-react';
import { QuestionType } from '../utils/quizUtils';

interface QuizHeaderProps {
  mode: 'mixed' | QuestionType;
  solvedCount?: number;
  revealedCount?: number;
  totalTeams?: number;
}

function getModeTitle(mode: 'mixed' | QuestionType): string {
  if (mode === 'team-name') return '16 Allsvenskan-klubbar Kartutmaning';
  if (mode === 'arena' || mode === 'stadium') return 'Allsvenska Arenor Utmaning';
  if (mode === 'division') return 'Allsvenskan Landsdelar & Regioner';
  if (mode === 'city') return 'Allsvenska Städer Utmaning';
  if (mode === 'multiple-choice') return 'Allsvenskan Flervalsquiz';
  return '16 Allsvenskan-klubbar & Arenor Quiz';
}

export const QuizHeader: React.FC<QuizHeaderProps> = ({
  mode,
}) => {
  const title = getModeTitle(mode);

  return (
    <header className="w-full max-w-5xl mx-auto mb-6">
      <div className="pb-4 border-b border-slate-200">
        <div className="flex items-center gap-2 text-emerald-600 font-semibold text-sm mb-1">
          <Target className="w-4 h-4" />
          <span>Interaktiv Allsvenskan Geografi & Arenor Quiz</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{title}</h1>
        <p className="text-sm text-slate-500 mt-1">
          Hitta arenor och klubbar på Sverigekartan för att testa dina kunskaper om alla 16 klubbar.
        </p>
      </div>
    </header>
  );
};
