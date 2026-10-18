import React, { useState, useEffect } from 'react';
import { QuestionType } from '../utils/quizUtils';
import { MapPin, Landmark, Sparkles, Play, X, Shield, CheckSquare, CheckCircle2 } from 'lucide-react';

export interface QuizStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (mode: 'mixed' | QuestionType) => void;
  initialMode?: 'mixed' | QuestionType;
}

interface ModeOption {
  id: 'team-name' | 'ballpark' | 'arena' | 'stadium' | 'division' | 'city' | 'multiple-choice' | 'mixed';
  title: string;
  badge?: string;
  description: string;
  example: string;
  icon: React.ComponentType<{ className?: string }>;
}

const MODES: ModeOption[] = [
  {
    id: 'team-name',
    title: 'Franchise Map Challenge',
    badge: 'Classic',
    description: 'We give you the franchise name, you click their ballpark pin on the map.',
    example: 'e.g. "Find the Los Angeles Dodgers on the map"',
    icon: MapPin,
  },
  {
    id: 'ballpark',
    title: 'Ballparks Challenge',
    badge: 'Popular',
    description: 'Test your MLB ballpark knowledge by identifying which team plays in each venue.',
    example: 'e.g. "Which team plays at Fenway Park?"',
    icon: Landmark,
  },
  {
    id: 'division',
    title: 'Leagues & Divisions',
    description: 'Identify teams according to their American / National League division alignments.',
    example: 'e.g. "Which team plays in the AL East Division?"',
    icon: Shield,
  },
  {
    id: 'multiple-choice',
    title: 'Multiple Choice Quiz',
    description: 'Answer 4-choice questions targeting ballpark cities and team franchises.',
    example: 'e.g. Which team plays in Boston, Massachusetts?',
    icon: CheckSquare,
  },
  {
    id: 'mixed',
    title: 'Mixed Pro Mode',
    description: 'Dynamic mix alternating across map locations, ballparks, and divisions.',
    example: 'Mix of map clicks, ballpark trivia, and multiple-choice',
    icon: Sparkles,
  },
];

function useEscapeKey(isOpen: boolean, onClose: () => void): void {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);
}

const ModeOptionItem: React.FC<{
  mode: ModeOption;
  isSelected: boolean;
  onSelect: (id: 'mixed' | QuestionType) => void;
}> = ({ mode, isSelected, onSelect }) => {
  const Icon = mode.icon;
  const buttonClass = `w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3.5 sm:gap-4 cursor-pointer ${
    isSelected
      ? 'border-rose-500 bg-rose-50/70 shadow-sm ring-2 ring-rose-200'
      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
  }`;

  return (
    <button
      type="button"
      onClick={() => onSelect(mode.id as 'mixed' | QuestionType)}
      className={buttonClass}
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
          isSelected
            ? 'bg-rose-500 text-white shadow-xs'
            : 'bg-slate-100 text-slate-600'
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold text-sm text-slate-900 leading-tight">{mode.title}</span>
          {mode.badge && (
            <span className="text-[10px] font-extrabold px-2 py-0.5 bg-rose-100 text-rose-700 rounded-md tracking-wide">
              {mode.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">{mode.description}</p>
        <p className="text-[11px] text-slate-400 mt-1 italic">{mode.example}</p>
      </div>
      <div className="shrink-0 self-center pl-1">
        {isSelected ? (
          <CheckCircle2 className="w-5 h-5 text-rose-600" />
        ) : (
          <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
        )}
      </div>
    </button>
  );
};

export const QuizStartModal: React.FC<QuizStartModalProps> = ({
  isOpen,
  onClose,
  onStart,
  initialMode = 'mixed',
}) => {
  const [selectedMode, setSelectedMode] = useState<'mixed' | QuestionType>(initialMode);

  useEscapeKey(isOpen, onClose);

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop select-none"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="modal-container quiz-mode-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 mb-4 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 leading-tight">Choose Quiz Mode</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Select how you would like to test your MLB knowledge
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Options List */}
        <div className="flex-1 overflow-y-auto max-h-[58vh] pr-1.5 custom-scrollbar space-y-3 mb-5">
          {MODES.map((m) => (
            <ModeOptionItem
              key={m.id}
              mode={m}
              isSelected={selectedMode === m.id}
              onSelect={setSelectedMode}
            />
          ))}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-bold text-sm transition-all shadow-2xs"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              onStart(selectedMode);
              onClose();
            }}
            className="px-6 py-2.5 bg-slate-900 hover:bg-rose-600 text-white font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-sm"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Quiz Challenge</span>
          </button>
        </div>
      </div>
    </div>
  );
};
