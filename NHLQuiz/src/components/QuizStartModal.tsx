import React, { useState } from 'react';
import { QuestionType } from '../utils/quizUtils';
import { MapPin, Landmark, Sparkles, Play, X, Shield, CheckSquare } from 'lucide-react';

export interface QuizStartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: (mode: 'mixed' | QuestionType) => void;
  initialMode?: 'mixed' | QuestionType;
}

interface ModeOption {
  id: 'team-name' | 'arena' | 'stadium' | 'division' | 'city' | 'multiple-choice' | 'mixed';
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
    description: 'We give you the franchise name, you click their arena pin on the map.',
    example: 'e.g. "Find the Montreal Canadiens on the map"',
    icon: MapPin,
  },
  {
    id: 'arena',
    title: 'Arenas Challenge',
    badge: 'Popular',
    description: 'Test your NHL arena knowledge by identifying which team plays in each venue.',
    example: 'e.g. "Which team plays at Bell Centre?"',
    icon: Landmark,
  },
  {
    id: 'division',
    title: 'Conferences & Divisions',
    description: 'Identify teams according to their Eastern / Western division alignments.',
    example: 'e.g. "Which team plays in the Pacific Division?"',
    icon: Shield,
  },
  {
    id: 'multiple-choice',
    title: 'Multiple Choice Quiz',
    description: 'Answer 4-choice questions targeting arena cities and team franchises.',
    example: 'e.g. Which team plays in Edmonton, Alberta?',
    icon: CheckSquare,
  },
  {
    id: 'mixed',
    title: 'Mixed Pro Mode',
    description: 'Dynamic mix alternating across map locations, arenas, and divisions.',
    example: 'Mix of map clicks, arena trivia, and multiple-choice',
    icon: Sparkles,
  },
];

const ModeOptionItem: React.FC<{
  mode: ModeOption;
  isSelected: boolean;
  onSelect: (id: 'mixed' | QuestionType) => void;
}> = ({ mode, isSelected, onSelect }) => {
  const Icon = mode.icon;
  const buttonClass = `w-full p-3.5 rounded-xl border text-left transition-all flex items-start gap-4 sm:gap-5 ${
    isSelected
      ? 'border-rose-500 bg-rose-50/70 shadow-sm ring-1 ring-rose-300'
      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
  }`;

  return (
    <button onClick={() => onSelect(mode.id as 'mixed' | QuestionType)} className={buttonClass}>
      <div
        className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mr-1.5 ${
          isSelected ? 'bg-rose-500 text-white' : 'bg-slate-100 text-slate-600'
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm text-slate-900">{mode.title}</span>
          {mode.badge && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-rose-100 text-rose-700">
              {mode.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-600 mt-0.5">{mode.description}</p>
        <p className="text-[11px] text-slate-400 italic mt-1">{mode.example}</p>
      </div>
    </button>
  );
};

export const QuizStartModal: React.FC<QuizStartModalProps> = ({
  isOpen,
  onClose,
  onStart,
  initialMode = 'team-name',
}) => {
  const [selectedMode, setSelectedMode] = useState<'mixed' | QuestionType>(initialMode);

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop select-none" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container quiz-start-container" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Select NHL Quiz Mode</h2>
            <p className="text-xs text-slate-500">Pick your game style to begin the challenge</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3 mb-6 max-h-[60vh] overflow-y-auto pr-1">
          {MODES.map((mode) => (
            <ModeOptionItem
              key={mode.id}
              mode={mode}
              isSelected={selectedMode === mode.id}
              onSelect={setSelectedMode}
            />
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onStart(selectedMode);
              onClose();
            }}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-black text-white shadow-sm flex items-center gap-2 transition-all"
          >
            <Play className="w-4 h-4 fill-white" /> Start Quiz
          </button>
        </div>
      </div>
    </div>
  );
};
