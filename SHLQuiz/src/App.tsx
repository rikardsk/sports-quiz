import { useState, useMemo, useEffect, useRef } from 'react';
import { SHLClub, SHL_CLUBS } from './data/shlTeamsData';
import { SwedenMap } from './components/SwedenMap';
import { TeamCard } from './components/TeamCard';
import { FilteredTeamsList } from './components/FilteredTeamsList';
import { Header } from './components/Header';
import { DivisionFilter, FilterOption } from './components/DivisionFilter';
import { TeamsModal } from './components/TeamsModal';
import { QuizPanel } from './components/QuizPanel';
import { QuizStartModal } from './components/QuizStartModal';
import { QuizHeader } from './components/QuizHeader';
import { QuizQuestionBanner, QuizMultipleChoicePanel } from './components/QuizQuestionBanner';
import { QuizToast } from './components/QuizToast';
import { QuizWinModal } from './components/QuizWinModal';
import { QuizBottomProgressBar } from './components/QuizBottomProgressBar';
import { ExploreBottomProgressBar } from './components/ExploreBottomProgressBar';
import { PerformanceTiersModal } from './components/PerformanceTiersModal';
import { ResourcesModal } from './components/ResourcesModal';
import { SHL_STANDINGS_URL } from './data/shlResourcesData';
import {
  generateQuestion,
  evaluateAnswer,
  calculateNewStreak,
  calculateQuizRank,
  QuizQuestion,
  QuestionType,
} from './utils/quizUtils';
import {
  searchClubs,
  getClubByName,
  filterClubsByRegion,
} from './utils/shlUtils';
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
  const [selectedTeam, setSelectedTeam] = useState<SHLClub | null>(null);
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
  const [lastAnsweredTeam, setLastAnsweredTeam] = useState<SHLClub | null>(null);
  const [quizFeedback, setQuizFeedback] = useState<{ teamId: string; status: 'correct' | 'incorrect' | 'revealed' } | null>(null);
  const [hintUsed, setHintUsed] = useState(false);
  const [questionTypeMode, setQuestionTypeMode] = useState<'mixed' | QuestionType>('team-name');
  const [quizSolvedTeams, setQuizSolvedTeams] = useState<Set<string>>(new Set());
  const [quizRevealedTeams, setQuizRevealedTeams] = useState<Set<string>>(new Set());
  const [isRevealing, setIsRevealing] = useState<boolean>(false);

  const visibleTeams = useMemo(() => {
    if (activeFilter === 'All') return SHL_CLUBS;
    return filterClubsByRegion(activeFilter);
  }, [activeFilter]);

  const exploredInVisibleCount = useMemo(() => {
    return visibleTeams.filter((t) => exploredTeams.has(t.id)).length;
  }, [visibleTeams, exploredTeams]);

  const isQuizComplete = quizSolvedTeams.size + quizRevealedTeams.size >= SHL_CLUBS.length;
  const currentRank = useMemo(() => calculateQuizRank(quizScore, quizTotal), [quizScore, quizTotal]);
  const panelHeight = useSyncPanelHeight(leftColRef, [
    appMode,
    currentQuestion,
    selectedTeam,
    activeFilter,
    visibleTeams.length,
  ]);

  useEffect(() => {
    if (appMode === 'quiz' && !currentQuestion) {
      setCurrentQuestion(generateQuestion(questionTypeMode));
    }
  }, [appMode, currentQuestion, questionTypeMode]);

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchClubs(searchQuery);
  }, [searchQuery]);

  const handleSelectFilter = (filter: FilterOption) => {
    setActiveFilter(filter);
    setSelectedTeam(null);
  };

  const handleSelectTeam = (team: SHLClub) => {
    if (appMode === 'quiz') {
      handleQuizAnswer(team);
      return;
    }
    setSelectedTeam(team);
    setExploredTeams((prev) => new Set([...prev, team.id]));
  };

  const handleNextTeam = () => {
    if (!selectedTeam) return;
    const idx = visibleTeams.findIndex((t) => t.id === selectedTeam.id);
    const nextIdx = (idx + 1) % visibleTeams.length;
    const nextTeam = visibleTeams[nextIdx];
    setSelectedTeam(nextTeam);
    setExploredTeams((prev) => new Set([...prev, nextTeam.id]));
  };

  const handlePrevTeam = () => {
    if (!selectedTeam) return;
    const idx = visibleTeams.findIndex((t) => t.id === selectedTeam.id);
    const prevIdx = (idx - 1 + visibleTeams.length) % visibleTeams.length;
    const prevTeam = visibleTeams[prevIdx];
    setSelectedTeam(prevTeam);
    setExploredTeams((prev) => new Set([...prev, prevTeam.id]));
  };

  const advanceQuestion = () => {
    const solvedOrRevealed = new Set([...quizSolvedTeams, ...quizRevealedTeams]);
    if (solvedOrRevealed.size >= SHL_CLUBS.length) {
      setCurrentQuestion(null);
      setIsQuizWinModalOpen(true);
      return;
    }

    const nextQ = generateQuestion(questionTypeMode, Array.from(solvedOrRevealed));
    setCurrentQuestion(nextQ);
  };

  const handleQuizAnswer = (answeredTeam: SHLClub) => {
    if (!currentQuestion || isRevealing || isQuizComplete) return;

    setLastAnsweredTeam(answeredTeam);
    const isCorrect = evaluateAnswer(answeredTeam.id, currentQuestion.targetTeam.id);

    setQuizTotal((prev) => prev + 1);

    if (isCorrect) {
      const newStreak = calculateNewStreak(quizStreak, true);
      setQuizStreak(newStreak);
      if (newStreak > quizBestStreak) setQuizBestStreak(newStreak);
      setQuizScore((prev) => prev + 1);

      setLastStatus('correct');
      setQuizFeedback({ teamId: answeredTeam.id, status: 'correct' });
      const nextSolved = new Set([...quizSolvedTeams, answeredTeam.id]);
      setQuizSolvedTeams(nextSolved);

      setIsRevealing(true);
      setTimeout(() => {
        setQuizFeedback(null);
        setLastStatus('idle');
        setHintUsed(false);
        setIsRevealing(false);

        if (nextSolved.size + quizRevealedTeams.size >= SHL_CLUBS.length) {
          setCurrentQuestion(null);
          setIsQuizWinModalOpen(true);
        } else {
          advanceQuestion();
        }
      }, 1000);
    } else {
      setQuizStreak(0);
      setLastStatus('incorrect');
      setQuizFeedback({ teamId: answeredTeam.id, status: 'incorrect' });
      setTimeout(() => {
        setQuizFeedback(null);
        setLastStatus('idle');
      }, 1200);
    }
  };

  const handleStartMode = (mode: 'mixed' | QuestionType) => {
    setQuestionTypeMode(mode);
    setQuizScore(0);
    setQuizTotal(0);
    setQuizStreak(0);
    setQuizBestStreak(0);
    setQuizSolvedTeams(new Set());
    setQuizRevealedTeams(new Set());
    setLastStatus('idle');
    setLastAnsweredTeam(null);
    setHintUsed(false);
    setIsRevealing(false);
    setAppMode('quiz');
    setCurrentQuestion(generateQuestion(mode));
  };

  const handleRestartQuiz = () => {
    handleStartMode(questionTypeMode);
  };

  const handleUseHint = () => {
    if (hintUsed || isRevealing || !currentQuestion) return;
    setHintUsed(true);
  };

  const handleShowAnswer = () => {
    if (isRevealing || !currentQuestion || isQuizComplete) return;
    setIsRevealing(true);
    setLastStatus('revealed');
    setQuizRevealedTeams((prev) => new Set([...prev, currentQuestion.targetTeam.id]));
    setQuizFeedback({ teamId: currentQuestion.targetTeam.id, status: 'revealed' });

    setTimeout(() => {
      setQuizFeedback(null);
      setLastStatus('idle');
      setIsRevealing(false);
      advanceQuestion();
    }, 2000);
  };

  const handleSkipQuestion = () => {
    if (isRevealing || isQuizComplete) return;
    setQuizStreak(0);
    setHintUsed(false);
    advanceQuestion();
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-2xl">🏒</span>
            <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight">
              SHL<span className="text-rose-500">Quiz</span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={SHL_STANDINGS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-pill-btn"
              title="Officiell SHL-Tabell"
            >
              <Trophy className="w-4 h-4 text-amber-500" />
              <span className="nav-pill-text">Tabell</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <button
              type="button"
              onClick={() => setIsResourcesModalOpen(true)}
              className="nav-pill-btn"
              title="Resurser & länkar"
            >
              <Globe className="w-4 h-4 text-slate-500" />
              <span className="nav-pill-text">Resurser</span>
            </button>

            <button
              type="button"
              onClick={() => setAppMode('explore')}
              className={appMode === 'explore' ? 'nav-pill-btn-active' : 'nav-pill-btn'}
              title="Utforska"
            >
              <Compass className={`w-4 h-4 ${appMode === 'explore' ? 'text-white' : 'text-slate-600'}`} />
              <span className="nav-pill-text">Utforska</span>
            </button>

            <button
              type="button"
              onClick={() => setIsQuizStartModalOpen(true)}
              className={appMode === 'quiz' ? 'nav-pill-btn-active' : 'nav-pill-btn'}
              title="Quizläge"
            >
              <Target className={`w-4 h-4 ${appMode === 'quiz' ? 'text-white' : 'text-slate-700'}`} />
              <span className="nav-pill-text">Quizläge</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col min-h-0">
        {appMode === 'explore' ? (
          <Header
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectTeamByName={(name) => {
              const team = getClubByName(name);
              if (team) setSelectedTeam(team);
            }}
            searchResults={searchResults}
          />
        ) : (
          <QuizHeader
            mode={questionTypeMode}
            solvedCount={quizSolvedTeams.size}
            revealedCount={quizRevealedTeams.size}
            totalTeams={SHL_CLUBS.length}
          />
        )}

        {appMode === 'explore' && (
          <div className="flex items-center justify-between gap-3 mb-4">
            <DivisionFilter
              currentFilter={activeFilter}
              onSelectFilter={handleSelectFilter}
            />
            <button
              onClick={() => setIsTeamsModalOpen(true)}
              className="text-xs font-semibold text-slate-700 bg-white border border-slate-300 px-3 py-1.5 rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all flex items-center gap-1.5 shadow-2xs whitespace-nowrap shrink-0 cursor-pointer"
            >
              <LayoutGrid className="w-3.5 h-3.5 text-slate-500" />
              <span>Alla 14 Klubbar</span>
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0 items-start">
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
                totalTeams={SHL_CLUBS.length}
              />
            )}

            <div className={`relative ${appMode === 'quiz' ? 'mt-3 sm:mt-4' : ''}`}>
              {appMode === 'quiz' && (
                <QuizQuestionBanner
                  currentQuestion={currentQuestion}
                  hintUsed={hintUsed}
                  isComplete={isQuizComplete}
                />
              )}
              <SwedenMap
                selectedTeam={appMode === 'explore' ? selectedTeam : null}
                onSelectTeam={handleSelectTeam}
                activeFilter={activeFilter}
                exploredTeams={exploredTeams}
                isQuizMode={appMode === 'quiz'}
                disableMapSelection={isRevealing || isQuizComplete}
                quizFeedback={quizFeedback}
                hintDivision={hintUsed && currentQuestion ? currentQuestion.targetTeam.region : null}
                hintState={
                  hintUsed && currentQuestion
                    ? currentQuestion.targetTeam.county
                    : currentQuestion && (currentQuestion.questionType === 'multiple-choice' || currentQuestion.prompt.includes('markerad'))
                      ? currentQuestion.targetTeam.county
                      : null
                }
                targetHighlightTeamId={
                  (isRevealing || Boolean(currentQuestion && (currentQuestion.questionType === 'multiple-choice' || currentQuestion.prompt.includes('markerad')))) && currentQuestion
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
            className="lg:col-span-1 flex flex-col min-h-0 overflow-hidden w-full"
            style={{
              height: panelHeight ? `${panelHeight}px` : '640px',
              maxHeight: panelHeight ? `${panelHeight}px` : '780px',
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
