import { ALLSVENSKAN_CLUBS, AllsvenskanClub } from '../data/allsvenskanTeamsData';

export type QuestionType =
  | 'team-name'
  | 'arena'
  | 'stadium'
  | 'division'
  | 'city'
  | 'multiple-choice';

export interface QuizQuestion {
  targetTeam: AllsvenskanClub;
  questionType: QuestionType;
  prompt: string;
  choices?: AllsvenskanClub[];
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
    title: 'Svenska Mästare (SM-Guld)',
    description: 'Lennart Johanssons Pokal! Complete mastery of Swedish football.',
    color: '#e11d48',
    badgeEmoji: '🏆',
  },
  {
    grade: 'A',
    minAccuracy: 85,
    thresholdLabel: '85% – 94%',
    title: 'Europaplats (Stora Silvret)',
    description: 'European qualification! Exceptional Allsvenskan geography knowledge.',
    color: '#f59e0b',
    badgeEmoji: '🥈',
  },
  {
    grade: 'B',
    minAccuracy: 70,
    thresholdLabel: '70% – 84%',
    title: 'Övre Halvan',
    description: 'Strong top-half finish! Solid grasp of Swedish clubs & venues.',
    color: '#3b82f6',
    badgeEmoji: '⚽',
  },
  {
    grade: 'C',
    minAccuracy: 50,
    thresholdLabel: '50% – 69%',
    title: 'Säkrat Allsvenskt Kontrakt',
    description: 'Top-flight status secured! Keep training to master all 16 clubs.',
    color: '#10b981',
    badgeEmoji: '🛡️',
  },
  {
    grade: 'D',
    minAccuracy: 0,
    thresholdLabel: '< 50%',
    title: 'Superettan-Kval',
    description: 'Relegation battle! Hit the tactics board and train again.',
    color: '#64748b',
    badgeEmoji: '⚠️',
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
  targetTeam: AllsvenskanClub,
  teams: AllsvenskanClub[] = ALLSVENSKAN_CLUBS
): AllsvenskanClub[] {
  const sameRegion = teams.filter(
    (t) => t.id !== targetTeam.id && t.region === targetTeam.region
  );
  const otherRegion = teams.filter(
    (t) => t.id !== targetTeam.id && t.region !== targetTeam.region
  );

  const shuffledSame = [...sameRegion].sort(() => Math.random() - 0.5);
  const shuffledOther = [...otherRegion].sort(() => Math.random() - 0.5);
  const distractors = [...shuffledSame, ...shuffledOther].slice(0, 3);

  return [targetTeam, ...distractors].sort(() => Math.random() - 0.5);
}

function pickQuestionType(mode: 'mixed' | QuestionType): QuestionType {
  if (mode !== 'mixed') return mode;
  const types: QuestionType[] = ['team-name', 'stadium', 'division', 'city', 'multiple-choice'];
  return types[Math.floor(Math.random() * types.length)];
}

function buildPrompt(type: QuestionType, team: AllsvenskanClub): string {
  if (type === 'team-name') return `Hitta ${team.name} på kartan`;
  if (type === 'arena' || type === 'stadium') return `Vilken klubb spelar på ${team.stadium}?`;
  if (type === 'division') return `Vilken klubb spelar i ${team.region}?`;
  if (type === 'city') return `Vilken klubb hör hemma i ${team.city} (${team.county})?`;
  return `Vilken klubb är markerad på kartan?`;
}

export function generateQuestion(
  type: 'mixed' | QuestionType = 'mixed',
  excludeIds: string[] = [],
  pool: AllsvenskanClub[] = ALLSVENSKAN_CLUBS
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
  return clickedTeamId.trim().toLowerCase() === targetTeamId.trim().toLowerCase();
}

export function calculateNewStreak(currentStreak: number, isCorrect: boolean): number {
  if (!isCorrect) return 0;
  return currentStreak + 1;
}

export function getHintText(team: AllsvenskanClub): string {
  if (!team) return '';
  return `Ledtråd: Den här klubben spelar i ${team.region} och har sin hemmaplan i ${team.city} (${team.county}).`;
}

export function calculateQuizProgress(
  solvedCount: number,
  revealedCount: number,
  totalTeams: number = ALLSVENSKAN_CLUBS.length
): { identifiedCount: number; remainingCount: number; percentage: number } {
  const identifiedCount = Math.min(totalTeams, Math.max(0, solvedCount + revealedCount));
  const remainingCount = Math.max(0, totalTeams - identifiedCount);
  const percentage = totalTeams > 0 ? Math.round((identifiedCount / totalTeams) * 100) : 0;
  return { identifiedCount, remainingCount, percentage };
}
