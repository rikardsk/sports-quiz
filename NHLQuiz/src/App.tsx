import { useState, useMemo, useEffect, useRef } from 'react';
import { NHLTeam, NHL_TEAMS } from './data/nhlTeamsData';
import { USMap } from './components/USMap';
import { TeamCard } from './components/TeamCard';
import { FilteredTeamsList } from './components/FilteredTeamsList';
import { Header } from './components/Header';
import { DivisionFilter, FilterOption } from './components/DivisionFilter';
import { TeamsModal } from './components/TeamsModal';
import { QuizPanel } from './components/QuizPanel';
import { QuizStartModal } from './components/QuizStartModal';
import { QuizQuestionBanner, QuizMultipleChoicePanel } from './components/QuizQuestionBanner';
import { QuizToast } from './components/QuizToast';
import { QuizWinModal } from './components/QuizWinModal';
import { QuizBottomProgressBar } from './components/QuizBottomProgressBar';
import { ExploreBottomProgressBar } from './components/ExploreBottomProgressBar';
import { PerformanceTiersModal } from './components/PerformanceTiersModal';
import { ResourcesModal } from './components/ResourcesModal';
import { NHL_STANDINGS_URL } from './data/nhlResourcesData';
import {
  generateQuestion,
  evaluateAnswer,
  calculateNewStreak,
  calculateQuizRank,
  QuizQuestion,
  QuestionType,
} from './utils/quizUtils';
import {
  searchTeams,
  getTeamByName,
  filterTeamsByConference,
  filterTeamsByDivision,
} from './utils/nhlUtils';
import { LayoutGrid, Compass, Target, Globe, Trophy, ExternalLink } from 'lucide-react';

function useSyncPanelHeight(
  ref: React.RefObject<HTMLDivElement | null>,
  deps: unknown[]
): number | undefined {
  const [height, setHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const updateHeight = () => {
      if (window.innerWidth < 1024) {
        setHeight(undefined);
        return;
      }
      const h = el.offsetHeight;
      if (h > 0) setHeight(h);
    };

    updateHeight();
    const frameId = requestAnimationFrame(updateHeight);
    window.addEventListener('resize', updateHeight);

    if (typeof ResizeObserver === 'undefined') {
      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', updateHeight);
      };
    }

    const observer = new ResizeObserver(updateHeight);
    observer.observe(el);

    return () => {
      cancelAnimationFrame(frameId);
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, deps);

  return height;
}

export function App() {
  const [appMode, setAppMode] = useState<'explore' | 'quiz'>('explore');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('All');
  const [selectedTeam, setSelectedTeam] = useState<NHLTeam | null>(null);
  const [exploredTeams, setExploredTeams] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isTeamsModalOpen, setIsTeamsModalOpen] = useState<boolean>(false);
  const [isResourcesModalOpen, setIsResourcesModalOpen] = useState<boolean>(false);
  const [isQuizStartModalOpen, setIsQuizStartModalOpen] = useState<boolean>(false);
  const [isQuizWinModalOpen, setIsQuizWinModalOpen] = useState<boolean>(false);
  const [isTiersModalOpen, setIsTiersModalOpen] = useState<boolean>(false);
  const leftColRef = useRef<HTMLDivElement>(null);

  // Quiz State
  const [currentQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizTotal, setQuizTotal] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizBestStreak, setQuizBestStreak] = useState(0);
  const [lastStatus, setLastStatus] = useState<'idle' | 'correct' | 'incorrect' | 'revealed'>('idle');
  const [lastAnsweredTeam, setLastAnsweredTeam] = useState<NHLTeam | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{ teamId: string; status: 'correct' | 'incorrect' | 'revealed' } | null>(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [questionTypeMode, setQuestionTypeMode] = useState<'mixed' | QuestionType>('mixed');
  const [quizSolvedTeams, setQuizSolvedTeams] = useState<Set<string>>(new Set());
  const [quizRevealedTeams, setQuizRevealedTeams] = useState<Set<string>>(new Set());
  const [isRevealing, setIsRevealing] = useState(false);

  const visibleTeams = useMemo(() => {
    if (activeFilter === 'All') return NHL_TEAMS;
    if (activeFilter === 'Eastern' || activeFilter === 'Western') {
      return filterTeamsByConference(activeFilter, NHL_TEAMS);
    }
    return filterTeamsByDivision(activeFilter, NHL_TEAMS);
  }, [activeFilter]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchTeams(searchQuery, NHL_TEAMS).slice(0, 8);
  }, [searchQuery]);

  const isQuizComplete = quizSolvedTeams.size + quizRevealedTeams.size >= NHL_TEAMS.length;
  const currentRank = useMemo(() => calculateQuizRank(quizScore, quizTotal), [quizScore, quizTotal]);

  const exploredInVisibleCount = useMemo(() => {
    return visibleTeams.filter((t) => exploredTeams.has(t.id)).length;
  }, [visibleTeams, exploredTeams]);

  // Keep side panel height locked to map column height
  const panelHeight = useSyncPanelHeight(leftColRef, [
    appMode,
    selectedTeam,
    activeFilter,
    currentQuestion,
    isQuizComplete,
    isRevealing,
  ]);

  const nextQuestion = (
    mode: 'mixed' | QuestionType = questionTypeMode,
    currentSolved: Set<string> = quizSolvedTeams,
    currentRevealed: Set<string> = quizRevealedTeams
  ) => {
    const excluded = Array.from(new Set([...currentSolved, ...currentRevealed]));
    if (excluded.length >= NHL_TEAMS.length) {
      setCurrentQuestion(null);
      setIsQuizWinModalOpen(true);
      return;
    }
    const q = generateQuestion(mode, excluded, NHL_TEAMS);
    setCurrentQuestion(q);
    setHintUsed(false);
    setIsRevealing(false);
  };

  const handleSelectTeam = (team: NHLTeam) => {
    if (appMode === 'explore') {
      setSelectedTeam(team);
      setExploredTeams((prev) => new Set(prev).add(team.id));
    } else {
      handleQuizAnswer(team);
    }
  };

  const handleNextTeam = () => {
    if (!selectedTeam) return;
    const currentIndex = visibleTeams.findIndex((t) => t.id === selectedTeam.id);
    const nextIndex = (currentIndex + 1) % visibleTeams.length;
    const nextTeam = visibleTeams[nextIndex];
    setSelectedTeam(nextTeam);
    setExploredTeams((currentSet) => new Set(currentSet).add(nextTeam.id));
  };

  const handlePrevTeam = () => {
    if (!selectedTeam) return;
    const currentIndex = visibleTeams.findIndex((t) => t.id === selectedTeam.id);
    const prevIndex = (currentIndex - 1 + visibleTeams.length) % visibleTeams.length;
    const prevTeam = visibleTeams[prevIndex];
    setSelectedTeam(prevTeam);
    setExploredTeams((currentSet) => new Set(currentSet).add(prevTeam.id));
  };

  const handleQuizAnswer = (team: NHLTeam) => {
    if (!currentQuestion || isRevealing) return;

    const isCorrect = evaluateAnswer(team.id, currentQuestion.targetTeam.id);
    setQuizTotal((prev) => prev + 1);

    if (isCorrect) {
      handleCorrectAnswer(team);
    } else {
      handleIncorrectAnswer(team);
    }
  };

  const handleCorrectAnswer = (team: NHLTeam) => {
    setQuizScore((prev) => prev + 1);
    const newStreak = calculateNewStreak(quizStreak, true);
    setQuizStreak(newStreak);
    if (newStreak > quizBestStreak) setQuizBestStreak(newStreak);

    setLastStatus('correct');
    setLastAnsweredTeam(team);
    setQuizFeedback({ teamId: team.id, status: 'correct' });

    const newSolved = new Set(quizSolvedTeams).add(team.id);
    setQuizSolvedTeams(newSolved);

    if (newSolved.size + quizRevealedTeams.size >= NHL_TEAMS.length) {
      setIsQuizWinModalOpen(true);
    }

    setTimeout(() => {
      setQuizFeedback(null);
      setLastStatus('idle');
      nextQuestion(questionTypeMode, newSolved, quizRevealedTeams);
    }, 1200);
  };

  const handleIncorrectAnswer = (team: NHLTeam) => {
    setQuizStreak(0);
    setLastStatus('incorrect');
    setLastAnsweredTeam(team);
    setQuizFeedback({ teamId: team.id, status: 'incorrect' });

    setTimeout(() => {
      setQuizFeedback(null);
      setLastStatus('idle');
    }, 1200);
  };

  const handleShowAnswer = () => {
    if (!currentQuestion || isRevealing) return;

    setIsRevealing(true);
    setQuizTotal((prev) => prev + 1);
    setQuizStreak(0);
    setLastStatus('revealed');
    setQuizFeedback({ teamId: currentQuestion.targetTeam.id, status: 'revealed' });

    const newRevealed = new Set(quizRevealedTeams).add(currentQuestion.targetTeam.id);
    setQuizRevealedTeams(newRevealed);

    if (quizSolvedTeams.size + newRevealed.size >= NHL_TEAMS.length) {
      setTimeout(() => {
        setIsQuizWinModalOpen(true);
      }, 1500);
    }

    setTimeout(() => {
      setQuizFeedback(null);
      setLastStatus('idle');
      nextQuestion(questionTypeMode, quizSolvedTeams, newRevealed);
    }, 2000);
  };

  const handleSkipQuestion = () => {
    if (!currentQuestion || isRevealing) return;
    nextQuestion(questionTypeMode, quizSolvedTeams, quizRevealedTeams);
  };

  const handleUseHint = () => {
    setHintUsed(true);
  };

  const handleRestartQuiz = () => {
    setQuizScore(0);
    setQuizTotal(0);
    setQuizStreak(0);
    setQuizBestStreak(0);
    setLastStatus('idle');
    setLastAnsweredTeam(null);
    setQuizFeedback(null);
    setHintUsed(false);
    setIsRevealing(false);
    const emptySolved = new Set<string>();
    const emptyRevealed = new Set<string>();
    setQuizSolvedTeams(emptySolved);
    setQuizRevealedTeams(emptyRevealed);
    nextQuestion(questionTypeMode, emptySolved, emptyRevealed);
  };

  const handleStartMode = (mode: 'mixed' | QuestionType) => {
    setQuestionTypeMode(mode);
    setAppMode('quiz');
    setQuizScore(0);
    setQuizTotal(0);
    setQuizStreak(0);
    setQuizBestStreak(0);
    setLastStatus('idle');
    setLastAnsweredTeam(null);
    setQuizFeedback(null);
    setHintUsed(false);
    setIsRevealing(false);
    const emptySolved = new Set<string>();
    const emptyRevealed = new Set<string>();
    setQuizSolvedTeams(emptySolved);
    setQuizRevealedTeams(emptyRevealed);
    nextQuestion(mode, emptySolved, emptyRevealed);
  };

  const handleSelectFilter = (filter: FilterOption) => {
    setActiveFilter(filter);
    setSelectedTeam(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-12">
      {/* Top Navbar */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 px-4 py-3 shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🏒</span>
            <span className="font-extrabold text-base tracking-tight text-slate-900">
              NHL<span className="text-rose-600">Quiz</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={NHL_STANDINGS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-rose-600 shadow-sm"
              title="Official Current NHL Standings"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span>Standings</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <button
              onClick={() => setIsResourcesModalOpen(true)}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
              title="Vital NHL Resources & Hubs"
            >
              <Globe className="w-4 h-4 text-slate-500" /> Resources
            </button>
            <button
              onClick={() => setAppMode('explore')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                appMode === 'explore'
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Compass className="w-4 h-4" /> Explore
            </button>
            <button
              onClick={() => setIsQuizStartModalOpen(true)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                appMode === 'quiz'
                  ? 'bg-rose-100 text-black border border-rose-300 shadow-sm'
                  : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
              }`}
            >
              <Target className={`w-4 h-4 ${appMode === 'quiz' ? 'text-black' : ''}`} /> Quiz Mode
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 pt-6">
        {appMode === 'explore' && (
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectTeamByName={(name) => {
              const found = getTeamByName(name);
              if (found) handleSelectTeam(found);
            }}
            searchResults={searchResults}
          />
        )}

        {appMode === 'explore' && (
          <div className="flex items-center justify-between gap-3 mb-4">
            <DivisionFilter currentFilter={activeFilter} onSelectFilter={handleSelectFilter} />
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={NHL_STANDINGS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-700 bg-white border-[1.5px] border-slate-300 px-2.5 py-1 rounded-lg hover:bg-slate-50 hover:border-slate-400 hover:text-rose-600 transition-all flex items-center gap-1.5 shadow-2xs whitespace-nowrap"
                title="Current NHL League Standings"
              >
                <Trophy className="w-3.5 h-3.5 text-amber-500" /> League Standings
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
              <button
                onClick={() => setIsTeamsModalOpen(true)}
                className="text-xs font-semibold text-slate-700 bg-white border-[1.5px] border-slate-300 px-2.5 py-1 rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center gap-1.5 shadow-2xs whitespace-nowrap shrink-0"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-slate-500" /> All 32 Teams
              </button>
            </div>
          </div>
        )}

        {/* Main Grid: US Map (with Progress Bar) and Information Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          <div ref={leftColRef} className="lg:col-span-2 flex flex-col gap-4">
            {appMode === 'explore' ? (
              <ExploreBottomProgressBar
                exploredCount={exploredInVisibleCount}
                totalTeams={visibleTeams.length}
              />
            ) : (
              <QuizBottomProgressBar
                solvedCount={quizSolvedTeams.size}
                revealedCount={quizRevealedTeams.size}
                totalTeams={NHL_TEAMS.length}
              />
            )}

            <div className="relative">
              {appMode === 'quiz' && (
                <QuizQuestionBanner
                  currentQuestion={currentQuestion}
                  hintUsed={hintUsed}
                  isComplete={isQuizComplete}
                />
              )}
              <USMap
                selectedTeam={appMode === 'quiz' ? null : selectedTeam}
                onSelectTeam={handleSelectTeam}
                activeFilter={appMode === 'quiz' ? 'All' : activeFilter}
                exploredTeams={exploredTeams}
                isQuizMode={appMode === 'quiz'}
                quizFeedback={quizFeedback}
                hintState={
                  hintUsed && currentQuestion
                    ? currentQuestion.targetTeam.state
                    : isRevealing && currentQuestion
                      ? currentQuestion.targetTeam.state
                      : currentQuestion?.prompt.includes('highlighted')
                        ? currentQuestion.targetTeam.state
                        : null
                }
                targetHighlightTeamId={
                  (isRevealing || Boolean(currentQuestion?.prompt.includes('highlighted'))) && currentQuestion
                    ? currentQuestion.targetTeam.id
                    : null
                }
                correctTeamIds={quizSolvedTeams}
                revealedTeamIds={quizRevealedTeams}
              />
              {appMode === 'quiz' && (
                <QuizToast
                  status={lastStatus}
                  targetTeamName={currentQuestion?.targetTeam.name}
                  lastAnsweredTeam={lastAnsweredTeam}
                />
              )}
            </div>

            {appMode === 'quiz' && !isQuizComplete && currentQuestion?.choices && currentQuestion.choices.length > 0 && (
              <QuizMultipleChoicePanel
                choices={currentQuestion.choices}
                targetTeamId={currentQuestion.targetTeam.id}
                isRevealing={isRevealing}
                onSelectChoice={handleQuizAnswer}
                disabled={isRevealing}
              />
            )}
          </div>

          <div
            className="lg:col-span-1 flex flex-col min-h-0 overflow-hidden"
            style={{
              height: panelHeight ? `${panelHeight}px` : '540px',
              maxHeight: panelHeight ? `${panelHeight}px` : '540px',
            }}
          >
            {appMode === 'explore' ? (
              selectedTeam ? (
                <TeamCard
                  team={selectedTeam}
                  onNextTeam={handleNextTeam}
                  onPrevTeam={handlePrevTeam}
                  isExplored={exploredTeams.has(selectedTeam.id)}
                  onClose={() => setSelectedTeam(null)}
                />
              ) : (
                <FilteredTeamsList
                  filter={activeFilter}
                  teams={visibleTeams}
                  exploredTeams={exploredTeams}
                  onSelectTeam={handleSelectTeam}
                />
              )
            ) : (
              <QuizPanel
                score={quizScore}
                totalAnswered={quizTotal}
                streak={quizStreak}
                bestStreak={quizBestStreak}
                hintUsed={hintUsed}
                questionTypeMode={questionTypeMode}
                currentQuestionType={currentQuestion?.questionType}
                isComplete={isQuizComplete}
                isRevealing={isRevealing}
                onViewWinModal={() => setIsQuizWinModalOpen(true)}
                onOpenModeModal={() => setIsQuizStartModalOpen(true)}
                onOpenTiersModal={() => setIsTiersModalOpen(true)}
                onUseHint={handleUseHint}
                onShowAnswer={handleShowAnswer}
                onSkipQuestion={handleSkipQuestion}
                onRestartQuiz={handleRestartQuiz}
              />
            )}
          </div>
        </div>
      </main>

      <TeamsModal
        isOpen={isTeamsModalOpen}
        onClose={() => setIsTeamsModalOpen(false)}
        onSelectTeam={handleSelectTeam}
        selectedTeamId={selectedTeam?.id}
        exploredTeams={exploredTeams}
      />

      <ResourcesModal
        isOpen={isResourcesModalOpen}
        onClose={() => setIsResourcesModalOpen(false)}
      />

      <QuizStartModal
        isOpen={isQuizStartModalOpen}
        onClose={() => setIsQuizStartModalOpen(false)}
        onStart={handleStartMode}
        initialMode={questionTypeMode}
      />

      <QuizWinModal
        isOpen={isQuizWinModalOpen}
        score={quizScore}
        totalAnswered={quizTotal}
        bestStreak={quizBestStreak}
        mode={questionTypeMode}
        onPlayAgain={handleRestartQuiz}
        onReviewMap={() => setIsQuizWinModalOpen(false)}
        onOpenTiersModal={() => setIsTiersModalOpen(true)}
      />

      <PerformanceTiersModal
        isOpen={isTiersModalOpen}
        onClose={() => setIsTiersModalOpen(false)}
        currentGrade={currentRank.grade}
      />
    </div>
  );
}

export default App;
