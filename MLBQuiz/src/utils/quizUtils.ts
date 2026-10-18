import { MLB_TEAMS, MLBTeam } from '../data/mlbTeamsData';

// Backwards compatibility alias
export type NBATeam = MLBTeam;

export type QuestionType =
  | 'team-name'
  | 'ballpark'
  | 'arena'
  | 'stadium'
  | 'division'
  | 'city'
  | 'multiple-choice';

export interface QuizQuestion {
  targetTeam: MLBTeam;
  questionType: QuestionType;
  prompt: string;
  choices?: MLBTeam[];
}

export interface PerformanceTier {
  grade: 'S' | 'A' | 'B' | 'C' | 'D';
  minAccuracy: number;
  thresholdLabel: string;
  title: string;
  description: string;
  color: string;
  badgeEmoji: string;
}

export const PERFORMANCE_TIERS: PerformanceTier[] = [
  {
    grade: 'S',
    minAccuracy: 95,
    thresholdLabel: '95% – 100%',
    title: 'Cooperstown Legend',
    description: 'World Series champion status! Flawless mastery of MLB ballparks and geography.',
    color: '#e11d48',
    badgeEmoji: '🏆',
  },
  {
    grade: 'A',
    minAccuracy: 85,
    thresholdLabel: '85% – 94%',
    title: 'All-MLB First Team',
    description: 'Cy Young & MVP caliber! Exceptional baseball franchise knowledge.',
    color: '#f59e0b',
    badgeEmoji: '🥇',
  },
  {
    grade: 'B',
    minAccuracy: 70,
    thresholdLabel: '70% – 84%',
    title: 'MLB All-Star',
    description: 'Midsummer Classic star! Strong grasp of baseball ballparks and cities.',
    color: '#3b82f6',
    badgeEmoji: '⭐',
  },
  {
    grade: 'C',
    minAccuracy: 50,
    thresholdLabel: '50% – 69%',
    title: 'Everyday Starter',
    description: 'Solid at-bats! Keep taking batting practice to master all 30 ballparks.',
    color: '#10b981',
    badgeEmoji: '⚾',
  },
  {
    grade: 'D',
    minAccuracy: 0,
    thresholdLabel: '< 50%',
    title: 'Triple-A Prospect',
    description: 'Take some extra swings in the batting cage! Practice will call you up to the Big Leagues.',
    color: '#64748b',
    badgeEmoji: '🧢',
  },
];

export function calculateQuizRank(score: number, totalAnswered: number): PerformanceTier {
  const fallback = PERFORMANCE_TIERS[PERFORMANCE_TIERS.length - 1];
  if (totalAnswered <= 0) return fallback;

  const accuracy = Math.round((score / totalAnswered) * 100);
  const found = PERFORMANCE_TIERS.find((t) => accuracy >= t.minAccuracy);
  return found || fallback;
}

export function generateMultipleChoiceOptions(
  targetTeam: MLBTeam,
  teams: MLBTeam[] = MLB_TEAMS
): MLBTeam[] {
  const sameConference = teams.filter(
    (t) => t.id !== targetTeam.id && t.conference === targetTeam.conference
  );
  const otherConference = teams.filter(
    (t) => t.id !== targetTeam.id && t.conference !== targetTeam.conference
  );

  const shuffledSame = [...sameConference].sort(() => Math.random() - 0.5);
  const shuffledOther = [...otherConference].sort(() => Math.random() - 0.5);
  const distractors = [...shuffledSame, ...shuffledOther].slice(0, 3);

  return [targetTeam, ...distractors].sort(() => Math.random() - 0.5);
}

function pickQuestionType(mode: 'mixed' | QuestionType): QuestionType {
  if (mode !== 'mixed') return mode;
  const types: QuestionType[] = ['team-name', 'ballpark', 'division', 'city', 'multiple-choice'];
  return types[Math.floor(Math.random() * types.length)];
}

function buildPrompt(type: QuestionType, team: MLBTeam): string {
  if (type === 'team-name') return `Find the ${team.name} on the map`;
  if (type === 'ballpark' || type === 'arena' || type === 'stadium') return `Which team plays at ${team.ballpark}?`;
  if (type === 'division') return `Which team plays in the ${team.division} Division?`;
  if (type === 'city') return `Which team plays in ${team.city}, ${team.stateName}?`;
  return `Which team is highlighted on the map?`;
}

export function generateQuestion(
  type: 'mixed' | QuestionType = 'mixed',
  excludeIds: string[] = [],
  pool: MLBTeam[] = MLB_TEAMS
): QuizQuestion {
  const available = pool.filter((t) => !excludeIds.includes(t.id));
  const candidatePool = available.length > 0 ? available : pool;
  const targetTeam = candidatePool[Math.floor(Math.random() * candidatePool.length)];
  const selectedType = pickQuestionType(type);

  const prompt = buildPrompt(selectedType, targetTeam);
  const choices =
    selectedType === 'multiple-choice' ||
    selectedType === 'ballpark' ||
    selectedType === 'arena' ||
    selectedType === 'stadium' ||
    selectedType === 'city'
      ? generateMultipleChoiceOptions(targetTeam, pool)
      : undefined;

  return { targetTeam, questionType: selectedType, prompt, choices };
}

export function evaluateAnswer(clickedTeamId: string, targetTeamId: string): boolean {
  if (!clickedTeamId || !targetTeamId) return false;
  return clickedTeamId.toUpperCase() === targetTeamId.toUpperCase();
}

export function calculateNewStreak(currentStreak: number, isCorrect: boolean): number {
  if (!isCorrect) return 0;
  return currentStreak + 1;
}

export function getHintText(team: MLBTeam): string {
  if (!team) return '';
  return `Hint: This team plays in the ${team.division} Division and is based in ${team.stateName}.`;
}

export function calculateQuizProgress(
  solvedCount: number,
  revealedCount: number,
  totalTeams: number = MLB_TEAMS.length
): { identifiedCount: number; remainingCount: number; percentage: number } {
  const identifiedCount = Math.min(totalTeams, Math.max(0, solvedCount + revealedCount));
  const remainingCount = Math.max(0, totalTeams - identifiedCount);
  const percentage = totalTeams > 0 ? Math.round((identifiedCount / totalTeams) * 100) : 0;
  return { identifiedCount, remainingCount, percentage };
}
