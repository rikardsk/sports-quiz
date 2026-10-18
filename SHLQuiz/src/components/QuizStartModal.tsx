import React, { useState } from 'react';
import { QuestionType } from '../utils/quizUtils';
import { MapPin, Landmark, Sparkles, Play, X, CheckSquare } from 'lucide-react';

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
    title: 'Klubbkartan',
    badge: 'Klassisk',
    description: 'Vi ger dig klubbnamnet, du klickar på arenan på kartan.',
    example: 't.ex. "Hitta Frölunda HC på kartan"',
    icon: MapPin,
  },
  {
    id: 'stadium',
    title: 'Arenautmaning',
    badge: 'Populär',
    description: 'Testa dina SHL-arenakunskaper och lista ut vilket lag som spelar i varje arena.',
    example: 't.ex. "Vilken klubb spelar i Scandinavium?"',
    icon: Landmark,
  },
  {
    id: 'multiple-choice',
    title: 'Flervalsquiz',
    description: 'Svara på 4-svarsfrågor om klubbarnas arenor och städer.',
    example: 't.ex. "Vilken klubb hör hemma i Karlstad?"',
    icon: CheckSquare,
  },
  {
    id: 'mixed',
    title: 'Mixat Pro-läge',
    description: 'Dynamisk mix som växlar mellan kartklick, arenor och landsdelar.',
    example: 'Blandning av kartklick, arenatrivia och flervalsfrågor',
    icon: Sparkles,
  },
];

const ModeOptionItem: React.FC<{
  mode: ModeOption;
  isSelected: boolean;
  onSelect: (id: 'mixed' | QuestionType) => void;
}> = ({ mode, isSelected, onSelect }) => {
  const Icon = mode.icon;

  return (
    <button
      type="button"
      onClick={() => onSelect(mode.id as 'mixed' | QuestionType)}
      className={`w-full p-3.5 sm:p-4 rounded-2xl text-left transition-all flex items-center gap-4 cursor-pointer ${
        isSelected
          ? 'bg-slate-100/95 border-2 border-slate-400 shadow-2xs'
          : 'bg-slate-100/70 border-2 border-transparent hover:bg-slate-100 hover:border-slate-300'
      }`}
    >
      <div
        className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
          isSelected
            ? 'bg-rose-500 text-white shadow-xs'
            : 'bg-white text-slate-700 border border-slate-200/80 shadow-2xs'
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0 py-0.5">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm sm:text-base text-slate-900">{mode.title}</span>
          {mode.badge && (
            <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
              {mode.badge}
            </span>
          )}
        </div>
        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{mode.description}</p>
        <p className="text-xs text-slate-400 italic mt-1.5 font-normal">{mode.example}</p>
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="relative quiz-start-modal-dialog bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Välj SHL Quizläge</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Välj spelläge för att starta utmaningen
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl border border-slate-300 text-slate-400 hover:text-slate-600 hover:border-slate-400 transition-colors cursor-pointer"
            aria-label="Stäng"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="p-5 sm:p-6 overflow-y-auto flex flex-col gap-3.5 sm:gap-4 flex-1 custom-scrollbar">
          {MODES.map((mode) => (
            <ModeOptionItem
              key={mode.id}
              mode={mode}
              isSelected={selectedMode === mode.id}
              onSelect={setSelectedMode}
            />
          ))}
        </div>

        <div className="px-6 py-4 sm:py-5 border-t border-slate-100 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs sm:text-sm shadow-2xs transition-all cursor-pointer"
          >
            Avbryt
          </button>
          <button
            type="button"
            onClick={() => {
              onStart(selectedMode);
              onClose();
            }}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Starta Quiz</span>
          </button>
        </div>
      </div>
    </div>
  );
};
