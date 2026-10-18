import { MLS_TEAMS, MLSTeam } from '../data/mlsTeamsData';

export type QuestionType =
  | 'team-name'
  | 'arena'
  | 'stadium'
  | 'division'
  | 'city'
  | 'multiple-choice';

export interface QuizQuestion {
  targetTeam: MLSTeam;
  questionType: QuestionType;
  prompt: string;
  choices?: MLSTeam[];
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
    title: 'MLS Cup Champion',
    description: 'Championship glory! Complete mastery of MLS geography.',
    color: '#e11d48',
    badgeEmoji: '🏆',
  },
  {
    grade: 'A',
    minAccuracy: 85,
    thresholdLabel: '85% – 94%',
    title: 'Supporters\' Shield Winner',
    description: 'Dominant regular season! Exceptional club knowledge.',
    color: '#f59e0b',
    badgeEmoji: '🥇',
  },
  {
    grade: 'B',
    minAccuracy: 70,
    thresholdLabel: '70% – 84%',
    title: 'MLS All-Star',
    description: 'Playoff bound! Strong grasp of MLS clubs & stadiums.',
    color: '#3b82f6',
    badgeEmoji: '⭐',
  },
  {
    grade: 'C',
    minAccuracy: 50,
    thresholdLabel: '50% – 69%',
    title: 'First Team Starter',
    description: 'Solid performance! Keep training to master all 30 clubs.',
    color: '#10b981',
    badgeEmoji: '⚽',
  },
  {
    grade: 'D',
    minAccuracy: 0,
    thresholdLabel: '< 50%',
    title: 'SuperDraft Rookie',
    description: 'Hit the training pitch! Practice will earn you starting minutes.',
    color: '#64748b',
    badgeEmoji: '📋',
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
  targetTeam: MLSTeam,
  teams: MLSTeam[] = MLS_TEAMS
): MLSTeam[] {
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
  const types: QuestionType[] = ['team-name', 'stadium', 'division', 'city', 'multiple-choice'];
  return types[Math.floor(Math.random() * types.length)];
}

function buildPrompt(type: QuestionType, team: MLSTeam): string {
  if (type === 'team-name') return `Find the ${team.name} on the map`;
  if (type === 'arena' || type === 'stadium') return `Which team plays at ${team.stadium}?`;
  if (type === 'division') return `Which team plays in the ${team.conference} Conference?`;
  if (type === 'city') return `Which team plays in ${team.city}, ${team.stateName}?`;
  return `Which team is highlighted on the map?`;
}

export function generateQuestion(
  type: 'mixed' | QuestionType = 'mixed',
  excludeIds: string[] = [],
  pool: MLSTeam[] = MLS_TEAMS
): QuizQuestion {
  const available = pool.filter((t) => !excludeIds.includes(t.id));
  const candidatePool = available.length > 0 ? available : pool;
  const targetTeam = candidatePool[Math.floor(Math.random() * candidatePool.length)];
  const selectedType = pickQuestionType(type);

  const prompt = buildPrompt(selectedType, targetTeam);
  const choices =
    selectedType === 'multiple-choice' ||
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

export function getHintText(team: MLSTeam): string {
  if (!team) return '';
  return `Hint: This club plays in the ${team.conference} Conference and is based in ${team.stateName}.`;
}

export function calculateQuizProgress(
  solvedCount: number,
  revealedCount: number,
  totalTeams: number = MLS_TEAMS.length
): { identifiedCount: number; remainingCount: number; percentage: number } {
  const identifiedCount = Math.min(totalTeams, Math.max(0, solvedCount + revealedCount));
  const remainingCount = Math.max(0, totalTeams - identifiedCount);
  const percentage = totalTeams > 0 ? Math.round((identifiedCount / totalTeams) * 100) : 0;
  return { identifiedCount, remainingCount, percentage };
}
