import React, { useState } from 'react';
import { QuestionType, calculateQuizRank } from '../utils/quizUtils';
import { Trophy, Flame, RotateCcw, Map, Share2, Check, X } from 'lucide-react';

interface QuizWinModalProps {
  isOpen: boolean;
  score: number;
  totalAnswered: number;
  bestStreak: number;
  mode: 'mixed' | QuestionType;
  onPlayAgain: () => void;
  onReviewMap: () => void;
  onOpenTiersModal: () => void;
}

export const QuizWinModal: React.FC<QuizWinModalProps> = ({
  isOpen,
  score,
  totalAnswered,
  bestStreak,
  mode,
  onPlayAgain,
  onReviewMap,
  onOpenTiersModal,
}) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen) return null;

  const rank = calculateQuizRank(score, totalAnswered);
  const accuracy = totalAnswered > 0 ? Math.round((score / totalAnswered) * 100) : 0;

  const handleCopySummary = async () => {
    const text = `🏒 NHL Teams Quiz (${mode}): ${rank.badgeEmoji} Rank ${rank.grade} - ${rank.title} | ${score}/${totalAnswered} (${accuracy}%) | Best Streak: ${bestStreak}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="modal-backdrop select-none" onClick={onReviewMap} role="dialog" aria-modal="true">
      <div className="modal-container quiz-win-container" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs uppercase tracking-wider">
            <Trophy className="w-4 h-4" /> Quiz Completed (32/32)
          </div>
          <button
            onClick={onReviewMap}
            className="p-1 text-slate-400 hover:text-slate-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 my-3 relative overflow-hidden">
          <div className="flex items-center justify-center gap-2 mb-1">
            <span className="text-4xl">{rank.badgeEmoji}</span>
            <span
              className="text-2xl font-black px-3 py-0.5 rounded-lg text-white"
              style={{ backgroundColor: rank.color }}
            >
              Rank {rank.grade}
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-slate-900 mt-1">{rank.title}</h3>
          <p className="text-xs text-slate-600 mt-1">{rank.description}</p>
          <button
            onClick={onOpenTiersModal}
            className="text-[11px] font-semibold text-rose-600 hover:underline mt-2 inline-block"
          >
            View all ranking tiers →
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 my-4">
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5">
            <span className="text-[11px] font-medium text-slate-500 block">Score</span>
            <span className="text-lg font-bold text-slate-900">{`${score}/${totalAnswered}`}</span>
          </div>
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5">
            <span className="text-[11px] font-medium text-slate-500 block">Accuracy</span>
            <span className="text-lg font-bold text-slate-900">{`${accuracy}%`}</span>
          </div>
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-2.5">
            <span className="text-[11px] font-medium text-slate-500 block">Best Streak</span>
            <span className="text-lg font-bold text-amber-600 flex items-center justify-center gap-0.5">
              <Flame className="w-3.5 h-3.5" /> {bestStreak}
            </span>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <button
            onClick={handleCopySummary}
            className="w-full py-2.5 px-4 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 flex items-center justify-center gap-2 transition-all"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Copied to Clipboard!' : 'Share Score Summary'}
          </button>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onReviewMap}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold border border-slate-200 bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center gap-1.5 transition-all"
            >
              <Map className="w-4 h-4" /> Review Map
            </button>
            <button
              onClick={onPlayAgain}
              className="w-full py-2.5 px-4 rounded-xl text-xs font-bold bg-rose-100 hover:bg-rose-200 text-black border border-rose-300 flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <RotateCcw className="w-4 h-4 text-black" /> Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
